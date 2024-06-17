import { useEffect, useState } from "react";

export default function useIdleChecker(interval: number) {
  const [isIdle, setIsIdle] = useState(false);

  const now = new Date();
  const [startTime, setStartTime] = useState<number>(now.getTime());

  const handleMouse = (ev: MouseEvent) => {
    setIsIdle(false);
    console.log("useIdleChecker , handleMouse");
    setStartTime(new Date().getTime());
  };
  const handleTouch = (ev: TouchEvent) => {
    setIsIdle(false);
    console.log("useIdleChecker , handleTouch");
    setStartTime(new Date().getTime());
  };
  const handleKeyboard = (ev: KeyboardEvent) => {
    setIsIdle(false);
    console.log("useIdleChecker , handleKeyboard");
    setStartTime(new Date().getTime());
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseup", handleMouse);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseup", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [interval]);

  useEffect(() => {
    const resetTime = new Date().getTime();

    console.log(
      "useEffect",
      startTime,
      ":",
      resetTime,
      " [interval]",
      interval
    );

    const intervalCount = setInterval(() => {
      console.log("interval", new Date().getTime());
    }, 1000);

    const counter = setTimeout(() => {
      setIsIdle(true);
      console.log("setTimeout", new Date().getTime());
    }, interval);

    return () => {
      clearInterval(intervalCount);
      clearTimeout(counter);
    };
  }, [startTime, interval]);

  return { isIdle };
}

export function useIdleCheckerFireEvent(
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

    const handleMouse = (ev: MouseEvent) => {
      clearTimeout(tm);
      tm = setTimeout(handleTimeout, interval);
    };
    const handleTouch = (ev: TouchEvent) => {
      clearTimeout(tm);
      tm = setTimeout(handleTimeout, interval);
    };
    const handleTouchDown = (ev: TouchEvent) => {
      clearTimeout(tm);
      tm = setTimeout(handleTimeout, interval);
    };
    const handleKeyboard = (ev: KeyboardEvent) => {
      clearTimeout(tm);
      tm = setTimeout(handleTimeout, interval);
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseup", handleMouse);
    window.addEventListener("touchstart", handleTouchDown);
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseup", handleMouse);
      window.removeEventListener("touchstart", handleTouchDown);
      window.removeEventListener("keydown", handleKeyboard);
      clearTimeout(tm);
    };
  }, [interval]);
}
