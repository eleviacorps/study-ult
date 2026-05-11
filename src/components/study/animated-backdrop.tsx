"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

function ParticleField() {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(900);
    for (let index = 0; index < values.length; index += 3) {
      const seed = index + 1;
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      const y = Math.sin(seed * 78.233) * 24634.6345;
      const z = Math.sin(seed * 39.425) * 19423.4242;
      values[index] = (x - Math.floor(x) - 0.5) * 16;
      values[index + 1] = (y - Math.floor(y) - 0.5) * 10;
      values[index + 2] = (z - Math.floor(z) - 0.5) * 10;
    }
    return values;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.035 + pointer.x * 0.08;
    ref.current.rotation.x = pointer.y * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#37d9ff"
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.42}
      />
    </points>
  );
}

export function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#030407]">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 55 }}>
        <ambientLight intensity={0.35} />
        <ParticleField />
      </Canvas>
      <div className="motion-aurora absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(190,232,238,0.12),transparent_24%),radial-gradient(circle_at_82%_4%,rgba(255,255,255,0.06),transparent_22%),linear-gradient(180deg,rgba(3,4,7,0.18),#020305_82%)]" />
      <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.045)_42%,transparent_60%)]" />
    </div>
  );
}
