export type Operation = '+' | '-' | '×' | '÷';

export interface Problem {
  a: number;
  b: number;
  operation: Operation;
  answer: number;
}

export interface RoundResult {
  problem: Problem;
  solved: boolean;
  attempts: number;
}

export interface GameConfig {
  level: number;           // 1–5
  problemsPerRound: number;
  maxAttempts: number;
}

export interface LevelConfig {
  maxA: number;
  maxB: number;
  operations: Operation[];
}
