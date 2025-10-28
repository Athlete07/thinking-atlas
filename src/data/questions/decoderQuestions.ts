import { Question } from '@/types/assessment';

export const DECODER_QUESTIONS: Question[] = [
  // Easy (Questions 1-3): Simple single-rule patterns
  {
    id: 'd1',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['circle', 'triangle', 'square', 'hexagon', 'star', 'diamond'],
    correctAnswer: 'triangle',
    explanation: 'Each row contains the same shape repeated. The pattern is consistent shapes across rows.',
    difficulty: 'easy',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'circle', color: 'primary' }, { shape: 'circle', color: 'primary' }],
        [{ shape: 'square', color: 'primary' }, { shape: 'square', color: 'primary' }, { shape: 'square', color: 'primary' }],
        [{ shape: 'triangle', color: 'primary' }, { shape: 'triangle', color: 'primary' }, null]
      ]
    }
  },
  {
    id: 'd2',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['triangle', 'circle', 'square', 'hexagon', 'star', 'diamond'],
    correctAnswer: 'triangle',
    explanation: 'Each column has the same shape with changing colors. Colors progress down each column.',
    difficulty: 'easy',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'square', color: 'primary' }, { shape: 'triangle', color: 'primary' }],
        [{ shape: 'circle', color: 'accent' }, { shape: 'square', color: 'accent' }, { shape: 'triangle', color: 'accent' }],
        [{ shape: 'circle', color: 'success' }, { shape: 'square', color: 'success' }, null]
      ]
    }
  },
  {
    id: 'd3',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['triangle', 'circle', 'square', 'hexagon', 'star', 'diamond'],
    correctAnswer: 'triangle',
    explanation: 'Shapes rotate position: each row shifts the pattern one position to the right.',
    difficulty: 'easy',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'triangle', color: 'primary' }, { shape: 'square', color: 'primary' }],
        [{ shape: 'triangle', color: 'primary' }, { shape: 'square', color: 'primary' }, { shape: 'circle', color: 'primary' }],
        [{ shape: 'square', color: 'primary' }, { shape: 'circle', color: 'primary' }, null]
      ]
    }
  },
  
  // Medium (Questions 4-7): Two-rule patterns
  {
    id: 'd4',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['triangle', 'circle', 'square', 'hexagon', 'star', 'diamond'],
    correctAnswer: 'triangle',
    explanation: 'Each row and column contains each shape once. Each row and column also contains each color once.',
    difficulty: 'medium',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'triangle', color: 'accent' }, { shape: 'square', color: 'success' }],
        [{ shape: 'triangle', color: 'accent' }, { shape: 'square', color: 'success' }, { shape: 'circle', color: 'primary' }],
        [{ shape: 'square', color: 'success' }, { shape: 'circle', color: 'primary' }, null]
      ]
    }
  },
  {
    id: 'd5',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['circle', 'square', 'triangle', 'hexagon', 'star', 'diamond'],
    correctAnswer: 'square',
    explanation: 'Same shapes in each row, but colors shift one position to the right with each row.',
    difficulty: 'medium',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'circle', color: 'accent' }, { shape: 'circle', color: 'success' }],
        [{ shape: 'triangle', color: 'success' }, { shape: 'triangle', color: 'primary' }, { shape: 'triangle', color: 'accent' }],
        [{ shape: 'square', color: 'accent' }, { shape: 'square', color: 'success' }, null]
      ]
    }
  },
  {
    id: 'd6',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['hexagon', 'star', 'diamond', 'circle', 'triangle', 'square'],
    correctAnswer: 'star',
    explanation: 'Shapes rotate clockwise across rows, while colors change down each column.',
    difficulty: 'medium',
    metadata: {
      grid: [
        [{ shape: 'hexagon', color: 'primary' }, { shape: 'star', color: 'primary' }, { shape: 'diamond', color: 'primary' }],
        [{ shape: 'star', color: 'accent' }, { shape: 'diamond', color: 'accent' }, { shape: 'hexagon', color: 'accent' }],
        [{ shape: 'diamond', color: 'success' }, { shape: 'hexagon', color: 'success' }, null]
      ]
    }
  },
  {
    id: 'd7',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['square', 'circle', 'triangle', 'hexagon', 'star', 'diamond'],
    correctAnswer: 'square',
    explanation: 'Each row shifts shapes one position left, and colors progress down columns.',
    difficulty: 'medium',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'square', color: 'primary' }, { shape: 'triangle', color: 'primary' }],
        [{ shape: 'square', color: 'accent' }, { shape: 'triangle', color: 'accent' }, { shape: 'circle', color: 'accent' }],
        [{ shape: 'triangle', color: 'success' }, { shape: 'circle', color: 'success' }, null]
      ]
    }
  },

  // Hard (Questions 8-10): Three-rule patterns
  {
    id: 'd8',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['circle', 'square', 'triangle', 'hexagon', 'star', 'diamond'],
    correctAnswer: 'circle',
    explanation: 'Complex rotation: shapes rotate, colors rotate in opposite direction, and positions shift.',
    difficulty: 'hard',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'triangle', color: 'accent' }, { shape: 'square', color: 'success' }],
        [{ shape: 'square', color: 'accent' }, { shape: 'circle', color: 'success' }, { shape: 'triangle', color: 'primary' }],
        [{ shape: 'triangle', color: 'success' }, { shape: 'square', color: 'primary' }, null]
      ]
    }
  },
  {
    id: 'd9',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['hexagon', 'star', 'diamond', 'circle', 'triangle', 'square'],
    correctAnswer: 'hexagon',
    explanation: 'Three-way rotation: each element cycles through positions, shapes, and colors independently.',
    difficulty: 'hard',
    metadata: {
      grid: [
        [{ shape: 'hexagon', color: 'primary' }, { shape: 'star', color: 'accent' }, { shape: 'diamond', color: 'success' }],
        [{ shape: 'diamond', color: 'accent' }, { shape: 'hexagon', color: 'success' }, { shape: 'star', color: 'primary' }],
        [{ shape: 'star', color: 'success' }, { shape: 'diamond', color: 'primary' }, null]
      ]
    }
  },
  {
    id: 'd10',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['circle', 'square', 'triangle', 'hexagon', 'star', 'diamond'],
    correctAnswer: 'circle',
    explanation: 'Diagonal pattern: elements repeat along diagonals from top-left to bottom-right.',
    difficulty: 'hard',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'square', color: 'accent' }, { shape: 'triangle', color: 'success' }],
        [{ shape: 'triangle', color: 'success' }, { shape: 'circle', color: 'primary' }, { shape: 'square', color: 'accent' }],
        [{ shape: 'square', color: 'accent' }, { shape: 'triangle', color: 'success' }, null]
      ]
    }
  },
];

export const DECODER_PRACTICE_QUESTIONS: Question[] = [
  {
    id: 'dp1',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['triangle', 'circle', 'square', 'hexagon'],
    correctAnswer: 'triangle',
    explanation: 'Each column has the same shape, and each row has the same color. The missing symbol must be a triangle with the success (green) color to continue the pattern.',
    difficulty: 'easy',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'square', color: 'primary' }, { shape: 'triangle', color: 'primary' }],
        [{ shape: 'circle', color: 'accent' }, { shape: 'square', color: 'accent' }, { shape: 'triangle', color: 'accent' }],
        [{ shape: 'circle', color: 'success' }, { shape: 'square', color: 'success' }, null]
      ]
    }
  },
  {
    id: 'dp2',
    type: 'pattern-recognition',
    question: 'What symbol completes the pattern?',
    options: ['triangle', 'circle', 'square', 'hexagon'],
    correctAnswer: 'triangle',
    explanation: 'The shapes rotate one position to the left in each row. Following this pattern, the bottom-right position needs a triangle.',
    difficulty: 'easy',
    metadata: {
      grid: [
        [{ shape: 'circle', color: 'primary' }, { shape: 'triangle', color: 'primary' }, { shape: 'square', color: 'primary' }],
        [{ shape: 'triangle', color: 'primary' }, { shape: 'square', color: 'primary' }, { shape: 'circle', color: 'primary' }],
        [{ shape: 'square', color: 'primary' }, { shape: 'circle', color: 'primary' }, null]
      ]
    }
  }
];
