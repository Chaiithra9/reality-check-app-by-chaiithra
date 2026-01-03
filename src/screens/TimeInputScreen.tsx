import { useState } from "react";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { TimeUnit } from "@/types/app";

const timeUnits: { value: TimeUnit; label: string }[] = [
  { value: "day", label: "per day" },
  { value: "week", label: "per week" },
  { value: "month", label: "per month" },
  { value: "year", label: "per year" },
];

export function TimeInputScreen() {
  const { resolution, setResolution, setScreen } = useApp();
  const [hours, setHours] = useState<string>(resolution?.timeAmount?.toString() || "");
  const [unit, setUnit] = useState<TimeUnit>(resolution?.timeUnit || "week");

  const handleSubmit = () => {
    const amount = parseFloat(hours);
    if (amount > 0 && resolution) {
      setResolution({
        ...resolution,
        timeAmount: amount,
        timeUnit: unit,
      });
      setScreen("evaluating");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <Mascot state="normal" size="md" />
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            How much time can you realistically give this?
          </h2>
          <p className="text-muted-foreground">
            Be honest — we won't judge.
          </p>
        </div>

        <div className="w-full space-y-4 mt-4">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="0"
              min="0"
              step="0.5"
              className="flex-1 h-14 px-4 rounded-lg border-2 border-border bg-card text-foreground text-center text-xl font-semibold focus:border-primary focus:outline-none transition-colors"
            />
            <span className="text-lg text-muted-foreground">hours</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {timeUnits.map((option) => (
              <button
                key={option.value}
                onClick={() => setUnit(option.value)}
                className={`h-12 rounded-lg border-2 font-medium transition-all ${
                  unit === option.value
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <Button 
            variant="hero" 
            className="w-full mt-4" 
            onClick={handleSubmit}
            disabled={!hours || parseFloat(hours) <= 0}
          >
            Check my reality
          </Button>
        </div>
      </div>
    </div>
  );
}
