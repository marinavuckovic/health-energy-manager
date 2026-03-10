import { useHealth } from '../hooks/useHealth';
import type { Workout } from '../types/health';
import { formatDate } from '../utils/dateUtils';

export function WorkoutPanel() {
  const { state, dispatch } = useHealth();
  const workouts: Workout[] = [...state.workouts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this workout?')) return;
    dispatch({
      type: 'DELETE_WORKOUT',
      payload: id,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="border-b border-gray-400 m-2 font-bold text-lg">Recent Workouts</h1>
      {workouts.map((workout) => {
        return (
          <div
            key={workout.id}
            className="flex flex-col gap-2 justify-evenly mx-3 border-b border-gray-400"
          >
            <div className="flex justify-between">
              <p className="font-bold">
                {workout.type === 'cardio'
                  ? '🏃 Cardio session'
                  : workout.type === 'rest'
                    ? '🛌 Rest Day'
                    : '💪 Strength Training'}
              </p>
              <div className="flex gap-2">
                <p className="text-right pr-3">{formatDate(workout.date)}</p>
                <button
                  className="text-right hover:bg-red-300 rounded p-1"
                  onClick={() => handleDelete(workout.id)}
                >
                  ❌
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-400 pl-5 pb-2">{workout.duration} minutes</p>
          </div>
        );
      })}
    </div>
  );
}
