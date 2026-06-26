import Decimal from "break_eternity.js";
import { player } from "./main";
import { matterionAutomationEnabled } from "./settings"

export function focus() {
  if (player.mattergens.Mfocus) return "monofocus"
  if (player.mattergens.Dfocus) return "duofocus"
  if (player.mattergens.Tfocus) return "trifocus"
}

export function realityfocus() {
  switch (focus()) {
    case "monofocus":
      return true
    case "duofocus":
      player.mattergens.Dgen = player.mattergens.Dgen.mul(2)
      break
  }
}

export function monogen() {
  let gain = player.mattergens.duo.mul(player.mattergens.DL.mul(1.5))
  if (player.mattergens.DL.gt(0) && player.mattergens.duo.eq(0)) {
    gain = gain.add(player.mattergens.DL)
  }
  if (player.pupgrades[4].bought) gain = gain.mul(10)
  if (player.mattergens.Dfocus) gain = gain.mul(2)
  if (player.mattergens.Mfocus) gain = gain.mul(1.5)
  if (player.pupgrades[6].bought) gain = gain.mul(player.pupgrades[6].effect?.() || 1)
  if (player.pupgrades[13].bought) gain = gain.mul(player.pupgrades[13].effect?.() || 1)
  if (player.fupgrades[0]?.bought) gain = gain.mul(2)
  if (player.fupgrades[2]?.bought) gain = gain.pow(1.1)
  if (player.corrupt.Incorruption) gain = gain.mul(0)

  return gain
}

export function duogen() {
  let gain = new Decimal(0)
  if (player.mattergens.TL.gte(1)) {
    gain = gain.add(player.mattergens.tri.mul(player.mattergens.TL.mul(1.5)))
  }
  if (player.mattergens.TL.gt(0) && player.mattergens.tri.eq(0)) {
    gain = gain.add(player.mattergens.TL.mul(1))
  }
  if (player.mattergens.Tfocus) gain = gain.mul(2)
  if (player.mattergens.Mfocus) gain = gain.mul(1.5)
  if (player.fupgrades[0]?.bought) gain = gain.mul(2)
  if (player.corrupt.Incorruption) gain = gain.mul(0)

  return gain
}

export function trigen() {
  let gain = new Decimal(0)
  if (player.mattergens.Tfocus) {
    gain = gain.add(new Decimal(1))
    if (player.pupgrades[10].bought) gain = gain.add(player.mattergens.TL)
    if (player.fupgrades[0].bought) gain = gain.mul(2)
    if (player.fupgrades[4].bought) gain = gain.mul(10)
    if (player.corrupt.Incorruption) gain = gain.mul(0)
  }
  return gain
}

export function buyUpgrade(type: "mono" | "duo" | "tri") {
  switch (type) {
    case "mono": {
      const cost = getUpgradeCost("mono")
      if (player.maincurrencies.Points.gte(cost)) {
        player.maincurrencies.Points = player.maincurrencies.Points.sub(cost)
        player.mattergens.ML = player.mattergens.ML.add(1)
      }
      break
    }
    case "duo": {
      const cost = getUpgradeCost("duo")
      if (player.maincurrencies.Points.gte(cost)) {
        player.maincurrencies.Points = player.maincurrencies.Points.sub(cost)
        player.mattergens.DL = player.mattergens.DL.add(1)
      }
      break
    }
    case "tri": {
      const cost = getUpgradeCost("tri")
      if (player.maincurrencies.Points.gte(cost)) {
        player.maincurrencies.Points = player.maincurrencies.Points.sub(cost)
        player.mattergens.TL = player.mattergens.TL.add(1)
      }
      break
    }
  }
}

export function costlessmatterion(type: "mono" | "duo" | "tri") {
  switch (type) {
    case "mono": {
      const cost = getUpgradeCost("mono")
      if (player.maincurrencies.Points.gte(cost)) {
        player.mattergens.ML = player.mattergens.ML.add(1)
      }
      break
    }
    case "duo": {
      const cost = getUpgradeCost("duo")
      if (player.maincurrencies.Points.gte(cost)) {
        player.mattergens.DL = player.mattergens.DL.add(1)
      }
      break
    }
    case "tri": {
      const cost = getUpgradeCost("tri")
      if (player.maincurrencies.Points.gte(cost)) {
        player.mattergens.TL = player.mattergens.TL.add(1)
      }
      break
    }
  }
}

export function getUpgradeCost(type: "mono" | "duo" | "tri") {
  switch (type) {
    case "mono":
      return new Decimal(50).mul(
        Decimal.pow(1.1, player.mattergens.ML)
      )
    case "duo":
      return new Decimal(1000).mul(
        Decimal.pow(1.5, player.mattergens.DL.pow(1.15))
      )
    case "tri":
      return new Decimal(10000).mul(
        Decimal.pow(3, player.mattergens.TL.pow(1.2))
      )
  }
}

export function monoboost() {
  let boost = player.mattergens.mono.pow(0.15)
  if (player.mattergens.Mfocus) boost = boost.mul(2)
  boost = boost.mul(player.mattergens.ML.mul(1.5))
  boost = boost.add(player.mattergens.ML)
  if (player.pupgrades[8].bought) boost = boost.mul(5)
  if (player.pupgrades[11].bought) boost = boost.mul(player.pupgrades[11].effect?.() || 1)
  if (player.fupgrades[0].bought) boost = boost.mul(2)
  if (player.corrupt.Incorruption) boost = boost.pow(0)
  return boost
}


export function autobuymatterion() {
  if (!matterionAutomationEnabled.value) return
  if (player.corrupt.Incorruption) return
  if (player.fupgrades[1]?.bought && player.pupgrades[2].bought) {
    while (player.maincurrencies.Points.gte(getUpgradeCost("mono"))) {
      costlessmatterion("mono")
    }
    while (player.maincurrencies.Points.gte(getUpgradeCost("duo"))) {
      costlessmatterion("duo")
    }
    while (player.maincurrencies.Points.gte(getUpgradeCost("tri"))) {
      costlessmatterion("tri")
    }
  }
}
