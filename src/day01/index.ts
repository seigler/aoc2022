import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const byElf = rawInput.split('\n\n')
  return byElf.map(x => x.split('\n').map(x => +x))
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const totals = input.map(elf => elf.reduce((acc, cur) => acc + cur))
  const max = totals.sort((a,b) => b - a)[0]
  return max
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const totals = input.map(elf => elf.reduce((acc, cur) => acc + cur))
  const sorted = totals.sort((a,b) => b - a)
  return sorted[0] + sorted[1] + sorted[2]
}

run({
  part1: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
