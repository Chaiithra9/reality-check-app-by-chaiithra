import mascotNormal from "@/assets/mascot_normal.png";
import mascotThinking from "@/assets/mascot_thinking.png";
import mascotSad from "@/assets/mascot_sad.jpg";

export type MascotState = "normal" | "thinking" | "sad";

interface MascotProps {
  state: MascotState;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const mascotImages = {
  normal: mascotNormal,
  thinking: mascotThinking,
  sad: mascotSad,
};

const sizeClasses = {
  sm: "w-24 h-24",
  md: "w-36 h-36",
  lg: "w-48 h-48",
};

export function Mascot({ state, size = "md", className = "" }: MascotProps) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={mascotImages[state]}
        alt={`Mascot ${state}`}
        className={`${sizeClasses[size]} object-contain ${state === "thinking" ? "animate-float" : ""}`}
      />
    </div>
  );
}
