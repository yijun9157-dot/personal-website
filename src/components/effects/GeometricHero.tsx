"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }, delta) => {
    if (!meshRef.current) return;
    mouseTarget.current.x += (pointer.x - mouseTarget.current.x) * 0.05;
    mouseTarget.current.y += (pointer.y - mouseTarget.current.y) * 0.05;

    meshRef.current.rotation.x += (mouseTarget.current.y * 0.5 - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (mouseTarget.current.x * 0.5 - meshRef.current.rotation.y) * 0.02;
    meshRef.current.rotation.z += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <torusKnotGeometry args={[1, 0.3, 200, 32]} />
      <meshStandardMaterial
        color="#06b6d4"
        metalness={0.3}
        roughness={0.2}
        emissive="#0a3a4e"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#22d3ee" />
      <pointLight position={[-5, -3, -3]} intensity={1} color="#f0c040" />
      <pointLight position={[0, -5, 0]} intensity={0.6} color="#06b6d4" />
      <directionalLight position={[0, 10, 0]} intensity={0.3} />
    </>
  );
}

export default function GeometricHero() {
  const reduce = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <TorusKnot />
        </Suspense>
      </Canvas>
    </div>
  );
}
