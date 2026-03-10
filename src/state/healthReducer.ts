import type { AppState, DailyLog, Workout } from '../types/health';

export type Action =
  | { type: 'ADD_WORKOUT'; payload: Workout }
  | { type: 'DELETE_WORKOUT'; payload: string }
  | { type: 'SET_DAILY_LOG'; payload: DailyLog };

export function healthReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_WORKOUT': {
      return { ...state, workouts: [...state.workouts, action.payload] };
    }
    case 'DELETE_WORKOUT': {
      return {
        ...state,
        workouts: state.workouts.filter((workout) => workout.id !== action.payload),
      };
    }
    case 'SET_DAILY_LOG': {
      return {
        ...state,
        logs: { ...state.logs, [action.payload.date]: action.payload },
      };
    }
    default:
      return state;
  }
}
