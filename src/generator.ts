import { Operation, Problem, LevelConfig } from './types';

const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  1: { maxA: 9,   maxB: 9,   operations: ['+'] },
  2: { maxA: 9,   maxB: 9,   operations: ['+', '-'] },
  3: { maxA: 99,  maxB: 9,   operations: ['+', '-', '×'] },
  4: { maxA: 99,  maxB: 99,  operations: ['+', '-', '×', '÷'] },
  5: { maxA: 999, maxB: 99,  operations: ['+', '-', '×', '÷'] },
};

function rand(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateProblem(level: number): Problem {
  const config = LEVEL_CONFIGS[level];
  const operation: Operation = pick(config.operations);

  let a: number, b: number, answer: number;

  switch (operation) {
    case '+':
      a = rand(config.maxA);
      b = rand(config.maxB);
      answer = a + b;
      break;

    case '-':
      a = rand(config.maxA);
      // Level 3+: allow negative results; lower levels keep result >= 0
      b = level >= 3 ? rand(config.maxB) : rand(Math.min(a, config.maxB));
      answer = a - b;
      break;

    case '×':
      a = rand(Math.min(config.maxA, 12));
      b = rand(Math.min(config.maxB, 12));
      answer = a * b;
      break;

    case '÷': {
      // Generate a clean division problem with no remainder
      b = rand(11) + 1; // divisor 1–12
      const quotient = rand(12);
      a = b * quotient;
      answer = quotient;
      break;
    }
  }

  return { a, b, operation, answer };
}

export function formatProblem(p: Problem): string {
  return `${p.a} ${p.operation} ${p.b} = ?`;
}
