import { useHealth } from '../hooks/useHealth';
import { formatDate, getToday } from '../utils/dateUtils';

export function DailyLogPanel() {
  const { state } = useHealth();
  const today = getToday();

  return (
    <div>
      <h1 className="border-b border-gray-400 m-3 font-bold text-lg">Daily Logs</h1>
      {Object.entries(state.logs).map(([date, log]) => {
        return (
          <div
            key={date}
            className={`flex gap-2 justify-between mx-3 p-3 border-b border-gray-400 ${today === date ? 'bg-gray-100' : ''}`}
          >
            <p className="font-bold">{formatDate(date)}</p>
            <p className="text-gray-400">
              Sleep Hours: <span className="text-black">{log.sleepHours}</span>
            </p>
            <p className="text-gray-400">
              Water Intake: <span className="text-black">{log.waterIntake}</span>
            </p>
            <p className="text-gray-400">
              Energy Level: <span className="text-black">{log.energyLevel}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
