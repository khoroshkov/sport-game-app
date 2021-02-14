export default function getIndex(arr) {
  if (!arr) return;
  const currentIndex = arr?.findIndex((i) => i.is_current_event === "true");
  return currentIndex;
}
