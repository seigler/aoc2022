import run from "aocrunner"
import { dir } from "console"

type file = { name: string; type: "file"; size: number }
type dir = { name: string; type: "dir"; contents: (dir | file)[] }

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n")
  let tree: dir = { name: "/", type: "dir", contents: [] }
  let currentDir = tree
  let currentParents: dir[] = []
  for (let n = 0; n < lines.length; n++) {
    const [_prompt, command, param] = lines[n].split(" ") as [
      "$",
      "cd" | "ls",
      string?,
    ]
    if (command === "cd") {
      if (param === "/") {
        currentDir = tree
      } else if (param === "..") {
        // TODO error checking
        currentDir = currentParents.pop()!
      } else {
        // TODO error checking
        currentParents.push(currentDir)
        currentDir = currentDir.contents.find((x) => x.name === param) as dir
      }
    }
    if (command === "ls") {
      while (n < lines.length - 1 && lines[n + 1].charAt(0) !== "$") {
        const [a, b] = lines[n + 1].split(" ")
        if (a === "dir") {
          // it's a directory
          currentDir.contents.push({
            name: b,
            type: "dir",
            contents: [],
          })
        } else {
          // it's a file
          currentDir.contents.push({
            name: b,
            type: "file",
            size: Number(a),
          })
        }
        n++
      }
    }
  }
  return tree
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let total = 0
  function getSize(x: dir | file): number {
    if (x.type === "file") {
      return x.size
    } else {
      const size = x.contents.reduce((acc, cur) => acc + getSize(cur), 0)
      if (size <= 100000) {
        total += size
      }
      return size
    }
  }
  getSize(input)
  return total
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const candidates: number[] = []
  function getSize(x: dir | file): number {
    if (x.type === "file") {
      return x.size
    } else {
      const size = x.contents.reduce((acc, cur) => acc + getSize(cur), 0)
      candidates.push(size)
      return size
    }
  }
  const totalSize = getSize(input)
  const unused = 70000000 - totalSize
  const needed = 30000000 - unused
  return candidates.filter((x) => x >= needed).sort((a, b) => a - b)[0]
}

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
