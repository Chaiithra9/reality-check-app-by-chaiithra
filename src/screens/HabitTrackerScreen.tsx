import { useState } from "react";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { HabitGrid } from "@/components/HabitGrid";

export function HabitTrackerScreen() {
  const { habits, resetFlow, setScreen } = useApp();
  const [showWarning, setShowWarning] = useState(false);

  const handleNewResolution = () => {
    resetFlow();
  };

  const handleAddHabit = () => {
    if (habits.length >= 6) {
      setShowWarning(true);
      return;
    }
    setScreen("habit-create");
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Your Habits</h1>
        <Mascot state="normal" size="sm" />
      </div>

      {habits.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <p className="text-muted-foreground text-center">
            No habits yet. Check a resolution and commit to it!
          </p>
          <Button variant="hero" onClick={handleNewResolution}>
            Check a resolution
          </Button>
        </div>
      ) : (
        <div className="flex-1 space-y-6 overflow-auto pb-24">
          {habits.map((habit) => (
            <HabitGrid key={habit.id} habit={habit} />
          ))}
        </div>
      )}

      {habits.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
          <div className="max-w-sm mx-auto flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleNewResolution}
            >
              New check
            </Button>
            <Button 
              variant="default" 
              className="flex-1" 
              onClick={handleAddHabit}
            >
              Add habit
            </Button>
          </div>
        </div>
      )}

      {/* Warning popup for too many habits */}
      {showWarning && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={() => setShowWarning(false)}
        >
          <div 
            className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-medium animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-4">
              <Mascot state="normal" size="sm" />
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-foreground">
                  Slow down there, champ!
                </h3>
                <p className="text-muted-foreground text-sm">
                  You've got {habits.length} habits already. That's amazing commitment, 
                  but maybe focus on these before adding more?
                </p>
              </div>
              <Button 
                variant="default" 
                className="w-full" 
                onClick={() => setShowWarning(false)}
              >
                You're right
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
