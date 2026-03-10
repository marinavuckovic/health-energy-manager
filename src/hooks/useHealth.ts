import { useContext } from 'react';
import { HealthContext } from '../context/HealthContext';

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('Context provided null value');
  }
  return context;
}
