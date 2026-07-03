"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const SplineReact = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false }
);

interface Props {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} aria-hidden="true">
        <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
          3D 场景已禁用 (reduced motion)
        </div>
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <SplineReact scene={scene} />
    </div>
  );
}
