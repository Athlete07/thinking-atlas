import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import GameProgress from '@/components/GameProgress';
import GameTimer from '@/components/GameTimer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Target, Brain, CheckCircle, AlertCircle, Play, RotateCcw } from 'lucide-react';
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

export default function BaseGameEnhanced({
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
  const [isPaused, setIsPaused] = useState(false);

  const currentQuestions = phase === 'practice' ? practiceQuestions : questions;
  const isLastQuestion = currentQuestion >= currentQuestions.length - 1;
  const isPractice = phase === 'practice';

  // Timer effect
  useEffect(() => {
    if (phase === 'test' && timeRemaining > 0 && !isPaused) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase, timeRemaining, isPaused]);

  // Track question start time
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestion]);

  const handleAnswer = () => {
    if (!selectedAnswer) return;

    const responseTime = (Date.now() - questionStartTime) / 1000;
    const isCorrect = selectedAnswer === currentQuestions[currentQuestion].correctAnswer;
    
    setAnswers(prev => [...prev, isCorrect]);
    setResponseTimes(prev => [...prev, responseTime]);
    setScore(prev => prev + (isCorrect ? 1 : 0));
    setShowFeedback(true);
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      if (isPractice) {
        setPhase('test');
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setScore(0);
        setAnswers([]);
        setResponseTimes([]);
      } else {
        handleComplete();
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleComplete = () => {
    if (phase === 'test') {
      const result: GameResult = {
        gameId,
        score: Math.max(0, score),
        maxScore: questions.length,
        accuracy: (answers.filter(a => a).length / questions.length) * 100,
        responseTimes,
        answers,
        completedAt: new Date(),
        timeSpent: timeLimit - timeRemaining,
      };

      addGameResult(result);
      
      // Update current game to next game
      const nextGame = getNextGame(gameId);
      if (nextGame) {
        setCurrentGame(state.currentGame + 1);
        navigate(`/game/${nextGame.id}`);
      } else {
        // Last game completed, go to results
        navigate('/results');
      }
      
      onComplete(result);
    }
  };

  const getGameIcon = (gameId: string) => {
    const icons: Record<string, string> = {
      decoder: '🧩',
      verbal: '📝',
      quantitative: '🔢',
      spatial: '🎯',
      attention: '🎪'
    };
    return icons[gameId] || '🧠';
  };

  const getGameColor = (gameId: string) => {
    const colors: Record<string, string> = {
      decoder: 'from-blue-500 to-purple-600',
      verbal: 'from-green-500 to-teal-600',
      quantitative: 'from-orange-500 to-red-600',
      spatial: 'from-pink-500 to-rose-600',
      attention: 'from-yellow-500 to-orange-600'
    };
    return colors[gameId] || 'from-primary to-accent';
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <Card className="p-8 bg-gradient-card shadow-2xl border-0 animate-fade-in">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getGameColor(gameId)} mb-6 shadow-xl`}>
                <span className="text-4xl">{getGameIcon(gameId)}</span>
              </div>
              <h1 className="text-5xl font-bold mb-4 gradient-text">{gameName}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{gameDescription}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div className="space-y-6">
                <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Time & Format
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span className="font-bold text-foreground">{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Limit:</span>
                      <span className="font-bold text-foreground">{Math.floor(timeLimit / 60)} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-bold text-foreground">Multiple Choice</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Navigation:</span>
                      <span className="font-bold text-foreground">Forward Only</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-accent/10 rounded-lg border border-accent/20">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-accent" />
                    How to Succeed
                  </h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Read each question carefully and completely</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Trust your first instinct - don't overthink</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Work at your natural, comfortable pace</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>Stay calm and focused throughout</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-success/10 rounded-lg border border-success/20">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Brain className="w-6 h-6 text-success" />
                    What We Measure
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This assessment evaluates your cognitive abilities in this specific domain. 
                    Your performance helps us understand your thinking patterns and strengths.
                  </p>
                </div>

                <div className="p-6 bg-warning/10 rounded-lg border border-warning/20">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-warning" />
                    Important Notes
                  </h2>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• You cannot go back to previous questions</li>
                    <li>• Answer each question only once</li>
                    <li>• The timer starts when you begin the test</li>
                    <li>• Practice questions help you understand the format</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setPhase('practice')} 
                size="lg"
                className="bg-gradient-primary hover:opacity-90 px-8 py-4 text-lg shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Start Practice Round
                </div>
              </Button>
              <Button 
                onClick={() => setPhase('test')} 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
              >
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Skip to Main Test
                </div>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <Card className="p-8 bg-gradient-card shadow-2xl border-0 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Game Complete!</h1>
              <p className="text-muted-foreground mb-6">
                Great job! You've completed {gameName} with a score of {score} out of {questions.length}.
              </p>
              <Button onClick={() => navigate('/results')} size="lg" className="bg-gradient-primary hover:opacity-90">
                View Results
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGameColor(gameId)} flex items-center justify-center shadow-lg`}>
                <span className="text-xl">{getGameIcon(gameId)}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{gameName}</h1>
                <p className="text-muted-foreground">{gameDescription}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {phase === 'test' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-2"
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
              )}
            </div>
          </div>

          {/* Progress and Timer */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Progress</span>
                <span className="text-muted-foreground">
                  {currentQuestion + 1} of {currentQuestions.length}
                </span>
              </div>
              <Progress 
                value={((currentQuestion + 1) / currentQuestions.length) * 100} 
                className="h-3"
              />
            </div>
            
            {phase === 'test' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Time Remaining</span>
                  <span className={`font-bold ${timeRemaining < 60 ? 'text-destructive' : 'text-foreground'}`}>
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all ${
                      timeRemaining < 60 ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ width: `${(timeRemaining / timeLimit) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Question Content */}
        <Card className="p-8 bg-gradient-card shadow-2xl border-0 animate-slide-up">
          {children({
            question: currentQuestions[currentQuestion],
            selectedAnswer,
            setSelectedAnswer,
            showFeedback,
            handleAnswer,
            handleContinue,
            isPractice,
          })}
        </Card>

        {/* Practice Indicator */}
        {isPractice && (
          <div className="mt-6 text-center">
            <Badge variant="secondary" className="px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              Practice Round - This won't count toward your score
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
