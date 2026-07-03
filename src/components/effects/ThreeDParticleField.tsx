"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

function Particles({ mouse }: { mouse: React.RefObject<THREE.Vector2> }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 2500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    const teal = new THREE.Color("#06b6d4");
    const aqua = new THREE.Color("#22d3ee");
    const gold = new THREE.Color("#f0c040");
    const coral = new THREE.Color("#f97316");

    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(1.5 * Math.random() - 0.8); // bias toward upper hemisphere
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mix = Math.random();
      const c = teal.clone().lerp(aqua, mix).lerp(gold, Math.random() * 0.15).lerp(coral, Math.random() * 0.05);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = Math.random() * 0.05 + 0.015;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.02;
    meshRef.current.rotation.x += delta * 0.006;
    if (mouse.current) {
      meshRef.current.rotation.y += mouse.current.x * 0.0001;
      meshRef.current.rotation.x += mouse.current.y * 0.0001;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors blending={THREE.AdditiveBlending} depthWrite={false} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function MouseTracker({ mouse }: { mouse: React.RefObject<THREE.Vector2> }) {
  const prev = useRef<THREE.Vector2>(new THREE.Vector2());
  useFrame(({ pointer }) => {
    if (!mouse.current) return;
    prev.current.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.03);
    mouse.current.copy(prev.current);
  });
  return null;
}

export default function ThreeDParticleField() {
  const reduce = useReducedMotion();
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2());
  if (reduce) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 2, 20], fov: 60, near: 0.1, far: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true }}>
        <MouseTracker mouse={mouse} />
        <Particles mouse={mouse} />
      </Canvas>
    </div>
  );
}
