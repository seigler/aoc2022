import run from "aocrunner"
import { rmdir } from "fs"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => [...row].map((x) => +x))

const cardinalDirections = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

const part1 = (rawInput: string) => {
  const forest = parseInput(rawInput)
  const width = forest[0].length
  const depth = forest.length
  let totalVisible = 0
  //for each tree:
  for (let row = 0; row < depth; row++) {
    for (let col = 0; col < width; col++) {
      const thisHeight = forest[row][col]
      findAnyVisibility: {
        // labelled block
        for (const [dr, dc] of cardinalDirections) {
          let r = row + dr,
            c = col + dc
          findThisVisibility: {
            while (r >= 0 && r < depth && c >= 0 && c < width) {
              if (forest[r][c] >= thisHeight) {
                break findThisVisibility // we are blocked this direction
              }
              r += dr
              c += dc
            }
            totalVisible++
            break findAnyVisibility
          }
        }
      }
    }
  }
  return totalVisible
}

const part2 = (rawInput: string) => {
  const forest = parseInput(rawInput)
  const width = forest[0].length
  const depth = forest.length
  let bestScore = 0
  //for each tree:
  for (let row = 0; row < depth; row++) {
    for (let col = 0; col < width; col++) {
      const thisHeight = forest[row][col]
      let score = 1
      for (const [dr, dc] of cardinalDirections) {
        let r = row + dr,
          c = col + dc,
          d = 0
        while (r >= 0 && r < depth && c >= 0 && c < width) {
          if (forest[r][c] >= thisHeight) {
            d++
            break // we are blocked this direction
          }
          r += dr
          c += dc
          d++
        }
        score *= d
      }
      bestScore = Math.max(bestScore, score)
    }
  }
  return bestScore
}

run({
  part1: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `30373
25512
65332
33549
35390`,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
