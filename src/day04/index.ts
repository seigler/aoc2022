import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((l) => l.split(",").map((r) => r.split("-").map((n) => +n)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let fullSubsets = 0
  for (const [a, b] of input) {
    const [lower, higher] =
      a[0] < b[0] || (a[0] == b[0] && a[1] > b[1]) ? [a, b] : [b, a]
    if (lower[1] >= higher[1]) {
      fullSubsets += 1
    }
  }
  return fullSubsets
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let partialSubsets = 0
  for (const [a, b] of input) {
    const [lower, higher] =
      a[0] < b[0] || (a[0] == b[0] && a[1] > b[1]) ? [a, b] : [b, a]
    if (higher[0] <= lower[1]) {
      partialSubsets += 1
    }
  }
  return partialSubsets
}

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
