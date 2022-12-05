import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const [rawState, rawInstructions] = rawInput
    .split("\n\n")
    .map((x) => x.split("\n"))
  const stackCount = (rawState.at(-1)!.length + 1) / 4
  const state = new Array<string[]>(stackCount)
  for (let i = 0; i < stackCount; i++) {
    state[i] = new Array<string>()
  }
  for (const line of rawState) {
    ;[...line.matchAll(/[\[ ]([A-Z ])[\] ] ?/g)].forEach(
      ([_match, id], index) => {
        if (id !== " ") {
          state[index].unshift(id)
        }
      },
    )
  }
  const instructions = rawInstructions.map((x) =>
    [...x.matchAll(/\d+/g)].map(([num]) => +num),
  )
  return { state, instructions }
}

const part1 = (rawInput: string) => {
  const { state, instructions } = parseInput(rawInput)
  for (const instruction of instructions) {
    const [quantity, from, to] = instruction
    for (let i = 0; i < quantity; i++) {
      state[to - 1].push(state[from - 1].pop()!)
    }
  }
  return state.map((stack) => stack.at(-1)).join("")
}

const part2 = (rawInput: string) => {
  const { state, instructions } = parseInput(rawInput)
  for (const instruction of instructions) {
    const [quantity, from, to] = instruction
    const moving = state[from - 1].slice(-quantity)
    state[from - 1].length -= quantity
    state[to - 1] = state[to - 1].concat(moving)
  }
  return state.map((stack) => stack.at(-1)).join("")
}

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
})
