import { Question } from '@/types/assessment';

export const QUANTITATIVE_QUESTIONS: Question[] = [
  // Easy (Questions 1-3): Basic arithmetic and number patterns
  {
    id: 'q1',
    type: 'math-problem',
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correctAnswer: '30',
    explanation: '15% of 200 = 0.15 × 200 = 30',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    type: 'math-problem',
    question: 'Complete the sequence: 2, 4, 8, 16, ___',
    options: ['20', '24', '32', '28'],
    correctAnswer: '32',
    explanation: 'Each number is multiplied by 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    type: 'math-problem',
    question: 'If a train travels 120 miles in 2 hours, what is its average speed?',
    options: ['50 mph', '60 mph', '70 mph', '80 mph'],
    correctAnswer: '60 mph',
    explanation: 'Speed = Distance ÷ Time = 120 miles ÷ 2 hours = 60 mph',
    difficulty: 'easy',
  },

  // Medium (Questions 4-7): Algebra and word problems
  {
    id: 'q4',
    type: 'math-problem',
    question: 'If 3x + 7 = 22, what is x?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: '3x + 7 = 22 → 3x = 15 → x = 5',
    difficulty: 'medium',
  },
  {
    id: 'q5',
    type: 'math-problem',
    question: 'A store offers a 20% discount on a $150 item. What is the final price?',
    options: ['$120', '$130', '$110', '$100'],
    correctAnswer: '$120',
    explanation: '20% of $150 = $30, so final price = $150 - $30 = $120',
    difficulty: 'medium',
  },
  {
    id: 'q6',
    type: 'math-problem',
    question: 'What is the area of a rectangle with length 8 and width 6?',
    options: ['42', '48', '52', '56'],
    correctAnswer: '48',
    explanation: 'Area = length × width = 8 × 6 = 48 square units',
    difficulty: 'medium',
  },
  {
    id: 'q7',
    type: 'math-problem',
    question: 'If 5 workers can complete a job in 8 days, how many days will it take 10 workers?',
    options: ['4 days', '6 days', '8 days', '10 days'],
    correctAnswer: '4 days',
    explanation: 'More workers means less time. 5 workers × 8 days = 40 worker-days. 40 ÷ 10 workers = 4 days',
    difficulty: 'medium',
  },

  // Hard (Questions 8-10): Advanced quantitative reasoning
  {
    id: 'q8',
    type: 'math-problem',
    question: 'What is the probability of rolling a 6 on a fair die?',
    options: ['1/3', '1/4', '1/6', '1/2'],
    correctAnswer: '1/6',
    explanation: 'A fair die has 6 faces, so the probability of rolling any specific number is 1/6',
    difficulty: 'hard',
  },
  {
    id: 'q9',
    type: 'math-problem',
    question: 'If the ratio of apples to oranges is 3:4 and there are 21 apples, how many oranges are there?',
    options: ['24', '28', '32', '36'],
    correctAnswer: '28',
    explanation: '3:4 = 21:x → 3x = 84 → x = 28 oranges',
    difficulty: 'hard',
  },
  {
    id: 'q10',
    type: 'math-problem',
    question: 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ___?',
    options: ['11', '12', '13', '14'],
    correctAnswer: '13',
    explanation: 'This is the Fibonacci sequence where each number is the sum of the two preceding numbers: 5 + 8 = 13',
    difficulty: 'hard',
  },
];

export const QUANTITATIVE_PRACTICE_QUESTIONS: Question[] = [
  {
    id: 'qp1',
    type: 'math-problem',
    question: 'What is 25% of 80?',
    options: ['15', '20', '25', '30'],
    correctAnswer: '20',
    explanation: '25% of 80 = 0.25 × 80 = 20',
    difficulty: 'easy',
  },
  {
    id: 'qp2',
    type: 'math-problem',
    question: 'What is 12 + 8?',
    options: ['18', '19', '20', '21'],
    correctAnswer: '20',
    explanation: '12 + 8 = 20',
    difficulty: 'easy',
  },
];
