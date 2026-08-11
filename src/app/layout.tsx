import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "山海赴约｜深圳往返云南的十三日路书",
  description:
    "从深圳出发，在玉林中秋团圆，穿过昆明、大理、香格里拉与梅里，再经丽江、百色回到深圳的十三日自驾路书。",
  openGraph: {
    title: "山海赴约｜深圳往返云南的十三日路书",
    description:
      "从深圳出发，在玉林中秋团圆，穿过昆明、大理、香格里拉与梅里，再经丽江、百色回到深圳的十三日自驾路书。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased scroll-smooth">
      <body className="min-h-full bg-[#F7F3EA] text-[#1E293B] font-sans">
        {children}
      </body>
    </html>
  );
}
