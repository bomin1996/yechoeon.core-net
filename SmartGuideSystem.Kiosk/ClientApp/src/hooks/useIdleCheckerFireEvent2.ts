import { useEffect, useState } from "react";

export function useIdleCheckerFireEvent2(
  interval: number,
  callback: () => void
) {
  // const [eventCount1, setEventCount1] = useState(0);
  // const [eventCount2, setEventCount2] = useState(0);

  useEffect(() => {
    const handleTimeout = () => {
      // setEventCount1(0);
      // setEventCount2(0);
      callback();
      clearTimeout(tm);
      tm = setTimeout(handleTimeout, interval);
    };

    let tm = setTimeout(handleTimeout, interval);

    const handleMouse = (ev: MouseEvent) => {
      clearTimeout(tm);
      // setEventCount1((prev) => (prev + 1) % 1000);
      tm = setTimeout(handleTimeout, interval);
    };
    const handleTouchDown = (ev: TouchEvent) => {
      clearTimeout(tm);
      // setEventCount2((prev) => (prev + 1) % 1000);
      tm = setTimeout(handleTimeout, interval);
    };
    // const handleKeyboard = (ev: KeyboardEvent) => {
    //   clearTimeout(tm);
    //   setEventCount2((prev) => (prev + 1) % 1000);
    //   tm = setTimeout(handleTimeout, interval);
    // };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseup", handleMouse);
    window.addEventListener("touchstart", handleTouchDown);
    window.addEventListener("touchmove", handleTouchDown);
    window.addEventListener("touchcancel", handleTouchDown);

    // window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseup", handleMouse);
      window.removeEventListener("touchstart", handleTouchDown);
      window.removeEventListener("touchend", handleTouchDown);
      window.removeEventListener("touchcancel", handleTouchDown);

      // window.removeEventListener("keydown", handleKeyboard);
      clearTimeout(tm);
    };
  }, [interval]);

  // return { eventCount1, eventCount2 };
}
