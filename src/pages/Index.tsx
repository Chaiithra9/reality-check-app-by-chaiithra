import { AppProvider, useApp } from "@/context/AppContext";
import { EntryScreen } from "@/screens/EntryScreen";
import { ResolutionInputScreen } from "@/screens/ResolutionInputScreen";
import { TimeInputScreen } from "@/screens/TimeInputScreen";
import { EvaluatingScreen } from "@/screens/EvaluatingScreen";
import { VerdictScreen } from "@/screens/VerdictScreen";
import { HabitCreateScreen } from "@/screens/HabitCreateScreen";
import { HabitTrackerScreen } from "@/screens/HabitTrackerScreen";

function AppContent() {
  const { screen } = useApp();

  switch (screen) {
    case "entry":
      return <EntryScreen />;
    case "resolution-input":
      return <ResolutionInputScreen />;
    case "time-input":
      return <TimeInputScreen />;
    case "evaluating":
      return <EvaluatingScreen />;
    case "verdict":
      return <VerdictScreen />;
    case "habit-create":
      return <HabitCreateScreen />;
    case "habit-tracker":
      return <HabitTrackerScreen />;
    default:
      return <EntryScreen />;
  }
}

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <AppContent />
      </div>
    </AppProvider>
  );
};

export default Index;
