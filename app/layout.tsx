import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "赵明啸 — AI影像 / 视觉设计作品集",
    template: "%s",
  },
  description: "赵明啸的 AI 影像、视频剪辑与视觉设计作品集，收录 AIGC 微电影、微短剧与校园实拍项目。",
  keywords: ["赵明啸", "AI设计师", "视觉设计师", "AIGC", "视频剪辑", "作品集"],
  authors: [{ name: "赵明啸" }],
  creator: "赵明啸",
  openGraph: {
    title: "赵明啸 — AI影像 / 视觉设计作品集",
    description: "五个真实影像项目，以及它们从概念到成片的完整创作过程。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "赵明啸作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "赵明啸 — AI影像 / 视觉设计作品集",
    description: "AI影像、视频剪辑与视觉设计作品集。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
