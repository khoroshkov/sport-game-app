export default function getGameIndex(arr, index) {
  if (!arr) return;
  const currentIndex = arr?.findIndex((i) => i.event_id === index);
  return currentIndex;
}
