import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.trim()

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  for (let i = 4; i < input.length; i++) {
    const window = new Set([...input.slice(i - 4, i)])
    if (window.size === 4) return i
  }
  return -1
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  for (let i = 14; i < input.length; i++) {
    const window = new Set([...input.slice(i - 14, i)])
    if (window.size === 14) return i
  }
  return -1
}

run({
  part1: {
    tests: [
      { input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`, expected: 7 },
      { input: `bvwbjplbgvbhsrlpgdmjqwftvncz`, expected: 5 },
      { input: `nppdvjthqldpwncqszvftbrmjlhg`, expected: 6 },
      { input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, expected: 10 },
      { input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, expected: 11 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`, expected: 19 },
      { input: `bvwbjplbgvbhsrlpgdmjqwftvncz`, expected: 23 },
      { input: `nppdvjthqldpwncqszvftbrmjlhg`, expected: 23 },
      { input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, expected: 29 },
      { input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, expected: 26 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
