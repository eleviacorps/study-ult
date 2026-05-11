"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

function ParticleField() {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(1500);
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
        color="#8fe8ff"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
}

export function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#03030a]">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 55 }} className="opacity-70">
        <ambientLight intensity={0.48} />
        <ParticleField />
      </Canvas>
      <div className="motion-aurora absolute inset-0 bg-[radial-gradient(circle_at_8%_16%,rgba(255,116,72,0.28),transparent_28%),radial-gradient(circle_at_78%_8%,rgba(121,83,255,0.25),transparent_34%),radial-gradient(circle_at_68%_82%,rgba(40,214,189,0.2),transparent_30%),radial-gradient(circle_at_44%_42%,rgba(79,70,229,0.12),transparent_38%),linear-gradient(180deg,rgba(4,5,12,0.02),#03030a_88%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10 shadow-[0_0_140px_rgba(40,214,189,0.1),inset_0_0_120px_rgba(124,58,237,0.08)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.05)_42%,transparent_60%)]" />
    </div>
  );
}
