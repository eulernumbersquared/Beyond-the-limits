import Decimal from "break_eternity.js"
import { reactive } from "vue"
import { farm } from "./thisfileisheretomakeFoIwork"
import { ELs } from "./EL"

// femboy certified code (please help me)
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
    growtime() { 
      let base = new Decimal("15600000")
      if(ELs[4].effect().gte(1)) base = base.div(ELs[4].effect())
      return base
     },
    amount: new Decimal(0),
    yield() { 
      let base = new Decimal("1")
      if(ELs[5].effect().gte(1)) base = base.mul(ELs[5].effect())
      return base
     },
    effect() { return this.amount.div(100).add(1) },
    unlocked() { return true }
  },
  {
    crop: "The Triplets", // this is not a terraria reference go away
    description: "Mono's boost to points is boosted, duo's generation is boosted and tri's focus is boosted based on amount harvested",
    growtime() { 
      let base = new Decimal("49680000")
      if(ELs[4].effect().gte(1)) base = base.div(ELs[4].effect())
      return base
     },
    amount: new Decimal(0),
        yield() { 
      let base = new Decimal("1")
      if(ELs[5].effect().gte(1)) base = base.mul(ELs[5].effect())
      return base
     },
    effect() { return this.amount.pow(1.1) },
    unlocked() { return this.amount.gte(1) }
  },
  {
    crop: "Solarity essence",
    description: "Boost solarity energy.",
    growtime() { 
      let base = new Decimal("259200000")
      if(ELs[4].effect().gte(1)) base = base.div(ELs[4].effect())
      return base
     },
    amount: new Decimal(0),
        yield() { 
      let base = new Decimal("1")
      if(ELs[5].effect().gte(1)) base = base.mul(ELs[5].effect())
      return base
     },
    effect() { return this.amount.div(10).add(1) },
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
export function removeCrop(row: number, col: number): boolean {
  const field = farm[row][col]

  if (field.cropIndex === null) return false

  field.cropIndex = null
  field.plantedAt = null

  console.log(`Crop removed at (${row}, ${col})`)
  return true
}

export function synergyTick() {
  const fsPlots: { row: number; col: number }[] = []

  // Find all Fundamental structions
  for (let row = 0; row < farm.length; row++) {
    for (let col = 0; col < farm[row].length; col++) {
      const field = farm[row][col]

      if (
        field.cropIndex !== null &&
        crops[field.cropIndex].crop === "Fundamental structions"
      ) {
        fsPlots.push({ row, col })
      }
    }
  }

  if (fsPlots.length === 0) return

  for (const fs of fsPlots) {
    if (Math.random() < 0.01) { // 0.01
      const neighbors = [
        { r: fs.row - 1, c: fs.col },
        { r: fs.row + 1, c: fs.col },
        { r: fs.row, c: fs.col - 1 },
        { r: fs.row, c: fs.col + 1 },
      ]

      for (const n of neighbors) {
        if (
          n.r < 0 ||
          n.r >= farm.length ||
          n.c < 0 ||
          n.c >= farm[n.r].length
        )
          continue

        const field = farm[n.r][n.c]

        if (field.cropIndex === null) {
          const tripletsIndex = crops.findIndex(
            c => c.crop === "The Triplets"
          )

          if (tripletsIndex !== -1) {
            field.cropIndex = tripletsIndex
            field.plantedAt = Date.now()

            console.log(
              `Triplets auto-planted at (${n.r}, ${n.c}) from FS synergy!`
            )

            break
          }
        }
      }
    }
  }

  // Check if any Fundamental structions is adjacent to a Triplets
  let hasSynergy = false

  for (const fs of fsPlots) {
    const neighbors = [
      { r: fs.row - 1, c: fs.col },
      { r: fs.row + 1, c: fs.col },
      { r: fs.row, c: fs.col - 1 },
      { r: fs.row, c: fs.col + 1 },
    ]

    for (const n of neighbors) {
      if (
        n.r < 0 ||
        n.r >= farm.length ||
        n.c < 0 ||
        n.c >= farm[n.r].length
      )
        continue

      const field = farm[n.r][n.c]

      if (
        field.cropIndex !== null &&
        crops[field.cropIndex].crop === "The Triplets"
      ) {
        hasSynergy = true
        break
      }
    }

    if (hasSynergy) break
  }

  // Spawn Solary Essence if the synergy exists
  if (hasSynergy && Math.random() < 0.001) {
    const solarityIndex = crops.findIndex(
      c => c.crop === "Solarity essence"
    )

    if (solarityIndex !== -1) {
      for (let row = 0; row < farm.length; row++) {
        for (let col = 0; col < farm[row].length; col++) {
          const field = farm[row][col]

          if (field.cropIndex === null) {
            field.cropIndex = solarityIndex
            field.plantedAt = Date.now()

            console.log(
              `Solary essence spawned at (${row}, ${col})!`
            )

            return
          }
        }
      }
    }
  }
}
setInterval(synergyTick, 5000)
