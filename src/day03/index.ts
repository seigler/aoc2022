import run from "aocrunner"
import { assert } from "console"

const parseInput = (rawInput: string) => rawInput.trim().split("\n")

function getPriority(c: string) {
  const code = c.charCodeAt(0)
  if (code >= 97) {
    // "a"
    return code - 96
  }
  return code - 65 /* "A" */ + 27
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let total = 0
  for (const rucksack of input) {
    const [left, right] = [
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2),
    ]
    const leftItems = new Set(left.split(""))
    const common = [...leftItems.values()].filter((c) => right.includes(c))
    total += getPriority(common[0])
  }
  return total
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let total = 0
  const groupSize = 3
  for (let g = 0; g < input.length; g += groupSize) {
    const items = new Set(input[g])
    for (let m = 1; m < groupSize; m++) {
      for (const i of [...items.values()]) {
        if (input[g + m].includes(i)) continue
        else items.delete(i)
      }
    }
    total += getPriority([...items.values()][0])
  }
  return total
}

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
