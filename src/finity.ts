import { reactive } from "vue";
import Decimal from "break_eternity.js";
import { player } from "./player";
import type { upgrades } from "./player";
import { formatNumber } from "./format";
import { ELs } from "./infinity/EL";
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
  if(player.infinity.calamitytier.gte(2)) gain = gain.mul(0)
  if(player.infinity.calamitytier.gte(1)) gain = gain.pow(player.fupgrades[9].effect?.() ?? new Decimal("1"))
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
    cost: new Decimal("1e15"),
    effect(): Decimal {
      return player.maincurrencies.FP.log10().pow(0.5)
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect?.() ?? new Decimal(1)) + " points"
    },
    bought:false,
  },
  {
    id: "8",
    title: "Roadblock",
    description: "How about you get calamity tier 1 before you can actually get this?",
    cost: new Decimal("1e33333333333"),
    bought: false,
  },
    {
    id: "9",
    title: "A",
    description: "Welcome back again. A's effect can also boost FP at the same rate",
    effect() {
      return ELs[0].effect().pow(0.95)
    },
    effectDisplay() {
      return "Currently ^" + formatNumber(this.effect?.() ?? new Decimal(1)) + " FP"
    },
    cost: new Decimal("5e19"),
    bought: false,
  },
  {
    id: "10",
    title: "Astrum potens.",
    description: "Scary latin name, D's effect boosts both solars and lunars at a reduced rate.",
    effect() {
      return ELs[3].effect()
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect?.() ?? new Decimal(1)) + " to both solars and lunars"
    },
    cost: new Decimal("1e39"),
    bought: false,
  },
    {
    id: "11",
    title: "Reference?",
    description: "Unlock hadronic matter. A feature related to the finity but is in the infinity tab.",
    cost: new Decimal("1e64"),
    bought: false,
  },
])
export function buyFpUpgrade(index: number) {
  const def = fupgrades[index]
  const state = player.fupgrades[index]

  if (!state.bought && player.maincurrencies.FP.gte(def.cost)) {
    player.maincurrencies.FP = player.maincurrencies.FP.sub(def.cost)
    state.bought = true
  }
}

