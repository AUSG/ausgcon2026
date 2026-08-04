import type { Speaker } from "@/data/conference";
import Image from "next/image";

interface SpeakerPortraitProps {
  speaker: Speaker;
  index: number;
  variant?: "card" | "dialog";
}

export function SpeakerPortrait({ speaker, index, variant = "card" }: SpeakerPortraitProps) {
  const imageSources = speaker.image ? (Array.isArray(speaker.image) ? speaker.image : [speaker.image]) : [];
  const names = speaker.name.split(" · ");
  const baseClass = variant === "dialog" ? "speaker-dialog__portrait" : "speaker-card__portrait";
  const hasPhoto = imageSources.length > 0;

  return (
    <div
      className={`${baseClass} speaker-card__portrait--${speaker.track.toLowerCase()}${hasPhoto ? " speaker-card__portrait--photo" : ""}`}
      aria-label={hasPhoto ? `${speaker.name} 프로필 사진` : `${speaker.name} 프로필 이미지 준비 중`}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      {hasPhoto ? (
        <div className={`speaker-card__images${imageSources.length > 1 ? " speaker-card__images--duo" : ""}`}>
          {imageSources.map((source, imageIndex) => (
            <div className="speaker-card__image" key={source}>
              <Image
                src={source}
                alt={`${names[imageIndex] ?? speaker.name} 연사`}
                fill
                sizes={variant === "dialog" ? "148px" : "(max-width: 768px) 45vw, 20vw"}
              />
            </div>
          ))}
        </div>
      ) : (
        <strong>{speaker.name.includes(" · ") ? "지 · 장" : speaker.name.slice(0, 1)}</strong>
      )}
    </div>
  );
}
