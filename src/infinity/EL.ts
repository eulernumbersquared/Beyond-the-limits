import Decimal from "break_eternity.js"
import { reactive, ref } from "vue"
import { formatNumber } from "../format"
import { player } from "../player"

export interface LetterDef {
  title: string
  desc: string
  amount: Decimal
  effect: (r?: number, c?: number) => Decimal
  effectDisplay: () => string
  unlocked: () => boolean
}

export interface Cell {
  row: number
  col: number
  letter: string | null
  isNullified?: boolean
}

let gridRef: Cell[][] | null = null
export function setGrid(grid: Cell[][]) {
  gridRef = grid
}

export function countAdjacentLetters(r: number, c: number): number {
  if (!gridRef) return 0
  const dirs: [number, number][] = [[0,1],[0,-1],[1,0],[-1,0]]
  let count = 0
  for (const [dr,dc] of dirs) {
    const nr = r+dr, nc = c+dc
    if (nr>=0 && nr<4 && nc>=0 && nc<4) {
      if (gridRef[nr][nc].letter) count++
    }
  }
  return count
}

function isCornerNeighbor(r: number, c: number, targetR: number, targetC: number): boolean {
  return Math.abs(r - targetR) === 1 && Math.abs(c - targetC) === 1
}

function countCornerCs(r: number, c: number): number {
  if (!gridRef) return 0
  let count = 0
  for (let row of gridRef) {
    for (let cCell of row) {
      if (cCell.letter === "C" && isCornerNeighbor(r, c, cCell.row, cCell.col)) {
        count++
      }
    }
  }
  return count
}

function isNear(r: number, c: number, target: string, includeDiagonal = true): boolean {
  if (!gridRef) return false

  const dirs: [number, number][] = [[0,1],[0,-1],[1,0],[-1,0]]
  if (includeDiagonal) {
    dirs.push([-1,-1], [-1,1], [1,-1], [1,1])
  }

  for (const [dr, dc] of dirs) {
    const nr = r + dr
    const nc = c + dc


    if (nr >= 0 && nr < gridRef.length && nc >= 0 && nc < gridRef[0].length) {
      const neighbor = gridRef[nr][nc]
      if (neighbor && neighbor.letter === target) {
        return true
      }
    }
  }

  return false
}


export const ELs: LetterDef[] = reactive([
{
  title: "A",
  desc: "Boost solars based on amount placed. If placed next to B, its effect will be doubled.",
  amount: new Decimal(0),
effect() {
  let base = Decimal.pow(1.2, this.amount)

  if (gridRef) {
    for (const row of gridRef) {
      for (const cell of row) {
        if (cell.letter === "A") {
          if (isNear(cell.row, cell.col, "B")) {
            base = base.mul(2)
          }
          const cornerCount = countCornerCs(cell.row, cell.col)
          if (cornerCount > 0) {
            base = base.mul(Decimal.pow(2, cornerCount))
          }
        }
      }
    }
  }

  return base
},

  effectDisplay() {
    return `Solars are boosted by x${formatNumber(this.effect())}`
  },
  unlocked() { return player.infinity.calamitytier.gte(1)}
},
  {
    title: "B",
    desc: "Boost lunars based on amount placed. If placed next to A, it's effect will be doubled",
    amount: new Decimal(0),
effect() {
  let base = Decimal.pow(1.2, this.amount)

  if (gridRef) {
    for (const row of gridRef) {
      for (const cell of row) {
        if (cell.letter === "B") {
          if (isNear(cell.row, cell.col, "A")) {
            base = base.mul(2)
          }
          const cornerCount = countCornerCs(cell.row, cell.col)
          if (cornerCount > 0) {
            base = base.mul(Decimal.pow(2, cornerCount))
          }
        }
      }
    }
  }

  return base
},

    effectDisplay() {
      return `Lunars are boosted by x${formatNumber(this.effect())}`
    },
    unlocked() { return player.infinity.calamitytier.gte(1)}
  },
  
  {
    title: "C",
    desc: "Boosts any letters to the corner of such.",
    amount: new Decimal(0),
    effect() {
      return new Decimal("2")
    },
    effectDisplay() {
      return `Currently boosting other letters by x${formatNumber(this.effect())}`
    },
    unlocked() { return player.infinity.calamitytier.gte(1)}
  },
{
  title: "D",
  desc: "Boost Solarity Energy. If placed next to A and B, its effect will be x1.5'd",
  amount: new Decimal(0),
effect() {
  let base = Decimal.pow(1.1, this.amount)

  if (gridRef) {
    for (const row of gridRef) {
      for (const cell of row) {
        if (cell.letter === "D") {
          const nearA = isNear(cell.row, cell.col, "A", true)
          const nearB = isNear(cell.row, cell.col, "B", true)
          if (nearA && nearB) {
            base = base.mul(1.5)
          }
          const cornerCount = countCornerCs(cell.row, cell.col)
          if (cornerCount > 0) {
            base = base.mul(Decimal.pow(2, cornerCount))
          }
        }
      }
    }
  }

  return base
},
  effectDisplay() {
    return `Solar energy (SE) is boosted by x${formatNumber(this.effect())}`
  },
  unlocked() { return player.infinity.calamitytier.gte(1)}
},
    {
    title: "E",
    desc: "Reduces the time for crops growing. This does not get effected by C",
    amount: new Decimal(0),
    effect() {
      let base = Decimal.pow(1.1, this.amount)
      return base
    },
    effectDisplay() {
      return `Solar energy (SE) is boosted by x${formatNumber(this.effect())}`
    },
    unlocked() { return player.infinity.calamitytier.gte(1)}
  }
])


export function placeLetter(r: number, c: number, letter: string|null) {
  if (!gridRef || !letter) return
  const cell = gridRef[r][c]
  if (cell.letter) return

  cell.letter = letter

  const def = ELs.find(l => l.title === letter)
  if (def) def.amount = def.amount.add(1)
}




export function removeLetter(r: number, c: number) {
  if (!gridRef) return
  const cell = gridRef[r][c]
  if (!cell.letter) return

  const def = ELs.find(l => l.title === cell.letter)
  if (def) {
    def.amount = def.amount.sub(1).max(0)
  }

  cell.letter = null
}

export function clearAll(): void {
  if (!gridRef) return
  for (const row of gridRef) {
    for (const cell of row) {
      if (cell.letter) {
        removeLetter(cell.row, cell.col)
      }
    }
  }
}

export function recalcLetterAmounts() {
  for (const def of ELs) {
    def.amount = new Decimal(0)
  }
  if (!gridRef) return
  for (const row of gridRef) {
    for (const cell of row) {
      if (cell.letter) {
        const def = ELs.find(l => l.title === cell.letter)
        if (def) def.amount = def.amount.add(1)
      }
    }
  }
}
