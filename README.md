# 🤖 AI-Playgound
An excersise in how Claude AI works and how to utilize prompting for fast development cycles.
All code is created by AI.

# 🎓 A Small Teacher

A CLI recreation of the classic Texas Instruments *Little Professor* educational toy (1976).

The toy works in reverse to a calculator: it generates arithmetic problems and **you** provide the answers.

## Features

- 5 difficulty levels (addition → all four operations, increasing number ranges)
- 10 problems per round
- 3 attempts per problem — wrong answer shows `EEE`, just like the original
- Answer revealed after 3 failed attempts
- Score summary with per-problem recap after each round

## Getting started

```bash
npm install
npm run dev        # run directly with ts-node in CLI
npm run serve      # run as express webbserver on http://localhost:3000/
# or
npm run build && npm start   # compile then run

```

## Levels

| Level | Operations | Range |
|-------|-----------|-------|
| 1 | `+` | 0–9 |
| 2 | `+ -` | 0–9 |
| 3 | `+ - ×` | 0–99 |
| 4 | `+ - × ÷` | 0–99 |
| 5 | `+ - × ÷` | 0–999 |

Division problems are always whole-number results (no remainders).
Subtraction problems never produce negative results.
