export function getToday() {
  return new Date().toISOString().split('T')[0];
}
export function getThisMonday() {
  const today = new Date();
  const diff = today.getDay() === 0 ? 6 : today.getDay() - 1;
  today.setDate(today.getDate() - diff);
  today.setHours(0, 0, 0, 0);
  return today;
}
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
