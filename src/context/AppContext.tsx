import { createContext, useContext, useState, ReactNode } from "react";
import { AppScreen, Resolution, Verdict, Habit, VerdictType, TimeUnit } from "@/types/app";

interface AppState {
  screen: AppScreen;
  resolution: Resolution | null;
  verdict: Verdict | null;
  habits: Habit[];
  isGuest: boolean;
}

interface AppContextType extends AppState {
  setScreen: (screen: AppScreen) => void;
  setResolution: (resolution: Resolution) => void;
  setVerdict: (verdict: Verdict) => void;
  addHabit: (habit: Omit<Habit, "id" | "createdAt" | "completedDays">) => void;
  toggleHabitDay: (habitId: string, date: string) => void;
  setIsGuest: (isGuest: boolean) => void;
  resetFlow: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: "entry",
    resolution: null,
    verdict: null,
    habits: [],
    isGuest: true,
  });

  const setScreen = (screen: AppScreen) => {
    setState((prev) => ({ ...prev, screen }));
  };

  const setResolution = (resolution: Resolution) => {
    setState((prev) => ({ ...prev, resolution }));
  };

  const setVerdict = (verdict: Verdict) => {
    setState((prev) => ({ ...prev, verdict }));
  };

  const addHabit = (habit: Omit<Habit, "id" | "createdAt" | "completedDays">) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completedDays: [],
    };
    setState((prev) => ({ ...prev, habits: [...prev.habits, newHabit] }));
  };

  const toggleHabitDay = (habitId: string, date: string) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedDays: habit.completedDays.includes(date)
                ? habit.completedDays.filter((d) => d !== date)
                : [...habit.completedDays, date],
            }
          : habit
      ),
    }));
  };

  const setIsGuest = (isGuest: boolean) => {
    setState((prev) => ({ ...prev, isGuest }));
  };

  const resetFlow = () => {
    setState((prev) => ({
      ...prev,
      screen: "resolution-input",
      resolution: null,
      verdict: null,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setScreen,
        setResolution,
        setVerdict,
        addHabit,
        toggleHabitDay,
        setIsGuest,
        resetFlow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
