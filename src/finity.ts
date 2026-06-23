import { reactive } from "vue";
import Decimal from "break_eternity.js";
import { player } from "./main";
import type { upgrades } from "./main";
import { formatNumber } from "./format";
export function canResetFinity(): boolean {
  if (player.FCo.inFinalCorruption) return false
  return player.finity.unlocked && player.maincurrencies.Points.gte(player.finity.requirement);
}

export function FPgain() {
  let gain = new Decimal('1')
  gain = player.maincurrencies.Points.div(1e14).pow(0.25)
  if(player.pupgrades[15].bought) gain = gain.mul(1.5)
  if(player.pupgrades[16].bought) gain = gain.mul(player.pupgrades[16].effect?.() ?? new Decimal("1"))
  if(player.repeatableUpgrades[2].amountbought.gte(1)) gain = gain.mul(player.repeatableUpgrades[2].effect?.() ?? new Decimal("1"))
  if(player.pupgrades[21].bought) gain = gain.mul(10)
  return gain
}

export function resetFinity() {
  if (canResetFinity()) {
    player.maincurrencies.FP = player.maincurrencies.FP.add(FPgain())
    player.maincurrencies.Points = new Decimal(0);
    player.finity.amount = player.finity.amount.add(1);
    player.pupgrades.forEach((u: upgrades) => {
  u.bought = false
})
    player.mattergens.mono = new Decimal('0')
    player.mattergens.duo = new Decimal('0')
    player.mattergens.tri = new Decimal('0')
    player.mattergens.ML = new Decimal('0')
    player.mattergens.DL = new Decimal('0')
    player.mattergens.TL = new Decimal('0')
    player.mattergens.Dgen = new Decimal('0')
    player.mattergens.Tgen = new Decimal('0')
    player.mattergens.Mfocus = false
    player.mattergens.Dfocus = false
    player.mattergens.Tfocus = false
  }
}

export function requirelessfinity() {
  player.maincurrencies.Points = new Decimal(0);
    player.finity.amount = player.finity.amount.add(1);
    player.pupgrades.forEach((u: upgrades) => {
  u.bought = false
})
    player.mattergens.mono = new Decimal('0')
    player.mattergens.duo = new Decimal('0')
    player.mattergens.tri = new Decimal('0')
    player.mattergens.ML = new Decimal('0')
    player.mattergens.DL = new Decimal('0')
    player.mattergens.TL = new Decimal('0')
    player.mattergens.Dgen = new Decimal('0')
    player.mattergens.Tgen = new Decimal('0')
    player.mattergens.Mfocus = false
    player.mattergens.Dfocus = false
    player.mattergens.Tfocus = false
}
export const fupgrades = reactive([
  {
    id: "0",
    title: "Finitely",
    description: "x2 point gain and all matterions gain ASWELL as mono's boost to points.",
    cost: new Decimal('1'),
    bought: false,
  },
  {
    id: "1",
    title: "Corruption",
    description: "Unlock corruption. Autobuy matterion upgrades",
    cost: new Decimal('2'),
    bought: false,
  },
  {
    id: "2",
    title: "Expansive.",
    description: "^1.1 mono's generation",
    cost: new Decimal('6'),
    bought: false,
  },
  {
    id: "3",
    title: "Sense of presence",
    description: "He observes you. ^1.1 and x10 points",
    cost: new Decimal('20'),
    bought: false,
  },
  {
    id: "4",
    title: "Loss of words",
    description: "Basically another way of saying i have no idea what to name these upgrades. Tri's generation when focused is boosted by x10",
    cost: new Decimal('100'),
    bought: false,
  },
  {
    id: "5",
    title: "Overcoming corruption",
    description: "x10 corruption point gain, x10 points",
    cost: new Decimal('400'),
    bought: false,
  },
  {
    id: "6",
    title: "THE GREATEST PUSH",
    description: "UNLOCK THE CITADEL OF CORRUPTION. (Requires heavy grinding!)",
    cost: new Decimal('1e8'),
    bought: false,
  },
  {
    id: "7",
    title: "Some help",
    description: "Based on FP, boost points ",
    cost: new Decimal("1e18"),
    effect() {
      return player.maincurrencies.FP.log10().pow(0.5)
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect?.() ?? new Decimal(1)) + " points"
    },
    bought:false
  }
])
export function buyFpUpgrade(index: number) {
  const def = fupgrades[index]
  const state = player.fupgrades[index]

  if (!state.bought && player.maincurrencies.FP.gte(def.cost)) {
    player.maincurrencies.FP = player.maincurrencies.FP.sub(def.cost)
    state.bought = true
  }
}

