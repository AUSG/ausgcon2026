import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://2026.ausg.me"),
  title: "AUSGCON 2026; CHALLENGE",
  description:
    "기술에 대한 깊이 있는 탐구와 과감한 도전을 바탕으로,  서로의 경험과 영감을 나누고 새로운 가능성을 확장하며 미래를 함께 준비합니다",
  openGraph: {
    title: "AUSGCON 2026; CHALLENGE DIVE INTO TECH, JUMP INTO FUTURE",
    description:
      "기술에 대한 깊이 있는 탐구와 과감한 도전을 바탕으로,  서로의 경험과 영감을 나누고 새로운 가능성을 확장하며 미래를 함께 준비합니다",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/assets/ausgcon/og-image.png",
        width: 1920,
        height: 1170,
        alt: "AUSGCON 2026; CHALLENGE DIVE INTO TECH, JUMP INTO FUTURE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUSGCON 2026; CHALLENGE DIVE INTO TECH, JUMP INTO FUTURE",
    description:
      "기술에 대한 깊이 있는 탐구와 과감한 도전을 바탕으로,  서로의 경험과 영감을 나누고 새로운 가능성을 확장하며 미래를 함께 준비합니다",
    images: ["/assets/ausgcon/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
