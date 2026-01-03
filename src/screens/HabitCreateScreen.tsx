import { useState } from "react";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

export function HabitCreateScreen() {
  const { resolution, addHabit, setScreen, habits } = useApp();
  const [name, setName] = useState(resolution?.text || "");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const handleCreate = () => {
    if (name.trim()) {
      addHabit({ name: name.trim(), frequency });
      setScreen("habit-tracker");
    }
  };

  const handleSkip = () => {
    setScreen("habit-tracker");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 animate-fade-in">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full">
        <Mascot state="normal" size="md" />
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Let's make it a habit!
          </h2>
          <p className="text-muted-foreground">
            Small steps, big changes.
          </p>
        </div>

        <div className="w-full space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Habit name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Practice guitar for 30 minutes"
              className="w-full h-14 px-4 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              How often?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFrequency("daily")}
                className={`h-12 rounded-lg border-2 font-medium transition-all ${
                  frequency === "daily"
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setFrequency("weekly")}
                className={`h-12 rounded-lg border-2 font-medium transition-all ${
                  frequency === "weekly"
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
          
          <Button 
            variant="hero" 
            className="w-full mt-4" 
            onClick={handleCreate}
            disabled={!name.trim()}
          >
            Create habit
          </Button>

          {habits.length > 0 && (
            <Button 
              variant="ghost" 
              className="w-full" 
              onClick={handleSkip}
            >
              Skip for now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
