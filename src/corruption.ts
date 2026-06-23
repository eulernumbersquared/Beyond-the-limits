import Decimal from "break_eternity.js"
import { requirelessfinity, fupgrades } from "./finity"
import { player } from "./main"

export function enterCorruption() {
  if (fupgrades[1].bought) {
    player.corrupt.Incorruption = true
    requirelessfinity()
  }
}

export function exitCorruption() {
  if (player.corrupt.Incorruption) {
    player.corrupt.Incorruption = false
    requirelessfinity()
  }
}

export function trackCorruptionPoints() {
  if (player.corrupt.Incorruption && player.maincurrencies.Points.gt(player.corrupt.BPiC)) {
    player.corrupt.BPiC = player.maincurrencies.Points
  }
}

export function corruptionTick() {
  let gain = player.corrupt.BPiC.pow(0.5)
  if (fupgrades[5].bought) gain = gain.mul(10)
  if (player.repeatableUpgrades[1].amountbought.gte(1)) gain = gain.mul(player.repeatableUpgrades[1].effect?.() ?? new Decimal('1'))
  return gain
}

export function calculatepointboosting() {
  if (player.corrupt.Cpoints.gte(1)) {
    return player.corrupt.Cpoints.pow(0.3)
  }
  if (player.FCo.inFinalCorruption) { return new Decimal(1)}
  return new Decimal(1)
}

export function autoBPiC() {
  if (player.gods.god1com) {
    player.corrupt.BPiC = player.maincurrencies.Points.pow(1.0005)
  }
}