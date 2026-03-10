import React, { useState } from 'react';
import { useHealth } from '../hooks/useHealth';
const energyButton = [1, 2, 3, 4, 5] as const;
export function DailyLogForm() {
  const { dispatch } = useHealth();
  const [sleepHours, setSleepHours] = useState<number | null>(null);
  const [waterIntake, setWaterIntake] = useState<number | null>(null);
  const [energyLevel, setEnergyLevel] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [adding, setAdding] = useState<boolean>(false);

  const handleCancel = () => {
    setSleepHours(null);
    setWaterIntake(null);
    setEnergyLevel(null);
    setAdding(false);
  };

  const handleDayLog = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!energyLevel || !sleepHours || !waterIntake) return;
    const dailyLog = {
      date: new Date().toISOString().split('T')[0],
      sleepHours: sleepHours,
      waterIntake: waterIntake,
      energyLevel: energyLevel,
    };
    dispatch({
      type: 'SET_DAILY_LOG',
      payload: dailyLog,
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
        + Add today's log
      </button>
      <form
        className={`${adding ? 'block' : 'hidden'} m-3 bg-gray-200 rounded shadow-lg px-4 py-4 flex flex-col gap-3 justify-evenly max-w-sm`}
        onSubmit={handleDayLog}
      >
        <input
          type="number"
          value={sleepHours ? sleepHours : ''}
          min={0}
          max={24}
          placeholder="Enter sleep hours"
          className="rounded px-3 py-1"
          onChange={(e) => setSleepHours(Number(e.target.value))}
        />
        <input
          type="number"
          value={waterIntake ? waterIntake : ''}
          placeholder="Enter water intake"
          className="rounded px-3 py-1"
          onChange={(e) => setWaterIntake(Number(e.target.value))}
        />
        <div className="flex justify-evenly">
          {energyButton.map((n) => (
            <button
              key={n}
              type="button"
              className={`rounded-full px-2 shadow-lg hover:bg-gray-400 ${energyLevel === n ? 'bg-gray-400' : ''}`}
              onClick={() => setEnergyLevel(n)}
            >
              {n}
            </button>
          ))}
        </div>
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
