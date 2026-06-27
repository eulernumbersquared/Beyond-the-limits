import Decimal from "break_eternity.js"

export type Letter = "A" | "B" | "C" | null

export interface Cell {
  row: number
  col: number
  letter: Letter
}

let gridRef: Cell[][] | null = null

export function setGrid(grid: Cell[][]) {
  gridRef = grid
}

function hasDebuff(row: number, col: number): boolean {
  if (!gridRef) return false
  const current = gridRef[row][col].letter
  if (!current) return false
  const dirs: [number, number][] = [[0,1],[0,-1],[1,0],[-1,0]]
  for (const [dr,dc] of dirs) {
    const nr = row+dr, nc = col+dc
    if (nr>=0 && nr<4 && nc>=0 && nc<4) {
      if (gridRef[nr][nc].letter) return true
    }
  }
  return false
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

export function boostPoints(): Decimal {
  if (!gridRef) return new Decimal(1)
  let mult = new Decimal(1)
  let countA = 0

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const cell = gridRef[r][c]
      if (cell.letter === "A") {
        countA++
        let effect = Decimal.pow(10, countA)
        const cornerCount = countCornerCs(r, c)
        if (cornerCount > 0) effect = effect.mul(Decimal.pow(2, cornerCount))
        if (hasDebuff(r, c)) effect = effect.sqrt()
        mult = mult.mul(effect)
      }
    }
  }
  return mult
}

export function boostFP(): Decimal {
  if (!gridRef) return new Decimal(1)
  let mult = new Decimal(1)
  let countB = 0

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const cell = gridRef[r][c]
      if (cell.letter === "B") {
        countB++
        let effect = Decimal.pow(2, countB)
        const cornerCount = countCornerCs(r, c)
        if (cornerCount > 0) effect = effect.mul(Decimal.pow(2, cornerCount))
        if (hasDebuff(r, c)) effect = effect.sqrt()
        mult = mult.mul(effect)
      }
    }
  }
  return mult
}
