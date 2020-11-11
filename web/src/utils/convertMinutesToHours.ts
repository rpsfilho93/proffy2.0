export default function convertMinutesToHours(time: number) {
  const hour = time / 60 < 10 ? '0' + String(time / 60) : String(time / 60);
  const minutes = time % 60 < 10 ? '0' + String(time % 60) : String(time % 60);

  return hour + ':' + minutes;
}
