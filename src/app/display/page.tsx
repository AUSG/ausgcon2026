import type { Metadata } from "next";
import Home from "../page";
import { DisplayOverlay } from "./DisplayOverlay";

export const metadata: Metadata = {
  title: "AUSGCON 2026 — Display",
  description: "AUSGCON 2026 행사장 모니터용 자동 스크롤 화면",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DisplayPage() {
  return (
    <div className="display-page">
      <Home />
      <DisplayOverlay />
    </div>
  );
}
