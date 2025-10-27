import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GameProgress from "@/components/GameProgress";
import GameTimer from "@/components/GameTimer";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Circle, Triangle, Square, Hexagon, Star, Diamond } from "lucide-react";

// Sample pattern recognition questions
const questions = [
  {
    id: 1,
    grid: [
      [{ shape: "circle", color: "primary" }, { shape: "triangle", color: "accent" }, { shape: "square", color: "success" }],
      [{ shape: "triangle", color: "accent" }, { shape: "square", color: "success" }, { shape: "circle", color: "primary" }],
      [{ shape: "square", color: "success" }, { shape: "circle", color: "primary" }, null]
    ],
    options: ["triangle", "square", "circle", "hexagon", "star", "diamond"],
    correctAnswer: "triangle",
    explanation: "Each row contains circle, triangle, and square. Each column also contains each shape once."
  },
  {
    id: 2,
    grid: [
      [{ shape: "circle", color: "primary" }, { shape: "circle", color: "accent" }, { shape: "circle", color: "success" }],
      [{ shape: "square", color: "primary" }, { shape: "square", color: "accent" }, { shape: "square", color: "success" }],
      [{ shape: "triangle", color: "primary" }, { shape: "triangle", color: "accent" }, null]
    ],
    options: ["circle", "square", "triangle", "hexagon", "star", "diamond"],
    correctAnswer: "triangle",
    explanation: "Pattern follows shapes in rows with colors progressing across columns."
  },
];

const practiceQuestions = [
  {
    id: "p1",
    grid: [
      [{ shape: "circle", color: "primary" }, { shape: "square", color: "primary" }, { shape: "triangle", color: "primary" }],
      [{ shape: "circle", color: "accent" }, { shape: "square", color: "accent" }, { shape: "triangle", color: "accent" }],
      [{ shape: "circle", color: "success" }, { shape: "square", color: "success" }, null]
    ],
    options: ["triangle", "circle", "square", "hexagon"],
    correctAnswer: "triangle",
    explanation: "Each column has the same shape, and each row has the same color. The pattern continues with a green triangle."
  }
];

const ShapeIcon = ({ shape, color }: { shape: string; color: string }) => {
  const colorMap: Record<string, string> = {
    primary: "text-primary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning",
  };

  const shapeMap: Record<string, any> = {
    circle: Circle,
    triangle: Triangle,
    square: Square,
    hexagon: Hexagon,
    star: Star,
    diamond: Diamond,
  };

  const Icon = shapeMap[shape] || Circle;
  return <Icon className={`w-12 h-12 ${colorMap[color] || "text-foreground"}`} fill="currentColor" />;
};

const Decoder = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"intro" | "practice" | "test" | "complete">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(240); // 4 minutes for test
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const currentQuestions = phase === "practice" ? practiceQuestions : questions;
  const question = currentQuestions[currentQuestion];

  useEffect(() => {
    if (phase === "test") {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase]);

  const handleAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (phase === "practice") {
      setShowFeedback(true);
    } else {
      setAnswers([...answers, isCorrect]);
      if (isCorrect) {
        setScore(score + 10);
      }
      
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        }, 1000);
      } else {
        setPhase("complete");
      }
    }
  };

  const handlePracticeContinue = () => {
    if (currentQuestion < practiceQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setPhase("test");
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Circle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Game 1 of 5: The Decoder</h1>
              <p className="text-muted-foreground">Logical Reasoning Challenge</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">What You'll Do</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You'll see grids of abstract symbols that follow hidden patterns. Your job is to figure out the pattern and identify the missing symbol. Some patterns are simple, some are tricky!
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">Instructions</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Look carefully at how the symbols change
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Select the symbol that completes the pattern
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    You have 24 seconds per question (but don't rush!)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    You'll see your progress as you go
                  </li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Practice Round</p>
                <p className="text-sm text-muted-foreground">
                  First, let's try a practice question so you understand how it works.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-8 bg-gradient-primary hover:opacity-90"
              onClick={() => setPhase("practice")}
            >
              Start Practice
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (phase === "complete") {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Card className="p-8 bg-gradient-card shadow-medium text-center animate-scale-in">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
                <Circle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Game Completed: The Decoder</h1>
              <p className="text-muted-foreground">
                Great work! You've completed the Logical Reasoning challenge.
              </p>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <p className="text-lg mb-2">You tackled some tricky patterns—nice focus!</p>
              <div className="text-3xl font-bold text-primary">{score} points</div>
            </div>

            <div className="mb-6">
              <div className="w-full bg-muted rounded-full h-3 mb-2">
                <div className="bg-gradient-primary h-3 rounded-full" style={{ width: "20%" }}></div>
              </div>
              <p className="text-sm text-muted-foreground">1 of 5 games complete</p>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90"
                onClick={() => navigate("/results")}
              >
                Continue to Results
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Or take a 60-second break before continuing
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GameProgress
        currentGame={1}
        totalGames={5}
        currentQuestion={currentQuestion + 1}
        totalQuestions={phase === "practice" ? practiceQuestions.length : questions.length}
        gameName="The Decoder"
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-end mb-4">
          {phase === "test" && <GameTimer timeRemaining={timeRemaining} totalTime={240} />}
        </div>

        <Card className="p-8 bg-gradient-card shadow-medium">
          {/* Grid Display */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {question.grid.map((row, i) => (
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="aspect-square border-2 border-border rounded-lg flex items-center justify-center bg-card hover:bg-muted/50 transition-colors"
                  >
                    {cell ? (
                      <ShapeIcon shape={cell.shape} color={cell.color} />
                    ) : (
                      <span className="text-4xl text-muted-foreground">?</span>
                    )}
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="mb-6">
            <p className="text-center text-sm font-semibold text-muted-foreground mb-4">
              Select the missing symbol:
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-2xl mx-auto">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`aspect-square border-2 rounded-lg flex items-center justify-center transition-all hover:scale-105 ${
                    selectedAnswer === option
                      ? "border-primary bg-primary/10 shadow-medium"
                      : "border-border bg-card hover:bg-muted/50"
                  }`}
                >
                  <ShapeIcon shape={option} color="primary" />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback for practice */}
          {showFeedback && phase === "practice" && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === question.correctAnswer ? "bg-success/10" : "bg-destructive/10"
            }`}>
              <p className="font-semibold mb-2">
                {selectedAnswer === question.correctAnswer ? "Correct! ✓" : "Not quite"}
              </p>
              <p className="text-sm">{question.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          {phase === "practice" && !showFeedback && (
            <Button
              size="lg"
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handleAnswer}
              disabled={!selectedAnswer}
            >
              Check Answer
            </Button>
          )}

          {phase === "practice" && showFeedback && (
            <Button
              size="lg"
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handlePracticeContinue}
            >
              {currentQuestion < practiceQuestions.length - 1 ? "Next Practice Question" : "Start Test"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}

          {phase === "test" && (
            <Button
              size="lg"
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handleAnswer}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Decoder;
