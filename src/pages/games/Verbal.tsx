import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseGame from '@/components/games/BaseGameEnhanced';
import { VERBAL_QUESTIONS, VERBAL_PRACTICE_QUESTIONS } from '@/data/questions/verbalQuestions';
import { GameResult } from '@/types/assessment';
import { useAssessment } from '@/context/AssessmentContext';
import { getNextGame, isLastGame } from '@/data/gameConfig';

const Verbal = () => {
  const navigate = useNavigate();
  const { setCurrentGame } = useAssessment();

  const handleComplete = (result: GameResult) => {
    // BaseGame handles navigation automatically
    console.log('Verbal game completed:', result);
  };

  return (
    <BaseGame
      gameId="verbal"
      gameName="Word Weaver"
      gameDescription="Verbal Reasoning Challenge"
      timeLimit={300}
      questions={VERBAL_QUESTIONS}
      practiceQuestions={VERBAL_PRACTICE_QUESTIONS}
      onComplete={handleComplete}
    >
      {({ question, selectedAnswer, setSelectedAnswer, showFeedback, handleAnswer, handleContinue, isPractice }) => (
        <>
          {/* Question Display */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="mb-6">
            <div className="grid gap-3 max-w-2xl mx-auto">
              {question.options?.map((option, index) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`p-4 text-left border-2 rounded-lg transition-all hover:scale-[1.02] ${
                    selectedAnswer === option
                      ? "border-primary bg-primary/10 shadow-medium"
                      : "border-border bg-card hover:bg-muted/50"
                  }`}
                >
                  <span className="font-semibold text-primary mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="text-foreground">{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback for practice */}
          {showFeedback && isPractice && (
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
          {isPractice && !showFeedback && (
            <button
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity disabled:opacity-50"
              onClick={handleAnswer}
              disabled={!selectedAnswer}
            >
              Check Answer
            </button>
          )}

          {isPractice && showFeedback && (
            <button
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity"
              onClick={handleContinue}
            >
              Continue
            </button>
          )}

          {!isPractice && (
            <button
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity disabled:opacity-50"
              onClick={handleAnswer}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </button>
          )}
        </>
      )}
    </BaseGame>
  );
};

export default Verbal;
