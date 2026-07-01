export interface Work {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
}

export const works: Work[] = [];

export const categories = ["全部", "图像生成", "视频生成", "音乐生成", "3D"] as const;
export type Category = (typeof categories)[number];
