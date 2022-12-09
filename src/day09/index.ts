import run from "aocrunner"

type directionType = "R" | "L" | "D" | "U"
const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => x.split(" ") as [directionType, number])

const deltas = {
  // row, col
  R: [0, 1],
  L: [0, -1],
  D: [1, 0],
  U: [-1, 0],
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let h = [0, 0]
  let t = [0, 0]
  const visited = new Set(["0/0"])

  for (const [direction, steps] of input) {
    for (let i = 0; i < steps; i++) {
      h = [h[0] + deltas[direction][0], h[1] + deltas[direction][1]]
      const dr = t[0] - h[0]
      const dc = t[1] - h[1]
      if (Math.abs(dr) > 1 || Math.abs(dc) > 1) {
        t[0] -= Math.sign(dr)
        t[1] -= Math.sign(dc)
      }
      visited.add(t.join("/"))
    }
  }
  return visited.size
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const rope = new Array(10).fill(0).map((x) => [0, 0])
  const visited = new Set(["0/0"])

  for (const [direction, steps] of input) {
    for (let i = 0; i < steps; i++) {
      rope[0][0] += deltas[direction][0]
      rope[0][1] += deltas[direction][1]
      for (let s = 1; s < rope.length; s++) {
        const dr = rope[s][0] - rope[s - 1][0]
        const dc = rope[s][1] - rope[s - 1][1]
        if (Math.abs(dr) > 1 || Math.abs(dc) > 1) {
          rope[s][0] -= Math.sign(dr)
          rope[s][1] -= Math.sign(dc)
        }
      }
      visited.add(rope.at(-1)!.join("/"))
    }
  }
  return visited.size
}

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
