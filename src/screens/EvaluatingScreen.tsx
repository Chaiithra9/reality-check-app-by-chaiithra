import { useEffect } from "react";
import { Mascot } from "@/components/Mascot";
import { useApp } from "@/context/AppContext";
import { Verdict, VerdictType } from "@/types/app";

const verdictCopy = {
  delusional: [
    "Okay. I love the confidence. Truly.\nBut this plan assumes you wake up motivated every day… which even I don't do.",
    "This goal is emotionally inspiring and logistically unhinged.\nDon't worry — we can rescue it.",
    "I admire this goal. I do not believe it has met your calendar.",
  ],
  optimistic: [
    "This could work…\nbut only if we stop pretending you're available 24/7.",
    "This is doable, but only if we make it slightly less dramatic.",
    "I wouldn't cancel my meetings for this —\nbut I also wouldn't give up yet.",
  ],
  achievable: [
    "I like this.\nIt respects your ambition and your exhaustion.",
    "This goal understands you have a job.\nThat's rare. I'm proud.",
    "This is the kind of plan that quietly works\nwhile others post about quitting.",
  ],
};

function getRandomCopy(type: VerdictType): string {
  const options = verdictCopy[type];
  return options[Math.floor(Math.random() * options.length)];
}

// Mock verdict generator (will be replaced with AI)
function generateMockVerdict(resolutionText: string, hours: number, unit: string): Verdict {
  const hoursPerWeek = 
    unit === "day" ? hours * 7 :
    unit === "week" ? hours :
    unit === "month" ? hours / 4 :
    hours / 52;

  let type: VerdictType;
  let title: string;

  if (hoursPerWeek >= 5) {
    type = "achievable";
    title = "Actually Achievable";
  } else if (hoursPerWeek >= 2) {
    type = "optimistic";
    title = "Optimistic but Possible";
  } else {
    type = "delusional";
    title = "Delusional (but we admire the confidence)";
  }

  return {
    type,
    title,
    explanation: getRandomCopy(type),
  };
}

export function EvaluatingScreen() {
  const { resolution, setVerdict, setScreen } = useApp();

  useEffect(() => {
    if (!resolution) {
      setScreen("resolution-input");
      return;
    }

    // Simulate AI thinking delay
    const timer = setTimeout(() => {
      const verdict = generateMockVerdict(
        resolution.text,
        resolution.timeAmount,
        resolution.timeUnit
      );
      setVerdict(verdict);
      setScreen("verdict");
    }, 2500);

    return () => clearTimeout(timer);
  }, [resolution, setVerdict, setScreen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <div className="flex flex-col items-center gap-8 max-w-sm w-full">
        <Mascot state="thinking" size="lg" />
        
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-foreground">
            Thinking...
          </h2>
          <p className="text-muted-foreground animate-pulse-soft">
            Consulting the reality gods...
          </p>
        </div>

        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
