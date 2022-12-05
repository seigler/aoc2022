import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((x) => x.split(" "))

const shapeScores = {
  X: 1,
  Y: 2,
  Z: 3,
}

const outcomeScores = {
  LOSS: 0,
  DRAW: 3,
  WIN: 6,
}

type gameType = ["A" | "B" | "C", "X" | "Y" | "Z"]
const cycle = {
  A: {
    X: "DRAW" as const,
    Y: "WIN" as const,
    Z: "LOSS" as const,
  },
  B: {
    X: "LOSS" as const,
    Y: "DRAW" as const,
    Z: "WIN" as const,
  },
  C: {
    X: "WIN" as const,
    Y: "LOSS" as const,
    Z: "DRAW" as const,
  },
}
function getOutcome([them, us]: gameType): keyof typeof outcomeScores {
  return cycle[them][us]
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput) as gameType[]
  let score = 0
  for (const [them, us] of input) {
    score += shapeScores[us]
    score += outcomeScores[getOutcome([them, us])]
  }
  return score
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput) as gameType[]
  let score = 0
  const outcomes = {
    X: "LOSS" as const,
    Y: "DRAW" as const,
    Z: "WIN" as const,
  }
  const key = {
    A: {
      DRAW: "X" as const,
      WIN: "Y" as const,
      LOSS: "Z" as const,
    },
    B: {
      LOSS: "X" as const,
      DRAW: "Y" as const,
      WIN: "Z" as const,
    },
    C: {
      WIN: "X" as const,
      LOSS: "Y" as const,
      DRAW: "Z" as const,
    },
  }

  for (const [them, outcome] of input) {
    score += outcomeScores[outcomes[outcome]]
    score += shapeScores[key[them][outcomes[outcome]]]
  }
  return score
}

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
