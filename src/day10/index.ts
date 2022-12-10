import run from "aocrunner"

type instructionType =
  | { op: "noop"; arg: undefined }
  | { op: "addx"; arg: number }

const delays = {
  noop: 1,
  addx: 2,
} as const

function parseInput(rawInput: string): instructionType[] {
  return rawInput.split("\n").map((l) => {
    const [op, arg] = l.split(" ")
    if (op === "noop") return { op: "noop", arg: undefined }
    return { op: "addx", arg: +arg }
  })
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const isCycleSampled = (cycle: number) => (cycle - 20) % 40 === 0
  const registers = { x: 1 }
  let sum = 0
  let cycle = 0
  for (const { op, arg } of input) {
    for (let i = 0; i < delays[op]; i++) {
      cycle++
      if (isCycleSampled(cycle)) {
        sum += cycle * registers.x
      }
    }
    // between cycles
    if (op === "addx") {
      registers.x += arg
    } else if (op === "noop") {
      // do nothing
    }
  }
  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const registers = { x: 1 }
  let cycle = 0
  let display = ""
  for (const { op, arg } of input) {
    for (let i = 0; i < delays[op]; i++) {
      if ([-1, 0, 1].includes(registers.x - (cycle % 40))) {
        display += "#"
      } else {
        display += "."
      }
      cycle++
      if (cycle % 40 === 0) {
        display += "\n"
      }
    }
    // between cycles
    if (op === "addx") {
      registers.x += arg
    } else if (op === "noop") {
      // do nothing
    }
  }
  console.log(display)
  return
}

const largeExample = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

run({
  part1: {
    tests: [
      //       {
      //         input: `noop
      // addx 3
      // addx -5`,
      //         expected: 0,
      //       },
      {
        input: largeExample,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: largeExample,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
