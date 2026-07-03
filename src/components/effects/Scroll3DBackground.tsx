"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";

/* ── Cave wall fragment ── */
function createCaveWall() {
  const group = new THREE.Group();
  // irregular rock face using icosahedron with heavy displacement
  const geo = new THREE.IcosahedronGeometry(0.8, 3);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const noise = Math.sin(x * 3) * Math.cos(z * 3) * 0.4 + Math.sin(y * 4 + x) * 0.3;
    const scale = 0.6 + noise;
    pos.setX(i, x * scale);
    pos.setY(i, y * scale);
    pos.setZ(i, z * scale);
  }
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.55 + Math.random() * 0.08, 0.3, 0.08 + Math.random() * 0.06),
    roughness: 0.85,
    metalness: 0.05,
    flatShading: true,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.set(1 + Math.random() * 2, 0.8 + Math.random() * 1.5, 1 + Math.random() * 2);
  return mesh;
}

/* ── Cave Scene ── */
function CavernScene() {
  const groupRef = useRef<THREE.Group>(null);
  const walls = useMemo(() => {
    const arr: { mesh: THREE.Mesh; baseY: number; floatAmp: number; floatPhase: number }[] = [];

    // ring of wall fragments around the edges
    for (let i = 0; i < 40; i++) {
      const mesh = createCaveWall();
      const angle = (i / 40) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const r = 7 + Math.random() * 5;
      mesh.position.set(
        Math.cos(angle) * r,
        (Math.random() - 0.3) * 10,
        Math.sin(angle) * r,
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * 0.5);
      arr.push({ mesh, baseY: mesh.position.y, floatAmp: 0.1 + Math.random() * 0.25, floatPhase: Math.random() * Math.PI * 2 });
    }

    // ceiling ring - darker, higher
    for (let i = 0; i < 25; i++) {
      const mesh = createCaveWall();
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.56, 0.25, 0.04 + Math.random() * 0.03),
        roughness: 0.9,
        metalness: 0.02,
        flatShading: true,
      });
      const angle = (i / 25) * Math.PI * 2 + Math.random() * 0.3;
      const r = 3 + Math.random() * 6;
      mesh.position.set(
        Math.cos(angle) * r,
        5 + Math.random() * 3,
        Math.sin(angle) * r,
      );
      mesh.rotation.set(Math.random() * 0.8, Math.random() * Math.PI, 0);
      mesh.scale.multiplyScalar(0.7);
      arr.push({ mesh, baseY: mesh.position.y, floatAmp: 0.05 + Math.random() * 0.1, floatPhase: Math.random() * Math.PI * 2 });
    }

    // bottom scattered rocks
    for (let i = 0; i < 15; i++) {
      const mesh = createCaveWall();
      const angle = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 6;
      mesh.position.set(
        Math.cos(angle) * r,
        -5 - Math.random() * 3,
        Math.sin(angle) * r,
      );
      mesh.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5);
      mesh.scale.multiplyScalar(0.6);
      arr.push({ mesh, baseY: mesh.position.y, floatAmp: 0.05 + Math.random() * 0.15, floatPhase: Math.random() * Math.PI * 2 });
    }

    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.01;
    const time = performance.now() * 0.001;
    walls.forEach((w) => {
      w.mesh.position.y = w.baseY + Math.sin(time * 0.3 + w.floatPhase) * w.floatAmp;
    });
  });

  return (
    <group ref={groupRef}>
      {walls.map((w, i) => (
        <primitive key={i} object={w.mesh} />
      ))}
    </group>
  );
}

/* ── Surface light portal ── */
function SurfaceLight() {
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} position={[0, 7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.3, 3.5, 64]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv; varying vec3 vPos;
          void main() { vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `}
        fragmentShader={`
          varying vec2 vUv; varying vec3 vPos;
          uniform float uTime;
          void main() {
            float d = length(vUv - 0.5) * 2.0;
            float glow = exp(-d * 2.5) * 0.8 + exp(-d * 6.0) * 0.3;
            float flicker = 1.0 + sin(uTime * 2.0 + d * 10.0) * 0.05;
            float alpha = glow * flicker;
            vec3 color = mix(vec3(0.13, 0.83, 0.93), vec3(0.8, 1.0, 1.0), 1.0 - d);
            gl_FragColor = vec4(color, alpha * 0.5);
          }
        `}
      />
    </mesh>
  );
}

/* ── Light rays from above ── */
function LightRays() {
  const rays = useMemo(() => {
    const arr: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const geo = new THREE.CylinderGeometry(0.02, 0.1 + Math.random() * 0.4, 6 + Math.random() * 4, 8);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.54, 0.6, 0.3 + Math.random() * 0.4),
        transparent: true,
        opacity: 0.08 + Math.random() * 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 4,
        3 + Math.random() * 4,
        (Math.random() - 0.5) * 4,
      );
      mesh.rotation.x = Math.random() * 0.3;
      mesh.rotation.z = (Math.random() - 0.5) * 0.4;
      arr.push(mesh);
    }
    return arr;
  }, []);

  return (
    <group>
      {rays.map((ray, i) => (
        <primitive key={i} object={ray} />
      ))}
    </group>
  );
}

/* ── Floating bubbles/sediment ── */
function DeepParticles() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      const c = new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.5, 0.3 + Math.random() * 0.4);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    // slow upward drift
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setY(i, y + delta * 0.1);
      if (y > 6) pos.setY(i, -6);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Eerie glow ring at depth ── */
function AbyssGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, -3, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2, 0.008, 16, 100]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.2} />
    </mesh>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.04} />
      {/* main light from above - the portal */}
      <pointLight position={[0, 7, 0]} intensity={3} color="#22d3ee" distance={20} decay={1.5} />
      <pointLight position={[0, 6, 0]} intensity={1} color="#ffffff" distance={15} decay={2} />
      {/* subtle side fills */}
      <pointLight position={[-4, -1, -2]} intensity={0.3} color="#06b6d4" distance={10} />
      <pointLight position={[3, -2, 3]} intensity={0.2} color="#f0c040" distance={8} />
    </>
  );
}

function ScrollCamera() {
  useFrame(({ camera }) => {
    const scroll = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const t = Math.min(1, Math.max(0, scroll));
    // camera slowly moves upward through the cavern
    const y = -2 + t * 6;
    const z = 8 - t * 3;
    camera.position.lerp(new THREE.Vector3(0, y, z), 0.012);
    camera.lookAt(0, y + 2, 0);
  });
  return null;
}

export default function Scroll3DBackground() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, -2, 8], fov: 55, near: 0.1, far: 40 }}
        dpr={[1, 1.2]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneLighting />
        <CavernScene />
        <SurfaceLight />
        <LightRays />
        <DeepParticles />
        <AbyssGlow />
        <ScrollCamera />
      </Canvas>
    </div>
  );
}
