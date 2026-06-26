import Decimal from "break_eternity.js"
import { player } from "./main"
import { DCboost } from "./Decorr"
import { pupgrades } from "./points"

export function gainCM() {
  if (player.FCo.inFinalCorruption && pupgrades[9].bought) {
    let gain = player.maincurrencies.Points.gt(0)
      ? player.maincurrencies.Points.log10().abs().pow(0.01).mul(0.01)
      : new Decimal(0)

    if (player.pupgrades[10].bought) {
      gain = gain.mul(pupgrades[10].effect?.() ?? new Decimal(1))

    }
    if (player.pupgrades[14].bought) {
      gain = gain.mul(10)
    }
    if (player.DCs?.DCprecent?.gte(1)) {
      gain = gain.mul(DCboost())

    }

    return gain
  }
  return new Decimal(0)
}

export function boost() {
    if (player.FCo.inFinalCorruption && player.pupgrades[9].bought) {
        let boost = player.CM.CM.pow(1.5).mul(10).add(1)

        return boost
    }
    return new Decimal(1)
}

