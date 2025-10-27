import { Progress } from "@/components/ui/progress";

interface GameProgressProps {
  currentGame: number;
  totalGames: number;
  currentQuestion: number;
  totalQuestions: number;
  gameName: string;
}

const GameProgress = ({
  currentGame,
  totalGames,
  currentQuestion,
  totalQuestions,
  gameName,
}: GameProgressProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full bg-card border-b border-border p-4 shadow-soft">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-lg">{gameName}</h2>
            <p className="text-sm text-muted-foreground">
              Game {currentGame} of {totalGames}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              Question {currentQuestion} of {totalQuestions}
            </p>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default GameProgress;
