import useRoomStore from "@/store/room";
import { useEffect, useState } from "react";
import clsx from "clsx";

// Format seconds to minutes:seconds
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default function Clock() {
  const { roomTimerEnd } = useRoomStore();

  const [time, setTime] = useState(Math.floor((roomTimerEnd - Date.now()) / 1000));

  useEffect(() => {
    const update = () => setTime(Math.floor((roomTimerEnd - Date.now()) / 1000));

    const interval = setInterval(update, 1000);
    update();

    return () => clearInterval(interval);
  }, [roomTimerEnd]);

  if (time < 0) return null;

  return (
    <div
      className={clsx(
        "p-4 py-2",
        time > 10 ? "bg-primary text-white" : time % 2 === 0 ? "bg-secondary text-black" : "bg-primary text-white",
      )}
    >
      <p className="font-title text-small-display">{formatTime(time)}</p>
    </div>
  );
}
