import { AddWorkoutForm } from './components/AddWorkoutForm';
import { DailyLogForm } from './components/DailyLogForm';
import { DailyLogPanel } from './components/DailyLogPanel';
import { FocusTimer } from './components/FocusTimer';
import { WeeklyStatsPanel } from './components/WeeklyStatsPanel';
import { WorkoutPanel } from './components/WorkoutPanel';
import { HealthProvider } from './context/HealthContext';

function App() {
  return (
    <HealthProvider>
      <div className="w-full h-full flex flex-col gap-3 py-5 bg-amber-100">
        <h1 className="text-center text-3xl text-green-800">Health & Energy Manager</h1>
        <h1 className="text-center text-md text-gray-400">Track your daily wellness.</h1>
        <WeeklyStatsPanel />
        <FocusTimer />
        <div className="flex flex-col justify-between md:flex-row mx-5">
          <div className="flex flex-col justify-between w-[90%] md:w-1/2  m-4 rounded-lg bg-amber-50 p-4 shadow-lg">
            <WorkoutPanel />
            <AddWorkoutForm />
          </div>
          <div className="flex flex-col justify-between w-[90%] md:w-1/2 m-4 rounded-lg bg-amber-50 p-4 shadow-lg">
            <DailyLogPanel />
            <DailyLogForm />
          </div>
        </div>
      </div>
    </HealthProvider>
  );
}

export default App;
