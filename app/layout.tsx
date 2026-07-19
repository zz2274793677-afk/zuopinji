import type { Metadata } from "next";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://zhao-mingxiao-portfolio.fuzzy-clove-4197.chatgpt.site"),
  title: {
    default: "赵明啸 — 视觉 / AI / 品牌设计作品集",
    template: "%s",
  },
  description: "赵明啸的视觉设计、AI影像与品牌表达作品集，收录 AIGC 微电影、微短剧与校园实拍项目。",
  keywords: ["赵明啸", "AI设计师", "视觉设计师", "AIGC", "视频剪辑", "作品集"],
  authors: [{ name: "赵明啸" }],
  creator: "赵明啸",
  openGraph: {
    title: "赵明啸 — 视觉 / AI / 品牌设计作品集",
    description: "五个真实影像项目，以及它们从概念到成片的完整创作过程。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "赵明啸作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "赵明啸 — 视觉 / AI / 品牌设计作品集",
    description: "视觉设计、AI影像与品牌表达作品集。",
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
      <body>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
