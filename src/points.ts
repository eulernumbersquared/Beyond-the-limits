import { reactive, computed } from "vue"
import Decimal from "break_eternity.js"
import { player } from "./main"
import { monoboost } from "./matterions"
import { formatNumber } from "./format"
import { boost } from "./CM"
import type { upgrades } from "./main"
import type { RepeatableUpgrade } from "./main"
import { pointupgrepenabled } from "./settings"
import { solarenergyboost } from "./infinity/infinity"

export function pointgen(): Decimal {
  let gain = new Decimal(1)

  const safeLog10 = (x: Decimal) => x.gt(0) ? x.log10() : new Decimal(0)

  if (player.pupgrades[0]?.bought) gain = gain.mul(2)
  if (player.pupgrades[1]?.bought) gain = gain.mul(3)

  if (player.mattergens.ML.gte(1)) gain = gain.mul(monoboost())

  if (player.pupgrades[5]?.bought) gain = gain.mul(player.pupgrades[5].effect?.() ?? 1)
  if (player.pupgrades[7]?.bought) gain = gain.mul(player.pupgrades[7].effect?.() ?? 1)
  if (player.pupgrades[9]?.bought) gain = gain.mul(player.pupgrades[9].effect?.() ?? 1)
  if (player.pupgrades[12]?.bought) {
    gain = gain.gt(0) ? gain.pow(1.15) : gain
  }

  if (player.fupgrades[0]?.bought) gain = gain.mul(2)
  if (player.fupgrades[3]?.bought) {
    gain = gain.gt(0) ? gain.pow(1.1) : gain
    gain = gain.mul(10)
  }

  if (!player.corrupt.Incorruption) {
    gain = gain.mul(safeLog10(player.corrupt.Cpoints).add(1))
  } else {
    gain = gain.gt(0) ? gain.pow(0.5) : gain
  }
  
  if (player.pupgrades[17]?.bought) gain = gain.mul(5)
  if (player.pupgrades[18]?.bought) gain = gain.mul(player.pupgrades[18].effect?.() ?? 1)
  if (player.repeatableUpgrades[0]?.amountbought?.gte(1)) {
    const eff = player.repeatableUpgrades[0].effect?.()
    if (eff && eff.isFinite()) gain = gain.mul(eff)
  }
  if (player.pupgrades[20]?.bought) gain = gain.mul(player.pupgrades[20].effect?.() ?? 1)
  
  if (player.FCo.inFinalCorruption) {
    gain = gain.mul(0.1)
    if (player.pupgrades[2]?.bought && gain.gt(0)) gain = gain.pow(1.5)
    if (player.pupgrades[3]?.bought && gain.gt(0)) gain = gain.pow(1.2)
    if (player.pupgrades[4]?.bought) gain = gain.mul(100)
    if (player.pupgrades[8]?.bought && gain.gt(0)) gain = gain.pow(1.1)
    if (player.pupgrades[9]?.bought && player.CM.CM.gte(0)) {
      const b = boost()
      if (b && b.isFinite()) gain = gain.mul(b)
    }
    if (player.pupgrades[13]?.bought) gain = gain.mul(100)
    if (player.pupgrades[15]?.bought) gain = gain.mul(5)
  }

  if(player.gods.god1com) { gain = gain.pow(1.5)}
  if(player.gods.god1com) { gain = gain.times(10)}

  if (player.pupgrades[22].bought) { gain = gain.times('1e20')}
  if (player.pupgrades[23].bought) { gain = gain.pow(1.2)}
  if (player.pupgrades[24].bought) {gain = gain.mul(1e65)}
  if (player.fupgrades[7]?.bought) { gain = gain.mul(player.fupgrades[7].effect?.() ?? 1)}
  if (player.iupgrades[0]?.bought && player.infinity.solarity.solarenergy.gte(0.0001)) { gain = gain.mul(solarenergyboost())}
  return gain.isFinite() && !gain.isNan() ? gain : new Decimal(1)
}
export const pupgrades: upgrades[] = reactive([
  { id: "0", title: "Welcome!", description: "Multiply points by 2", cost: new Decimal(1), bought: false, pointboost: true, },
  { id: "1", title: "Gaming", description: "x3 more points", cost: new Decimal(10), bought: false, pointboost: true, },
  { id: "2", title: "New feature already?", description: "Unlock the matterions", cost: new Decimal(100), bought: false },
  { id: "3", title: "Damn", description: "x5 mon-matterion. Unlock 'Matterion-Focus'", cost: new Decimal(10000), bought: false },
  { id: "4", title: "It matters!", description: "Boost mono's generation from duo by x10.", cost: new Decimal("5e5"), bought: false },

  {
    id: "5",
    title: "Let them grow.",
    description: "Duo now boosts points at a reduced rate.",
    cost: new Decimal("1.5e6"),
    bought: false,
    effect() {
      if (player.FCo.inFinalCorruption) {
        return player.maincurrencies.Points.log10().pow(0.5).add(1)
      }
      return player.mattergens.duo.pow(0.2).add(1)
    },
    effectDisplay() {
      return "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") + " points"
    },
    pointboost: true,
  },

  {
    id: "6",
    title: "Reversal",
    description: "Points boost mono's generation at a reduced rate.",
    cost: new Decimal("5e7"),
    bought: false,
    effect() {
      if (player.FCo.inFinalCorruption) {
        return player.repeatableUpgrades[0].amountbought.pow(0.5)
      }
      return player.maincurrencies.Points.gt(0)
        ? player.maincurrencies.Points.log10().pow(0.1).add(1)
        : new Decimal(1)
    },
    effectDisplay() {
      return "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") +
        (player.FCo.inFinalCorruption ? " to points" : " to mono's production")
    }
  },

  {
    id: "7",
    title: "Self-respect",
    description: "Points boost themselves",
    cost: new Decimal("2e8"),
    bought: false,
    effect() {
      if (player.FCo.inFinalCorruption) {
        return player.maincurrencies.Points.log(5).pow(0.5).add(1)
      }
      return player.maincurrencies.Points.gt(0)
        ? player.maincurrencies.Points.log10().pow(0.5).add(1)
        : new Decimal(1)
    },
    effectDisplay() {
      return "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") + " to points"
    },
    pointboost: true,
  },

  { id: "8", title: "Change of pace", description: "Increase mono's effect by x5", cost: new Decimal("5e8"), bought: false },

  {
    id: "9",
    title: "Tri-forcal boost",
    description: "Tri boosts points",
    cost: new Decimal("3e9"),
    bought: false,
    effect() {
      return player.mattergens.tri.pow(0.25).add(1)
    },
    effectDisplay() {
      return "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") + " to points"
    },
    pointboost: true,
  },

  {
    id: "10",
    title: "Tri's comeback",
    description: "Focusing on tri generates more tri based on levels",
    cost: new Decimal("2e10"),
    bought: false,
    effect() {
      if (player.FCo.inFinalCorruption) {
        return player.repeatableUpgrades[0].effect?.()?.pow(0.25).add(1)
      }
      return new Decimal(1)
    },
    effectDisplay() {
      return player.FCo.inFinalCorruption
        ? "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") + " to corrupted matter"
        : ""
    }
  },

  {
    id: "11",
    title: "Monochromatic",
    description: "Boost mono's boost to points based on its own levels",
    cost: new Decimal("3e10"),
    bought: false,
    effect() {
      return player.mattergens.ML.pow(0.2).add(1)
    },
    effectDisplay() {
      return "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") + " to mono's effect"
    }
  },

  { id: "12", title: "Fast.", description: "^1.1 points", cost: new Decimal("2e11"), bought: false, pointboost: true, },

  {
    id: "13",
    title: "Eternal.",
    description: "Duo's effect of generating mono is increased based on points",
    cost: new Decimal("5e13"),
    bought: false,
    effect() {
      if (player.FCo.inFinalCorruption) {
        return new Decimal(100)
      }
      return player.maincurrencies.Points.gt(0)
        ? player.maincurrencies.Points.log10().pow(0.5).add(1)
        : new Decimal(1)
    },
    pointboost: true, 
    effectDisplay() {
      return "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") +
        (player.FCo.inFinalCorruption ? " points" : " to duo's effect")
    }
  },

  { id: "14", title: "Finite.", description: "Unlock the finity.", cost: new Decimal("1e14"), bought: false },
  { id: "15", title: "The new era", description: "x1.5 FP (finity points)", cost: new Decimal("1e16"), bought: false, FPboost: true, },

  {
    id: "16",
    title: "Corrupted finity",
    description: "Based on best points in corruption, gain more FP",
    cost: new Decimal("1e18"),
    bought: false,
    effect() {
      if (player.FCo.inFinalCorruption) {
        return new Decimal(1)
      }
      return player.corrupt.BPiC.pow(0.1).add(1)
    },
    effectDisplay() {
      return player.FCo.inFinalCorruption
        ? "Unlock the De-corruptionizer"
        : "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") + " FP gain"
    },
    FPboost: true,
  },

  { id: "17", title: "Pushing the limits.", description: "x5 points", cost: new Decimal("2.5e19"), bought: false, pointboost: true },

  {
    id: "18",
    title: "Converging to corruption",
    description: "Further boost points based on corruption points",
    cost: new Decimal("5e20"),
    bought: false,
    effect() {
      if (player.FCo.inFinalCorruption) {
        return new Decimal("1F1e300")
      }
      return player.corrupt.Cpoints.pow(0.25).add(1)
    },
    effectDisplay() {
      return player.FCo.inFinalCorruption
        ? ""
        : "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") + " to points"
    },
    pointboost: true,
  },

  { id: "19", title: "Infinite nature.", description: "Unlock the infinite buyables.", cost: new Decimal("3e22"), bought: false },

  {
    id: "20",
    title: "Ascension",
    description: "Based on repeatables bought, boost points",
    cost: new Decimal("1e25"),
    bought: false,
    effect() {
      let rep0 = player.repeatableUpgrades[0].amountbought.add(1)
      let rep1 = player.repeatableUpgrades[1].amountbought.add(1)
      let rep2 = player.repeatableUpgrades[2].amountbought.add(1)
      return rep0.mul(rep1.mul(rep2)).pow(0.5)
    },
    effectDisplay() {
      return "Currently x" + (this.effect?.()?.toFixed(2) ?? "1") + " to points"
    },
    pointboost: true,
  },

  { id: "21", title: "The final push.", description: "x10 FP.", cost: new Decimal("1e33"), bought: false, FPboost: true },

  { 
    id: "22",
    title: "Welcome back.",
    description: "Hi! x1e20 points!!",
    cost: new Decimal('1e66'),
    bought: false,
    pointboost: true,
  },
  {
    id: "23",
    title: "Hope the automation is nice!",
    description: "It's nice isn't it? ^1.2 points",
    cost: new Decimal('1e123'),
    bought: false,
    pointboost: true,
  },
  {
    id: "24",
    title: "Ascension to infinity",
    description: "x1e65 points... you wont be seeing new upgrades in points for a while",
    cost: new Decimal("1e172"),
    bought: false,
    pointboost: true,
  }
])

export const upgradeDescriptions = computed(() => {
  return player.pupgrades.map((u, i) => {
    if (i === 2) {
      if (player.FCo.inFinalCorruption) {
        return "<s>Unlock matterions</s> Since matterions are corrupted, gain ^1.5 points!"
      }
      return "Unlock matterions"
    }
    if (i === 3) {
      if(player.FCo.inFinalCorruption) {
        return "<s>x5 mon-matterion. Unlock 'Matterion-Focus'</s> I'm so nice am i? ^1.2 points."
      }
    }
    if (i === 4) {
      if (player.FCo.inFinalCorruption) {
        return "Im too lazy to do that cross-out effect. Uhh, i guess x100 points?"
      }
    }
    if (i === 5) {
        if (player.FCo.inFinalCorruption) {
            return "Apparently, many things are boosted by matterions. Too bad matterions are disabled! Points boost themselves."
        }
    }
    if (i === 6) {
        if(player.FCo.inFinalCorruption) {
            return "Oh yea! Finity is disabled while your in the final corruption, based on amount of repeatable upgrade 1 bought, gain EVEN more points."
        }
    }
    if (i === 7) {
        if(player.FCo.inFinalCorruption) {
            return "Finally! An upgrade which i dont have to change! Points boost themselves again."
        }
    }
    if (i === 8) {
        if(player.FCo.inFinalCorruption) {
            return "Can we just get to 1e308 points already? I'm getting tired of making these upgrades... ^1.1 points"
        }
    }
    if (i === 9) {
        if(player.FCo.inFinalCorruption) {
            return "Unlock corrupted matter. (Finally amirite?)"
        }
    }
    if (i === 10) {
        if(player.FCo.inFinalCorruption) {
            return "Because it can, repeatable upgrade 1 boosts corrupted matter at a reduced rate."
        }
    }
    if (i === 11) {
        if(player.FCo.inFinalCorruption) {
            return "This one does NOTHING! That's right, NOTHING!"
        }
    }
    if (i === 13) {
        if(player.FCo.inFinalCorruption) {
            return "Plain x100 points."
        }
    }
    if (i === 14) {
        if(player.FCo.inFinalCorruption) {
            return "Reminder that finity is disabled. x10 corrupted matter for your troubles!"
        }
    }
    if (i === 15) {
        if(player.FCo.inFinalCorruption) {
            return "Really? The new era? Seems like a corrupted one. Anyways x5 points."
        }
    }
    if (i === 16) {
        if(player.FCo.inFinalCorruption) {
            return "I think its time we finally end this. Unlock the <i>De-corruptionizer<\i>"
        }
    }
    if (i === 17) {
        if(player.FCo.inFinalCorruption) {
            return "You can buy this upgrade if you wanna but <i> it basically has no use at this point.</i>"
        }
    }
    if (i === 18) {
        if(player.FCo.inFinalCorruption) {
            return "Sorry! I'm not allowing you to buy this upgrade! It's way too broken, so the cost has been <i>nullified</i>"
        }
    }
    return u.description
  })
})


export const repeatableUpgrades = reactive<RepeatableUpgrade[]>([
  {
    id: "0",
    title: "Finite points",
    description: "Gain x1.2 points per upgrade bought",
    amountbought: new Decimal(0),
    basecost: new Decimal("1e22"),
    cost: new Decimal("1e22"),
    scaling() {
      const amt = this.amountbought
      let scale = this.basecost.mul(Decimal.pow(1.5, amt))
      if (amt.gt(50)) scale = scale.mul(Decimal.pow(2, amt.sub(50)))
      return scale
    },
    pointboost: true,
    effect() {
      return Decimal.pow(1.2, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    }
  },
  {
    id: "1",
    title: "Eternal corruption",
    description: "Boost corruption point gain by x1.2 per upgrade bought",
    amountbought: new Decimal(0),
    basecost: new Decimal("2e23"),
    cost: new Decimal("2e23"),
    scaling() {
      const amt = this.amountbought
      let scale = this.basecost.mul(Decimal.pow(1.75, amt))
      if (amt.gt(25)) scale = scale.mul(Decimal.pow(2, amt.sub(25)))
      return scale
    },
    CPointsboost: true,
    effect() {
      return Decimal.pow(1.5, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    }
  },
  {
    id: "2",
    title: "Below infinity",
    description: "Gain x1.1 FP per upgrade bought",
    amountbought: new Decimal(0),
    basecost: new Decimal("1e24"),
    cost: new Decimal("1e24"),
    scaling() {
      const amt = this.amountbought
      let scale = this.basecost.mul(Decimal.pow(2, amt))
      if (amt.gte(20)) scale = scale.mul(Decimal.pow(2, amt.sub(20)))
      return scale
    },
    FPboost: true,
    effect() {
      return Decimal.pow(1.1, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    }
  }
])
export function buyUpgrade(index: number | string) {
  const idx = Number(index)
  const upg = player.pupgrades[idx]
  if (!upg) return

  const effectiveCost = player.FCo.inFinalCorruption
    ? upgradeCosts.value[idx]
    : upg.cost

  if (!upg.bought && player.maincurrencies.Points.gte(effectiveCost)) {
    player.maincurrencies.Points = player.maincurrencies.Points.sub(effectiveCost)
    upg.bought = true

    if (idx === 14) player.finity.unlocked = true
    if (idx === 16 && player.FCo.inFinalCorruption) player.DCs.DCunlocked = true
    if (idx === 9 && player.FCo.inFinalCorruption) player.CM.CMunlocked = true
  }
}


export function getRepeatableCost(upg: RepeatableUpgrade): Decimal {
  if (player.FCo.inFinalCorruption) {
    if (upg.id === "0") {
      const amt = upg.amountbought
      
      let scale = new Decimal(1).mul(Decimal.pow(1.5, amt))
      if (amt.gt(50)) scale = scale.mul(Decimal.pow(2, amt.sub(50)))
      return scale
    }
    if (upg.id === "1") {
      return new Decimal(10)
    }
  }
  return upg.scaling()
}



export function buyRepeatable(upg: RepeatableUpgrade) {
  const nextCost = getRepeatableCost(upg)
  if (player.maincurrencies.Points.gte(nextCost)) {
    player.maincurrencies.Points = player.maincurrencies.Points.sub(nextCost)
    upg.amountbought = upg.amountbought.add(1)
  }
}

export function resetRepeatableCosts() {
  for (const upg of player.repeatableUpgrades) {
    upg.cost = getRepeatableCost(upg)
  }
}



export function autoBuyAll() {
  if (!pointupgrepenabled.value) return
  if (!player.gods.god1com) return
  for (let i = 0; i < player.pupgrades.length; i++) {
    const upg = player.pupgrades[i]
    const cost = player.FCo.inFinalCorruption ? upgradeCosts.value[i] : upg.cost


    if (!upg.bought && player.maincurrencies.Points.gte(cost)) {
      buyUpgrade(i)
    } else {
    }
  }

  
  for (const upg of player.repeatableUpgrades) {
    let nextCost = upg.scaling()

    while (player.maincurrencies.Points.gte(nextCost)) {
      player.maincurrencies.Points = player.maincurrencies.Points.sub(nextCost)
      upg.amountbought = upg.amountbought.add(1)
      upg.cost = upg.scaling()
      nextCost = upg.cost
    }
  }
}
export const upgradeCosts = computed(() => {
  return player.pupgrades.map((u, i) => {
    if (player.FCo.inFinalCorruption) {
      if (i === 4) return new Decimal(15000)
        if (i === 6) return new Decimal(1e12)
        if (i === 7) return new Decimal(5e12)
        if(i === 8) return new Decimal(1.5e13)
        if(i === 9) return new Decimal(1e15)
        if(i === 10) return new Decimal(1e17)
        if(i === 11) return new Decimal(1e19)
        if(i === 12) return new Decimal(7.5e19)
        if(i === 13) return new Decimal(1e21)
        if(i === 14) return new Decimal(1e25)
        if(i === 15) return new Decimal('2e26')
        if(i === 16) return new Decimal('1e28')
        if(i === 18) return new Decimal('1F300')
    }
    return u.cost
  })
})
