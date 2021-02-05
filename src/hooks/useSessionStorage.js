import { useEffect, useState } from "react";

const PREFIX = "game-time-app-";

export default function useSessionStorage(key, initValue) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = sessionStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initValue === "function") {
      return initValue();
    } else {
      return initValue;
    }
  });

  useEffect(() => {
    sessionStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
