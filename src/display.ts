import { RoundResult } from './types';

const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';
const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN   = '\x1b[36m';
const DIM    = '\x1b[2m';

function c(color: string, text: string): string {
  return `${color}${text}${RESET}`;
}

export function printBanner(): void {
  console.log();
  console.log(c(YELLOW, BOLD + '  ┌─────────────────────────────────┐'));
  console.log(c(YELLOW,        '  │      🎓  THE LITTLE PROFESSOR   │'));
  console.log(c(YELLOW,        '  │     Texas Instruments  (1976)   │'));
  console.log(c(YELLOW,        '  └─────────────────────────────────┘') + RESET);
  console.log();
}

export function printLevelMenu(): void {
  console.log(c(CYAN, '  Select difficulty level:'));
  console.log();
  console.log('  1 — Addition only            (0–9)');
  console.log('  2 — Addition & Subtraction   (0–9)');
  console.log('  3 — + - ×                   (up to 99)');
  console.log('  4 — + - × ÷                 (up to 99)');
  console.log('  5 — + - × ÷                 (up to 999)');
  console.log();
}

export function printProblemHeader(num: number, total: number, level: number): void {
  console.log(c(DIM, `\n  Problem ${num}/${total}  ·  Level ${level}`));
}

export function printEEE(): void {
  console.log(c(RED, '  EEE  ←  Try again'));
}

export function printCorrect(): void {
  console.log(c(GREEN, '  ✓  Correct!'));
}

export function printReveal(answer: number): void {
  console.log(c(RED, `  The answer was: ${BOLD}${answer}${RESET}`));
}

export function printScore(results: RoundResult[], level: number): void {
  const solved = results.filter(r => r.solved).length;
  const total  = results.length;
  const pct    = Math.round((solved / total) * 100);

  console.log();
  console.log(c(YELLOW, '  ┌──────────────────────────────────┐'));
  console.log(c(YELLOW, '  │            ROUND OVER            │'));
  console.log(c(YELLOW, '  └──────────────────────────────────┘'));
  console.log();
  console.log(`  Level  : ${level}`);
  console.log(`  Score  : ${c(pct >= 70 ? GREEN : RED, `${solved} / ${total}`)}  (${pct}%)`);
  console.log();

  // Per-problem recap
  results.forEach((r, i) => {
    const { a, b, operation, answer } = r.problem;
    const status = r.solved
      ? c(GREEN, '✓')
      : c(RED,   '✗');
    const label  = `${a} ${operation} ${b} = ${answer}`;
    const tries  = c(DIM, `(${r.attempts} attempt${r.attempts !== 1 ? 's' : ''})`);
    console.log(`  ${i + 1}.  ${status}  ${label.padEnd(16)} ${tries}`);
  });

  console.log();

  if (pct === 100) {
    console.log(c(GREEN, BOLD + '  🏆  Perfect score! Outstanding!'));
  } else if (pct >= 80) {
    console.log(c(GREEN, '  Well done!'));
  } else if (pct >= 60) {
    console.log(c(YELLOW, '  Good effort — keep practicing!'));
  } else {
    console.log(c(RED, '  Keep at it — practice makes perfect.'));
  }

  console.log();
}
