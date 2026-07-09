import type { BracketRound } from "./types"

// Match numbers in bracket tree order (pairs feed into the next round).
export const BRACKET_ROUNDS: BracketRound[] = [
  {
    label: "Round of 32",
    matchNums: [73, 76, 75, 78, 84, 83, 82, 81, 74, 77, 79, 80, 87, 86, 85, 88],
  },
  {
    label: "Round of 16",
    matchNums: [89, 90, 93, 94, 91, 92, 95, 96],
  },
  {
    label: "Quarterfinals",
    matchNums: [97, 98, 99, 100],
  },
  {
    label: "Semifinals",
    matchNums: [101, 102],
  },
  {
    label: "Final",
    matchNums: [104],
  },
]

// When the API has not yet filled home/away, derive from feeder match winners.
export const FEEDER_MATCHES: Record<number, [number, number]> = {
  101: [97, 98],
  102: [99, 100],
  104: [101, 102],
}

export const WORLDCUP_DATA_URL = "/worldcup.json"
