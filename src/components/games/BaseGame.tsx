import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import GameProgress from '@/components/GameProgress';
import GameTimer from '@/components/GameTimer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Question, GameResult } from '@/types/assessment';
import { useAssessment } from '@/context/AssessmentContext';
import { getNextGame, isLastGame } from '@/data/gameConfig';

interface BaseGameProps {
  gameId: string;
  gameName: string;
  gameDescription: string;
  timeLimit: number;
  questions: Question[];
  practiceQuestions: Question[];
  onComplete: (result: GameResult) => void;
  children: (props: {
    question: Question;
    selectedAnswer: string | null;
    setSelectedAnswer: (answer: string | null) => void;
    showFeedback: boolean;
    handleAnswer: () => void;
    handleContinue: () => void;
    isPractice: boolean;
  }) => React.ReactNode;
}

export default function BaseGame({
  gameId,
  gameName,
  gameDescription,
  timeLimit,
  questions,
  practiceQuestions,
  onComplete,
  children,
}: BaseGameProps) {
  const navigate = useNavigate();
  const { state, addGameResult, setCurrentGame } = useAssessment();
  
  const [phase, setPhase] = useState<'intro' | 'practice' | 'test' | 'complete'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [responseTimes, setResponseTimes] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const currentQuestions = phase === 'practice' ? practiceQuestions : questions;
  const question = currentQuestions[currentQuestion];

  // Timer effect
  useEffect(() => {
    if (phase === 'test') {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            setPhase('complete');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase]);

  // Reset question start time when question changes
  useEffect(() => {
    if (phase === 'test' || phase === 'practice') {
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestion, phase]);

  const handleAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    const responseTime = (Date.now() - questionStartTime) / 1000; // in seconds
    
    if (phase === 'practice') {
      setShowFeedback(true);
    } else {
      // Calculate score for this question
      let questionScore = 0;
      if (isCorrect) {
        questionScore = 10;
        // Speed bonus: +5 if answered correctly in under 15 seconds
        if (responseTime < 15) {
          questionScore += 5;
        }
      } else {
        // Penalty for incorrect: -2
        questionScore = -2;
      }
      
      setAnswers([...answers, isCorrect]);
      setResponseTimes([...responseTimes, responseTime]);
      setScore(score + questionScore);
      
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        }, 800);
      } else {
        setTimeout(() => {
          setPhase('complete');
        }, 800);
      }
    }
  };

  const handleContinue = () => {
    if (phase === 'practice') {
      if (currentQuestion < practiceQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setPhase('test');
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    } else if (phase === 'complete') {
      // Create game result
      const result: GameResult = {
        gameId,
        gameName,
        score: Math.max(0, score),
        maxScore: questions.length * 15, // 10 base + 5 bonus per question
        accuracy: (answers.filter(a => a).length / questions.length) * 100,
        responseTimes,
        answers,
        completedAt: new Date(),
        timeSpent: timeLimit - timeRemaining,
      };

      // Add to assessment context
      addGameResult(result);
      
      // Check if this is the last game
      if (isLastGame(gameId)) {
        // Navigate to results page
        navigate('/results');
      } else {
        // Get next game and navigate to it
        const nextGame = getNextGame(gameId);
        if (nextGame) {
          setCurrentGame(state.currentGame + 1);
          navigate(`/game/${nextGame.id}`);
        }
      }
      
      // Call parent completion handler
      onComplete(result);
    }
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Card className="p-8 bg-gradient-card shadow-medium animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full" />
              </div>
              <h1 className="text-3xl font-bold mb-2">{gameName}</h1>
              <p className="text-muted-foreground">{gameDescription}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-3">What You'll Do</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Complete {questions.length} questions in {Math.floor(timeLimit / 60)} minutes. 
                  Answer as accurately as you can, but don't overthink it!
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">Instructions</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Read each question carefully
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    Select your answer from the options provided
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    You have {Math.floor(timeLimit / 60)} minutes total
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
              onClick={() => setPhase('practice')}
            >
              Start Practice
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    const nextGame = getNextGame(gameId);
    const isLast = isLastGame(gameId);

    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Card className="p-8 bg-gradient-card shadow-medium text-center animate-scale-in">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
                <div className="w-10 h-10 bg-success rounded-full" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Game Completed: {gameName}</h1>
              <p className="text-muted-foreground">
                Great work! You've completed the {gameDescription}.
              </p>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg mb-6">
              <p className="text-lg mb-2">You tackled some challenging questions—nice focus!</p>
              <div className="text-3xl font-bold text-primary mb-4">{score} points</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Correct Answers</p>
                  <p className="text-lg font-semibold">{answers.filter(a => a).length} / {questions.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Accuracy</p>
                  <p className="text-lg font-semibold">{Math.round((answers.filter(a => a).length / questions.length) * 100)}%</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full bg-muted rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-primary h-3 rounded-full" 
                  style={{ width: `${(state.currentGame / 5) * 100}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{state.currentGame} of 5 games complete</p>
            </div>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90"
                onClick={handleContinue}
              >
                {isLast ? 'View Results' : `Continue to ${nextGame?.name}`}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {!isLast && (
                <p className="text-sm text-muted-foreground">
                  Or take a 60-second break before continuing
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GameProgress
        currentGame={state.currentGame}
        totalGames={5}
        currentQuestion={currentQuestion + 1}
        totalQuestions={phase === 'practice' ? practiceQuestions.length : questions.length}
        gameName={gameName}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-end mb-4">
          {phase === 'test' && <GameTimer timeRemaining={timeRemaining} totalTime={timeLimit} />}
        </div>

        <Card className="p-8 bg-gradient-card shadow-medium">
          {children({
            question,
            selectedAnswer,
            setSelectedAnswer,
            showFeedback,
            handleAnswer,
            handleContinue,
            isPractice: phase === 'practice',
          })}
        </Card>
      </div>
    </div>
  );
}
