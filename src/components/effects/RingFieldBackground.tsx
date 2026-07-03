"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

function RingSystem() {
  const groupRef = useRef<THREE.Group>(null);

  const rings = useMemo(() => {
    const configs = [
      { radius: 2.5, tube: 0.015, rotX: 0.2, rotY: 0, color: "#22d3ee", speed: 0.15 },
      { radius: 3.2, tube: 0.012, rotX: -0.4, rotY: 0.5, color: "#06b6d4", speed: -0.12 },
      { radius: 4.0, tube: 0.01, rotX: 0.6, rotY: -0.3, color: "#f0c040", speed: 0.1 },
      { radius: 4.8, tube: 0.008, rotX: -0.3, rotY: -0.6, color: "#22d3ee", speed: -0.08 },
      { radius: 5.6, tube: 0.006, rotX: 0.7, rotY: 0.4, color: "#06b6d4", speed: 0.06 },
    ];
    return configs;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.03;
    groupRef.current.rotation.x += delta * 0.01;

    groupRef.current.children.forEach((child, i) => {
      if (i >= rings.length) return;
      child.rotation.z += rings[i].speed * delta;
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((cfg, i) => (
        <mesh key={i} rotation={[cfg.rotX, cfg.rotY, 0]}>
          <torusGeometry args={[cfg.radius, cfg.tube, 32, 150]} />
          <meshBasicMaterial color={cfg.color} transparent opacity={0.18} />
        </mesh>
      ))}
      {/* orbit particles on the largest ring */}
      <ParticleRing radius={5.6} count={120} color="#f0c040" speed={0.06} />
      <ParticleRing radius={4.0} count={100} color="#22d3ee" speed={0.1} tilt={0.6} />
    </group>
  );
}

function ParticleRing({ radius, count, color, speed, tilt = 0 }: {
  radius: number; count: number; color: string; speed: number; tilt?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [radius, count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += speed * delta;
  });

  return (
    <points ref={ref} rotation={[tilt, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={color} blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.5} />
    </points>
  );
}

export default function RingFieldBackground() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 60, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <RingSystem />
      </Canvas>
    </div>
  );
}
