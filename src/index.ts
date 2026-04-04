import { ask, close } from './input';
import { generateProblem, formatProblem } from './generator';
import {
  printBanner,
  printLevelMenu,
  printProblemHeader,
  printEEE,
  printCorrect,
  printReveal,
  printScore,
} from './display';
import { GameConfig, RoundResult } from './types';

const CONFIG: GameConfig = {
  level: 1,
  problemsPerRound: 10,
  maxAttempts: 3,
};

// ─── Level selection ──────────────────────────────────────────────────────────

async function selectLevel(): Promise<number> {
  printLevelMenu();
  while (true) {
    const input = await ask('  Level (1–5): ');
    const level = parseInt(input, 10);
    if (level >= 1 && level <= 5) return level;
    console.log('  Please enter a number between 1 and 5.');
  }
}

// ─── Single problem ───────────────────────────────────────────────────────────

async function runProblem(level: number, num: number, total: number): Promise<RoundResult> {
  const problem = generateProblem(level);
  printProblemHeader(num, total, level);

  let attempts = 0;

  for (let attempt = 0; attempt < CONFIG.maxAttempts; attempt++) {
    const raw   = await ask(`  ${formatProblem(problem)}  `);
    const guess = parseInt(raw, 10);
    attempts++;

    if (isNaN(guess)) {
      console.log('  Enter a number.');
      attempt--; // don't count invalid input as an attempt
      continue;
    }

    if (guess === problem.answer) {
      printCorrect();
      return { problem, solved: true, attempts };
    }

    if (attempt < CONFIG.maxAttempts - 1) {
      printEEE();
    }
  }

  printReveal(problem.answer);
  return { problem, solved: false, attempts };
}

// ─── Full round ───────────────────────────────────────────────────────────────

async function runRound(level: number): Promise<RoundResult[]> {
  const results: RoundResult[] = [];

  for (let i = 0; i < CONFIG.problemsPerRound; i++) {
    const result = await runProblem(level, i + 1, CONFIG.problemsPerRound);
    results.push(result);
  }

  return results;
}

// ─── Main loop ────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  printBanner();

  let playing = true;

  while (playing) {
    const level   = await selectLevel();
    console.log();
    const results = await runRound(level);
    printScore(results, level);

    const again = await ask('  Play again? (y/n): ');
    playing = again.toLowerCase().startsWith('y');
    console.log();
  }

  console.log('  Goodbye! 👋\n');
  close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
