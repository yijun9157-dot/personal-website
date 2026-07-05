export interface Work {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
  video?: string;
}

export const works: Work[] = [
  {
    id: "demo-1",
    title: "AI 生成短片",
    description: "全流程 AI 驱动创作 — 从脚本到成片，探索视觉叙事的全新可能。",
    category: "视频生成",
    image: "",
    video: "/work-demo.mp4",
  },
  {
    id: "demo-2",
    title: "场景构建",
    description: "AI 驱动的环境设计与场景生成，每一次迭代都是对视觉边界的拓展。",
    category: "视频生成",
    image: "",
    video: "/work-2.mp4",
  },
  {
    id: "img-1",
    title: "AI 图像作品",
    description: "AIGC 生成的视觉创作，探索光线、构图与色彩的可能性。",
    category: "图像生成",
    image: "/work-3.png",
  },
  {
    id: "img-2",
    title: "AI 图像作品",
    description: "AIGC 生成的视觉创作，探索光线、构图与色彩的可能性。",
    category: "图像生成",
    image: "/work-4.png",
  },
  {
    id: "img-3",
    title: "AI 图像作品",
    description: "AIGC 生成的视觉创作，探索光线、构图与色彩的可能性。",
    category: "图像生成",
    image: "/work-5.png",
  },
  {
    id: "img-4",
    title: "AI 图像作品",
    description: "AIGC 生成的视觉创作，探索光线、构图与色彩的可能性。",
    category: "图像生成",
    image: "/work-6.png",
  },
  {
    id: "img-5",
    title: "AI 图像作品",
    description: "AIGC 生成的视觉创作，探索光线、构图与色彩的可能性。",
    category: "图像生成",
    image: "/work-7.png",
  },
];

export const categories = ["全部", "图像生成", "视频生成", "音乐生成", "3D"] as const;
export type Category = (typeof categories)[number];
