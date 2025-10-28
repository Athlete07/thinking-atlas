import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AssessmentSession, GameResult, CognitiveProfile, UserArchetype } from '@/types/assessment';

interface AssessmentState {
  session: AssessmentSession | null;
  currentGame: number;
  isLoading: boolean;
  error: string | null;
}

type AssessmentAction =
  | { type: 'START_SESSION' }
  | { type: 'SET_CURRENT_GAME'; payload: number }
  | { type: 'ADD_GAME_RESULT'; payload: GameResult }
  | { type: 'COMPLETE_SESSION'; payload: { cognitiveProfile: CognitiveProfile; archetype: UserArchetype } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_SESSION' };

const initialState: AssessmentState = {
  session: null,
  currentGame: 1,
  isLoading: false,
  error: null,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'START_SESSION':
      return {
        ...state,
        session: {
          id: `session_${Date.now()}`,
          startTime: new Date(),
          currentGame: 1,
          completedGames: [],
          gameResults: [],
          isComplete: false,
        },
        currentGame: 1,
        error: null,
      };

    case 'SET_CURRENT_GAME':
      return {
        ...state,
        currentGame: action.payload,
        session: state.session ? { ...state.session, currentGame: action.payload } : null,
      };

    case 'ADD_GAME_RESULT':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          completedGames: [...state.session.completedGames, action.payload.gameId],
          gameResults: [...state.session.gameResults, action.payload],
        },
      };

    case 'COMPLETE_SESSION':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          endTime: new Date(),
          cognitiveProfile: action.payload.cognitiveProfile,
          archetype: action.payload.archetype,
          isComplete: true,
        },
      };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'RESET_SESSION':
      return initialState;

    default:
      return state;
  }
}

interface AssessmentContextType {
  state: AssessmentState;
  startSession: () => void;
  setCurrentGame: (gameNumber: number) => void;
  addGameResult: (result: GameResult) => void;
  completeSession: (cognitiveProfile: CognitiveProfile, archetype: UserArchetype) => void;
  resetSession: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('thinking-atlas-session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        // Convert date strings back to Date objects
        session.startTime = new Date(session.startTime);
        if (session.endTime) session.endTime = new Date(session.endTime);
        session.gameResults.forEach((result: GameResult) => {
          result.completedAt = new Date(result.completedAt);
        });
        dispatch({ type: 'START_SESSION' });
        // Restore session state
        if (session.gameResults.length > 0) {
          session.gameResults.forEach((result: GameResult) => {
            dispatch({ type: 'ADD_GAME_RESULT', payload: result });
          });
        }
        dispatch({ type: 'SET_CURRENT_GAME', payload: session.currentGame });
      } catch (error) {
        console.error('Failed to load session from localStorage:', error);
      }
    }
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (state.session) {
      localStorage.setItem('thinking-atlas-session', JSON.stringify(state.session));
    }
  }, [state.session]);

  const startSession = () => dispatch({ type: 'START_SESSION' });
  const setCurrentGame = (gameNumber: number) => dispatch({ type: 'SET_CURRENT_GAME', payload: gameNumber });
  const addGameResult = (result: GameResult) => dispatch({ type: 'ADD_GAME_RESULT', payload: result });
  const completeSession = (cognitiveProfile: CognitiveProfile, archetype: UserArchetype) => 
    dispatch({ type: 'COMPLETE_SESSION', payload: { cognitiveProfile, archetype } });
  const resetSession = () => {
    localStorage.removeItem('thinking-atlas-session');
    dispatch({ type: 'RESET_SESSION' });
  };
  const setLoading = (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading });
  const setError = (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error });

  return (
    <AssessmentContext.Provider
      value={{
        state,
        startSession,
        setCurrentGame,
        addGameResult,
        completeSession,
        resetSession,
        setLoading,
        setError,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
