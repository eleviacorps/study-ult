"use client";

import { useCallback, useEffect, useState } from "react";

export type StudyEvent = {
  id: string;
  kind: "reading" | "flashcards" | "test" | "planning";
  label: string;
  minutes: number;
  score?: number;
  total?: number;
  createdAt: string;
};

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function useStudyTelemetry(scope: string) {
  const [events, setEvents] = useState<StudyEvent[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem("studyult.telemetry");
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      window.localStorage.removeItem("studyult.telemetry");
      return [];
    }
  });
  const [running, setRunning] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    window.localStorage.setItem("studyult.telemetry", JSON.stringify(events.slice(-240)));
  }, [events]);

  useEffect(() => {
    if (!running || !startedAt) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, startedAt]);

  const logEvent = useCallback((event: Omit<StudyEvent, "id" | "createdAt">) => {
    setEvents((current) => [
      ...current,
      {
        ...event,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const startFocus = useCallback(() => {
    setStartedAt(Date.now());
    setElapsedSeconds(0);
    setRunning(true);
  }, []);

  const stopFocus = useCallback(() => {
    if (startedAt) {
      logEvent({
        kind: "reading",
        label: scope === "All" ? "General vault study" : scope,
        minutes: Math.max(1, Math.round((Date.now() - startedAt) / 60000)),
      });
    }
    setRunning(false);
    setStartedAt(null);
    setElapsedSeconds(0);
  }, [logEvent, scope, startedAt]);

  const today = dayKey(new Date());
  const todayEvents = events.filter((event) => dayKey(new Date(event.createdAt)) === today);
  const currentMinutes = running ? elapsedSeconds / 60 : 0;
  const todayMinutes = todayEvents.reduce((sum, event) => sum + event.minutes, 0) + currentMinutes;
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = dayKey(date);
    return {
      label: date.toLocaleDateString("en", { weekday: "short" }),
      minutes:
        events
          .filter((event) => dayKey(new Date(event.createdAt)) === key)
          .reduce((sum, event) => sum + event.minutes, 0) + (key === today ? currentMinutes : 0),
    };
  });

  const studyMix = ["reading", "flashcards", "test", "planning"].map((kind) => ({
    label: kind,
    value: events.filter((event) => event.kind === kind).reduce((sum, event) => sum + event.minutes, 0),
  }));
  const tests = events.filter((event) => event.kind === "test" && event.total);
  const averageScore = tests.length
    ? Math.round((tests.reduce((sum, event) => sum + ((event.score ?? 0) / (event.total ?? 1)) * 100, 0) / tests.length))
    : 0;

  return {
    events,
    running,
    elapsedSeconds,
    todayMinutes,
    todayEvents,
    last7Days,
    studyMix,
    averageScore,
    logEvent,
    startFocus,
    stopFocus,
  };
}

export type StudyTelemetry = ReturnType<typeof useStudyTelemetry>;
