import { useState } from 'react';
import type { WorkoutType } from '../types/health';
import { useHealth } from '../hooks/useHealth';

export function AddWorkoutForm() {
  const { dispatch } = useHealth();
  const [workoutType, setWorkoutType] = useState<WorkoutType | ''>('');
  const [duration, setDuration] = useState<number | null>(null);
  const [adding, setAdding] = useState<boolean>(false);

  const handleCancel = () => {
    setWorkoutType('');
    setDuration(null);
    setAdding(false);
  };

  const handleAddWorkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (workoutType === '' || !duration) return;
    const workout = {
      id: crypto.randomUUID(),
      type: workoutType,
      duration: duration,
      date: new Date().toISOString().split('T')[0],
    };
    dispatch({
      type: 'ADD_WORKOUT',
      payload: workout,
    });
    handleCancel();
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        className={`${adding ? 'hidden' : 'block'} bg-green-700 text-white rounded-full m-3 py-2 px-5`}
        onClick={() => setAdding(true)}
      >
        + Add new Workout
      </button>
      <form
        className={`${adding ? 'block' : 'hidden'} m-3 bg-gray-200 rounded shadow-lg px-3 py-1 flex gap-3 justify-evenly`}
        onSubmit={handleAddWorkout}
      >
        <select
          className={`rounded ${workoutType === '' ? 'text-gray-400' : 'text-black'}`}
          value={workoutType}
          onChange={(e) => setWorkoutType(e.target.value as WorkoutType)}
        >
          <option value="" disabled>
            Choose workout type
          </option>
          <option value="strength">strength</option>
          <option value="cardio">cardio</option>
          <option value="rest">rest</option>
        </select>
        <input
          type="number"
          placeholder="Set minutes"
          value={duration ? duration : ''}
          className="rounded w-auto text-center"
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <button
          className="rounded bg-blue-400 hover:bg-blue-500 py-1 px-3 text-white"
          type="submit"
        >
          Save
        </button>
        <button
          type="button"
          className=" rounded bg-red-400 hover:bg-red-500 py-1 px-3 text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
