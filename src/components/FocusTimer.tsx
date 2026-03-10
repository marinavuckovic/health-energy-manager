import { useEffect, useRef, useState } from 'react';
const TOTAL_TIME: number = 3 * 60;
export function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStart = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(
      () =>
        setTimeLeft((prev) => {
          if (prev <= 1 && intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
            return TOTAL_TIME;
          }
          return prev - 1;
        }),
      1000,
    );
    setIsRunning(true);
  };
  const handlePause = () => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };
  const handleRestart = () => {
    handlePause();
    setTimeLeft(TOTAL_TIME);
  };
  const elapsed = TOTAL_TIME - timeLeft;
  const phase = elapsed % 8 < 4 ? 'Inhale...' : 'Exhale...';

  return (
    <div className="bg-amber-50 mx-10 px-6 py-5 rounded-xl shadow-lg">
      <h1 className="text-lg font-bold border-b border-gray-300 pb-2 mb-6">Focus Session</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-amber-100 p-5">
          <h2 className="text-md font-semibold">Focus Timer</h2>

          <div className="text-4xl font-bold tracking-wider">
            {Math.floor(timeLeft / 60)}:
            {Math.floor(timeLeft % 60)
              .toString()
              .padStart(2, '0')}
          </div>

          <button
            className={`bg-green-700 text-white px-5 py-2 rounded-lg shadow hover:bg-green-800 transition ${isRunning ? 'hidden' : ''}`}
            onClick={handleStart}
          >
            Start
          </button>
          <div className={`grid grid-cols-2 gap-2 ${isRunning ? '' : 'hidden'}`}>
            <button
              className="bg-gray-400 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-500 transition"
              onClick={handlePause}
            >
              Pause
            </button>
            <button
              className="bg-red-400 text-white px-5 py-2 rounded-lg shadow hover:bg-red-500 transition"
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        </div>

        <div className="flex justify-center  p-5">
          <div
            className={`w-40 h-40 rounded-full bg-green-200 flex items-center justify-center text-xl font-semibold shadow-inner transition-transform duration-[4000ms] ease-in-out ${phase === 'Inhale...' ? 'scale-125' : 'scale-100'}`}
          >
            {phase}
          </div>
        </div>
      </div>
    </div>
  );
}
