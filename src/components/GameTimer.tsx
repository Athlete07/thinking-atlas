import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface GameTimerProps {
  timeRemaining: number;
  totalTime: number;
  onTimeUp?: () => void;
}

const GameTimer = ({ timeRemaining, totalTime, onTimeUp }: GameTimerProps) => {
  const [displayTime, setDisplayTime] = useState(timeRemaining);

  useEffect(() => {
    setDisplayTime(timeRemaining);
    if (timeRemaining <= 0 && onTimeUp) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  const minutes = Math.floor(displayTime / 60);
  const seconds = displayTime % 60;
  const percentage = (displayTime / totalTime) * 100;

  let colorClass = "text-success";
  if (percentage < 25) {
    colorClass = "text-destructive";
  } else if (percentage < 50) {
    colorClass = "text-warning";
  }

  return (
    <div className={`flex items-center gap-2 font-mono font-bold text-lg ${colorClass}`}>
      <Clock className="w-5 h-5" />
      <span>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default GameTimer;
