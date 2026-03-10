import type { ReactNode } from 'react';
export type WorkoutType = 'strength' | 'cardio' | 'rest';

export interface Workout {
  id: string;
  type: WorkoutType;
  duration: number;
  date: string;
}

export interface DailyLog {
  date: string;
  sleepHours: number;
  waterIntake: number;
  energyLevel: 1 | 2 | 3 | 4 | 5;
}

export interface AppState {
  workouts: Workout[];
  logs: Record<string, DailyLog>;
}

export interface Props {
  children: ReactNode;
}
