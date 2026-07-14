import Decimal from "break_eternity.js"
import { reactive } from "vue"
import { player } from "../player"
import { farm } from 

export interface Crop {
  crop: string
  description: string
  growtime: () => Decimal
  amount: Decimal
  yield: () => Decimal
  effect: () => Decimal
  unlocked: () => boolean
}


export const crops: Crop[] = reactive([
  {
    crop: "Fundamental structions",
    description: "Boost amount of points by an exponent based on amount harvested",
    growtime() { return new Decimal("1560000") },
    amount: new Decimal(0),
    yield() { return new Decimal(1) },
    effect() { return this.amount.div(10) },
    unlocked() { return true }
  },
  {
    crop: "The Triplets",
    description: "Mono's boost to points is boosted, duo's generation is boosted and tri's focus is boosted based on amount harvested",
    growtime() { return new Decimal("49680000") },
    amount: new Decimal(0),
    yield() { return new Decimal(1) },
    effect() { return this.amount.pow(2) },
    unlocked() { return this.amount.gte(1) }
  },
  {
    crop: "Solarity essence",
    description: "",
    growtime() { return new Decimal("259200000") },
    amount: new Decimal(0),
    yield() { return new Decimal(1) },
    effect() { return this.amount.div(10) },
    unlocked() { return this.amount.gte(1) }
  },
])


export function plantCrop(row: number, col: number, cropIndex: number) {
  const field = farm[row][col]
  if (field.cropIndex !== null) return false
  if (cropIndex < 0 || cropIndex >= crops.length) return false

  field.cropIndex = cropIndex
  field.plantedAt = Date.now()
  return true
}

export function isCropReady(row: number, col: number): boolean {
  const field = farm[row][col]
  if (field.cropIndex === null || field.plantedAt === null) return false

  const crop = crops[field.cropIndex]
  const elapsed = Date.now() - field.plantedAt
  return elapsed >= crop.growtime().toNumber()
}

export function getGrowthProgress(row: number, col: number): number {
  const field = farm[row][col]
  if (field.cropIndex === null || field.plantedAt === null) return 0

  const crop = crops[field.cropIndex]
  const elapsed = Date.now() - field.plantedAt
  return Math.min(elapsed / crop.growtime().toNumber(), 1)
}

export function getRemainingTime(row: number, col: number): number {
  const field = farm[row][col]
  if (field.cropIndex === null || field.plantedAt === null) return 0

  const crop = crops[field.cropIndex]
  const elapsed = Date.now() - field.plantedAt
  return Math.max(crop.growtime().toNumber() - elapsed, 0)
}

export function harvestCrop(row: number, col: number): boolean {
  const field = farm[row][col]
  if (field.cropIndex === null || field.plantedAt === null) return false
  if (!isCropReady(row, col)) return false

  const crop = crops[field.cropIndex]
  crop.amount = crop.amount.add(crop.yield())

  field.cropIndex = null
  field.plantedAt = null
  return true
}

export function harvestAll(): Decimal {
  let harvested = new Decimal(0)
  for (let row = 0; row < farm.length; row++) {
    for (let col = 0; col < farm[row].length; col++) {
      const field = farm[row][col]
      if (field.cropIndex === null || field.plantedAt === null) continue
      if (!isCropReady(row, col)) continue

      const crop = crops[field.cropIndex]
      const y = crop.yield()
      crop.amount = crop.amount.add(y)
      harvested = harvested.add(y)

      field.cropIndex = null
      field.plantedAt = null
    }
  }
  return harvested
}

export function clearField(row: number, col: number) {
  farm[row][col] = { cropIndex: null, plantedAt: null }
}

export function synergyTick() {
  const fsPlots: { row: number; col: number }[] = []
  for (let row = 0; row < farm.length; row++) {
    for (let col = 0; col < farm[row].length; col++) {
      const field = farm[row][col]
      if (field.cropIndex !== null && crops[field.cropIndex].crop === "Fundamental structions") {
        fsPlots.push({ row, col })
      }
    }
  }
  if (fsPlots.length === 0) return

  for (const fs of fsPlots) {
    if (Math.random() < 0.01) {
      const neighbors = [
        { r: fs.row - 1, c: fs.col },
        { r: fs.row + 1, c: fs.col },
        { r: fs.row, c: fs.col - 1 },
        { r: fs.row, c: fs.col + 1 }
      ]
      for (const n of neighbors) {
        if (n.r < 0 || n.r >= farm.length || n.c < 0 || n.c >= farm[n.r].length) continue
        const neighborField = farm[n.r][n.c]
        if (neighborField.cropIndex === null) {
          const tripletsIndex = crops.findIndex(c => c.crop === "The Triplets")
          if (tripletsIndex !== -1) {
            neighborField.cropIndex = tripletsIndex
            neighborField.plantedAt = Date.now()
            console.log(`Triplets auto-planted at (${n.r}, ${n.c}) from FS synergy!`)
            break
          }
        }
      }
    }
  }
}

setInterval(synergyTick, 5000)
