import { createContext, useEffect, useReducer } from 'react';
import type { AppState, Props } from '../types/health';
import { healthReducer, type Action } from '../state/healthReducer';
import { initialState } from '../state/initialState';

export interface HealthContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const HealthContext = createContext<HealthContextType | null>(null);

export function HealthProvider({ children }: Props) {
  const savedState = localStorage.getItem('board');
  const parsedState = savedState ? (JSON.parse(savedState) as AppState) : initialState;
  const [state, dispatch] = useReducer(healthReducer, parsedState);

  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(state));
  }, [state]);

  return <HealthContext.Provider value={{ state, dispatch }}>{children}</HealthContext.Provider>;
}
