import { Operation, Problem, LevelConfig } from './types';

const LEVEL_CONFIGS: Record<number, LevelConfig> = {
  1: { minA: 0,  maxA: 9,   minB: 0, maxB: 9,  operations: ['+'] },
  2: { minA: 0,  maxA: 9,   minB: 0, maxB: 9,  operations: ['+', '-'] },
  3: { minA: 10, maxA: 99,  minB: 1, maxB: 99, operations: ['+', '-', '×'] },
  4: { minA: 20, maxA: 99,  minB: 2, maxB: 20, operations: ['+', '-', '×', '÷'] },
  5: { minA: 50, maxA: 999, minB: 5, maxB: 50, operations: ['+', '-', '×', '÷'] },
};

const NEG_CHANCE_SUB: Record<number, number> = { 3: 0.3, 4: 0.45, 5: 0.6 };
const NEG_CHANCE_MUL: Record<number, number> = { 4: 0.25, 5: 0.4 };
const NEG_CHANCE_DIV = 0.35;

function randRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function maybeNegative(value: number, chance: number): number {
  return Math.random() < chance ? -value : value;
}

function generateProblem(level: number): Problem {
  const cfg = LEVEL_CONFIGS[level];
  const operation: Operation = pick(cfg.operations);
  let a: number, b: number, answer: number;

  switch (operation) {
    case '+':
      a = randRange(cfg.minA, cfg.maxA);
      b = randRange(cfg.minB, cfg.maxB);
      answer = a + b;
      break;

    case '-': {
      a = randRange(cfg.minA, cfg.maxA);
      const chanceSub = NEG_CHANCE_SUB[level] ?? 0;
      if (level >= 3 && Math.random() < chanceSub) {
        b = randRange(a + 1, cfg.maxA);
      } else {
        b = randRange(cfg.minB, Math.min(a, cfg.maxB));
      }
      answer = a - b;
      break;
    }

    case '×': {
      const multMax = level >= 4 ? 20 : 12;
      a = randRange(2, Math.min(cfg.maxA, multMax));
      b = randRange(2, Math.min(cfg.maxB, multMax));
      if (level >= 4 && Math.random() < (NEG_CHANCE_MUL[level] ?? 0)) {
        if (Math.random() < 0.5) a = -a; else b = -b;
      }
      answer = a * b;
      break;
    }

    case '÷': {
      b = randRange(2, Math.min(cfg.maxB, 20));
      const maxQ = Math.floor(cfg.maxA / b);
      const minQ = level >= 5 ? 2 : 1;
      let q = randRange(minQ, Math.max(minQ, maxQ));
      if (level >= 5) q = maybeNegative(q, NEG_CHANCE_DIV);
      a = b * q;
      answer = q;
      break;
    }
  }

  return { a, b, operation, answer };
}

function isTooEasy({ a, b, operation }: Problem): boolean {
  switch (operation) {
    case '+': return a < 20 && b < 10;
    case '-': return Math.abs(a - b) < 5;
    case '×': return Math.abs(a) <= 5 || Math.abs(b) <= 5;
    case '÷': return Math.abs(a) < 30 || Math.abs(b) < 2;
  }
}

export function generateBalancedProblem(level: number): Problem {
  let problem: Problem;
  do {
    problem = generateProblem(level);
  } while (isTooEasy(problem));
  return problem;
}

export function formatProblem(p: Problem): string {
  return `${p.a} ${p.operation} ${p.b} = ?`;
}
