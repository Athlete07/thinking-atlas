import { GameConfig } from '@/types/assessment';

export const GAME_CONFIGS: GameConfig[] = [
  {
    id: 'decoder',
    name: 'The Decoder',
    description: 'Logical Reasoning Challenge',
    timeLimit: 240, // 4 minutes
    questionCount: 10,
    category: 'logical',
    difficulty: 'medium',
  },
  {
    id: 'verbal',
    name: 'Word Weaver',
    description: 'Verbal Reasoning Challenge',
    timeLimit: 300, // 5 minutes
    questionCount: 12,
    category: 'verbal',
    difficulty: 'medium',
  },
  {
    id: 'quantitative',
    name: 'Number Navigator',
    description: 'Quantitative Reasoning Challenge',
    timeLimit: 300, // 5 minutes
    questionCount: 10,
    category: 'quantitative',
    difficulty: 'medium',
  },
  {
    id: 'spatial',
    name: 'Space Explorer',
    description: 'Spatial Reasoning Challenge',
    timeLimit: 240, // 4 minutes
    questionCount: 8,
    category: 'spatial',
    difficulty: 'medium',
  },
  {
    id: 'attention',
    name: 'Focus Finder',
    description: 'Attention & Focus Challenge',
    timeLimit: 180, // 3 minutes
    questionCount: 15,
    category: 'attention',
    difficulty: 'medium',
  },
];

export function getGameConfig(gameId: string): GameConfig | undefined {
  return GAME_CONFIGS.find(config => config.id === gameId);
}

export function getNextGame(currentGameId: string): GameConfig | undefined {
  const currentIndex = GAME_CONFIGS.findIndex(config => config.id === currentGameId);
  if (currentIndex === -1 || currentIndex === GAME_CONFIGS.length - 1) {
    return undefined;
  }
  return GAME_CONFIGS[currentIndex + 1];
}

export function isLastGame(gameId: string): boolean {
  const currentIndex = GAME_CONFIGS.findIndex(config => config.id === gameId);
  return currentIndex === GAME_CONFIGS.length - 1;
}
