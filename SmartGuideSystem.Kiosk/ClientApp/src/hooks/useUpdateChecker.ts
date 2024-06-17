import { useEffect, useState } from "react";

export function useUpdateCheckerFireEvent(
  interval: number,
  callback: () => void
) {
  useEffect(() => {
    const handleTimeout = () => {
      callback();
      clearTimeout(tm);
      tm = setTimeout(handleTimeout, interval);
    };

    let tm = setTimeout(handleTimeout, interval);
    return () => {
      clearTimeout(tm);
    };
  }, [interval]);
}
