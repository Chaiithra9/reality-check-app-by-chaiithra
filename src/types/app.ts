export type VerdictType = "achievable" | "optimistic" | "delusional";

export type TimeUnit = "day" | "week" | "month" | "year";

export interface Resolution {
  text: string;
  timeAmount: number;
  timeUnit: TimeUnit;
}

export interface Verdict {
  type: VerdictType;
  title: string;
  explanation: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  createdAt: Date;
  completedDays: string[]; // ISO date strings
}

export type AppScreen = 
  | "entry"
  | "resolution-input"
  | "time-input"
  | "evaluating"
  | "verdict"
  | "habit-create"
  | "habit-tracker";
