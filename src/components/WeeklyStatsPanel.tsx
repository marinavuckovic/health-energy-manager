import { useHealth } from '../hooks/useHealth';
import { getThisMonday } from '../utils/dateUtils';

export function WeeklyStatsPanel() {
  const { state } = useHealth();
  const monday = getThisMonday();
  const workoutsThisWeek = state.workouts.reduce((acc, w) => {
    return new Date(w.date) >= monday ? (acc += 1) : acc;
  }, 0);
  const { sleepHours, recordedDays, waterIntake, energyLevel } = Object.values(state.logs).reduce(
    (acc, log) => {
      if (new Date(log.date) >= monday) {
        acc.sleepHours += log.sleepHours;
        acc.waterIntake += log.waterIntake;
        acc.energyLevel += log.energyLevel;
        acc.recordedDays += 1;
      }
      return acc;
    },
    { sleepHours: 0, recordedDays: 0, waterIntake: 0, energyLevel: 0 },
  );

  const avgSleepHours: string =
    recordedDays > 0 ? (sleepHours / recordedDays).toFixed(1) : 'No data yet';
  const avgWaterIntake: string =
    recordedDays > 0 ? Math.ceil(waterIntake / recordedDays).toString() : 'No data yet';
  const avgEnergyLevel: string =
    recordedDays > 0 ? (energyLevel / recordedDays).toFixed(1) : 'No data yet';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-10">
      <div className=" bg-amber-50 rounded-xl shadow-lg p-10">
        <h1 className="font-bold text-lg  border-b">🏋️ Workouts</h1>
        <p className="pt-3 text-gray-400 ml-5">
          <span className="text-lg text-black font-bold">{workoutsThisWeek}</span> This Week
        </p>
      </div>
      <div className=" bg-amber-50 rounded-xl shadow-lg p-10">
        <h1 className="font-bold text-lg border-b">🌙 Sleep</h1>
        <p className="pt-3 text-gray-400 ml-5">
          <span className="text-lg text-black font-bold">{avgSleepHours}</span> hrs Avg.
        </p>
      </div>
      <div className=" bg-amber-50 rounded-xl shadow-lg p-10">
        <h1 className="font-bold text-lg border-b">💧 Water Intake</h1>
        <p className="pt-3 text-gray-400 text-lg ml-5">
          <span className="font-bold text-black">{avgWaterIntake}</span> / 8
        </p>
      </div>
      <div className=" bg-amber-50 rounded-xl shadow-lg p-10">
        <h1 className="font-bold text-lg border-b">⚡ Energy level</h1>
        <p className="pt-3 font-bold text-lg ml-5">{avgEnergyLevel}</p>
      </div>
    </div>
  );
}
