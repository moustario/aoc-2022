# ADVENT OF CODE 2022

Trying AOC for the first time, not aiming to do them all or the fatest. The
solutions are kinda messy, the repo is more of a personal log of my progress
than a proper way to solve the puzzles.

Puzzles available at : https://adventofcode.com/2022

## Day 1

Inside the 'day-1' folder:

> deno run --allow-read index.ts

## Day 2

At the root of the repo :

> deno run --allow-read ./day-2/index.ts

## Day 3

There is now an arg to change input file, at the root of the repo :

> deno run --allow-read --allow-write ./day-3/index.ts ./day-3/input.txt

## Troubleshooting

On Ubuntu 22 if error `Command 'deno' not found`:

```bash
export DENO_INSTALL="/home/antoine/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```
