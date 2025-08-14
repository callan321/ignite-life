import { useEffect, useRef } from "react";

export function useAutoAdvance(
  length: number,
  timeout: number,
  onAdvance: () => void,
) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      onAdvance();
    }, timeout);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [length, timeout, onAdvance]);
}
