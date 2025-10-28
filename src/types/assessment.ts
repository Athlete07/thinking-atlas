// Assessment types and interfaces
export interface GameResult {
  gameId: string;
  gameName: string;
  score: number;
  maxScore: number;
  accuracy: number;
  responseTimes: number[];
  answers: boolean[];
  completedAt: Date;
  timeSpent: number; // in seconds
}

export interface CognitiveProfile {
  logical: number;      // 0-100
  verbal: number;       // 0-100
  quantitative: number; // 0-100
  spatial: number;      // 0-100
  attention: number;    // 0-100
}

export interface UserArchetype {
  name: string;
  description: string;
  primaryStrength: string;
  secondaryStrength: string;
  careerMatches: CareerMatch[];
  developmentAreas: string[];
  personalityTraits: string[];
}

export interface CareerMatch {
  title: string;
  matchPercentage: number;
  salary: string;
  description: string;
  requiredSkills: string[];
  growthOutlook: 'High' | 'Medium' | 'Low';
}

export interface AssessmentSession {
  id: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  currentGame: number;
  completedGames: string[];
  gameResults: GameResult[];
  cognitiveProfile?: CognitiveProfile;
  archetype?: UserArchetype;
  isComplete: boolean;
}

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  timeLimit: number; // in seconds
  questionCount: number;
  category: 'logical' | 'verbal' | 'quantitative' | 'spatial' | 'attention';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'pattern-recognition' | 'word-association' | 'math-problem' | 'spatial-rotation' | 'attention-task';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // per question
  metadata?: Record<string, any>;
}
