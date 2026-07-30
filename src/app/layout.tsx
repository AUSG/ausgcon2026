import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AUSGCON 2026: CHALLENGE",
  description:
    "클라우드에서 기술로, 도전에서 다음 도약으로. AUSGCON 2026.",
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
