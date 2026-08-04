import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://2026.ausg.me"),
  title: "AUSGCON 2026; CHALLENGE",
  description: "DIVE INTO TECH, JUMP INTO FUTURE",
  openGraph: {
    title: "AUSGCON 2026; CHALLENGE DIVE INTO TECH, JUMP INTO FUTURE",
    description: "DIVE INTO TECH, JUMP INTO FUTURE",
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
    description: "DIVE INTO TECH, JUMP INTO FUTURE",
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
