import { useState } from "react";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export function ResolutionInputScreen() {
  const { setResolution, setScreen, resolution } = useApp();
  const [text, setText] = useState(resolution?.text || "");

  const handleSubmit = () => {
    if (text.trim()) {
      setResolution({ 
        text: text.trim(), 
        timeAmount: 0, 
        timeUnit: "week" 
      });
      setScreen("time-input");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <Mascot state="normal" size="md" />
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            What's your New Year resolution?
          </h2>
          <p className="text-muted-foreground">
            No judgment here — just honesty.
          </p>
        </div>

        <div className="w-full space-y-4 mt-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Learn to play guitar, Run a marathon, Read 50 books..."
            className="w-full h-32 p-4 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none transition-colors"
          />
          
          <Button 
            variant="hero" 
            className="w-full" 
            onClick={handleSubmit}
            disabled={!text.trim()}
          >
            Be honest with me
          </Button>
        </div>
      </div>
    </div>
  );
}
