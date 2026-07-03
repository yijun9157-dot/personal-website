"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function VideoLayers() {
  const { size, viewport } = useThree();
  const [ready, setReady] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  const [video] = useState(() => {
    const v = document.createElement("video");
    v.src = "/ocean-bg.mp4";
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.loop = false;
    const onReady = () => { if (v.readyState >= 2) { setReady(true); } };
    v.addEventListener("loadeddata", onReady);
    v.addEventListener("canplay", onReady);
    if (v.readyState >= 2) onReady();
    return v;
  });

  const tex = useMemo(() => {
    const t = new THREE.VideoTexture(video);
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [video]);

  // 3 depth layers for parallax
  const layers = [
    { z: -2.5, opacity: 0.08, scale: 1.12 },
    { z: -1.2, opacity: 0.15, scale: 1.06 },
    { z: 0,    opacity: 0.28, scale: 1.0 },
  ];

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (video.duration && isFinite(video.duration)) {
          video.currentTime = self.progress * video.duration;
        }
      },
    });
    return () => { st.kill(); };
  }, [video]);

  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  const videoAspect = 16 / 9;
  const viewAspect = size.width / size.height;
  let w: number, h: number;
  if (viewAspect > videoAspect) {
    w = viewport.width * 1.1;
    h = (viewport.width / videoAspect) * 1.1;
  } else {
    h = viewport.height * 1.1;
    w = viewport.height * videoAspect * 1.1;
  }

  return (
    <group ref={groupRef}>
      {layers.map((l, i) => (
        <mesh key={i} position={[0, 0, l.z]}>
          <planeGeometry args={[w * l.scale, h * l.scale]} />
          <meshBasicMaterial map={tex} transparent opacity={l.opacity} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function VideoBackground() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50, near: 0.5, far: 15 }}
        dpr={[1, 1]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <VideoLayers />
      </Canvas>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 15%, rgba(1,10,18,0.9) 100%)" }}
      />
    </div>
  );
}
