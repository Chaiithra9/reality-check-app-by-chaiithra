import { Mascot, MascotState } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { VerdictType } from "@/types/app";

const verdictStyles: Record<VerdictType, { bg: string; badge: string; emoji: string }> = {
  achievable: {
    bg: "bg-verdict-achievable-bg",
    badge: "bg-verdict-achievable text-white",
    emoji: "🟢",
  },
  optimistic: {
    bg: "bg-verdict-optimistic-bg",
    badge: "bg-verdict-optimistic text-white",
    emoji: "🟡",
  },
  delusional: {
    bg: "bg-verdict-delusional-bg",
    badge: "bg-verdict-delusional text-white",
    emoji: "🔴",
  },
};

const mascotStates: Record<VerdictType, MascotState> = {
  achievable: "normal",
  optimistic: "normal",
  delusional: "sad",
};

export function VerdictScreen() {
  const { verdict, setScreen, resetFlow } = useApp();

  if (!verdict) {
    setScreen("resolution-input");
    return null;
  }

  const styles = verdictStyles[verdict.type];
  const mascotState = mascotStates[verdict.type];

  const handleJustChecking = () => {
    resetFlow();
  };

  const handleLetsTry = () => {
    setScreen("habit-create");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-slide-up">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <Mascot state={mascotState} size="md" />
        
        <div className={`w-full p-6 rounded-2xl ${styles.bg} space-y-4`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{styles.emoji}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles.badge}`}>
              {verdict.title}
            </span>
          </div>
          
          <p className="text-foreground leading-relaxed">
            {verdict.explanation}
          </p>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          This isn't a personality test. Your worth isn't tied to your productivity.
        </p>

        <div className="w-full space-y-3 mt-4">
          <Button 
            variant="verdict" 
            className="w-full" 
            onClick={handleJustChecking}
          >
            Just checking
          </Button>
          
          <Button 
            variant="hero" 
            className="w-full" 
            onClick={handleLetsTry}
          >
            Let's try this
          </Button>
        </div>
      </div>
    </div>
  );
}
