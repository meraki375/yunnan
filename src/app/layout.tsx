import type { Metadata } from "next";
import { IBM_Plex_Mono, Noto_Serif_SC, ZCOOL_XiaoWei } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-serif-sc",
});

const zcoolXiaoWei = ZCOOL_XiaoWei({
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-zcool-xiaowei",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "山海赴约｜深圳往返云南的十三日路书",
  description:
    "从深圳出发，在玉林中秋团圆，穿过昆明、大理、香格里拉与梅里，再经丽江、昆明与南宁回到深圳的十三日自驾路书。",
  openGraph: {
    title: "山海赴约｜深圳往返云南的十三日路书",
    description:
      "从深圳出发，在玉林中秋团圆，穿过昆明、大理、香格里拉与梅里，再经丽江、昆明与南宁回到深圳的十三日自驾路书。",
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
    <html lang="zh-CN" className={`${notoSerifSC.variable} ${zcoolXiaoWei.variable} ${ibmPlexMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full bg-[#F7F3EA] text-[#1E293B] font-sans">
        {children}
      </body>
    </html>
  );
}
