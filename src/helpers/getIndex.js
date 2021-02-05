export default function getIndex(arr) {
  const currentIndex = arr?.findIndex((i) => i.is_current_event === "true");
  return currentIndex;
}
