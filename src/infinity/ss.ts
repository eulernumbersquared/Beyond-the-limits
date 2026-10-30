
import Decimal from "break_eternity.js"
import { player, repeatableupgradebutbetterlmao } from "../player"
import { reactive } from "vue"
import { formatNumber } from "../format"
import { ELs } from "./EL"
import { iupgrades } from "./infinity"
import { hindRepeats } from "./hind"

let battleInterval: ReturnType<typeof setInterval> | null = null

export function cegain() {
  let gain = new Decimal("0.01")
  gain = gain.mul(player.infinity.stats.stage.add(1))
  gain = gain.mul(ELs[7].effect())
  if(playerRepeat[3].effect().gte(1)) gain = gain.mul(playerRepeat[3].effect())
  if(cosmicRepeats[0].effect().gte(1)) gain = gain.mul(cosmicRepeats[0].effect())
  if(player.infinity.stats.SP.gte(1)) { gain = gain.mul(SPboost())}
  if(hindRepeats[0].effect().gte(1)) gain = gain.pow(hindRepeats[0].effect())
  return gain
}
export function calcdamage() {
  let base = player.infinity.calamen
  base = base.mul(playerRepeat[2].effect())
  if(cosmicRepeats[1].effect().gte(1)) base = base.mul(cosmicRepeats[1].effect())
  if(player.infinity.stats.SP.gte(1)) {   base = base.mul(SPboost())}
  if(iupgrades[8].bought) base = base.pow(1.2)
  if(hindRepeats[2].effect().gte(1)) base = base.pow(hindRepeats[2].effect())
  if(iupgrades[9].bought) base = base.pow(1.05)
    if(hindRepeats[4].effect().gte(1)) base = base.pow(hindRepeats[4].effect())

  return base
}
export function calcdefense() {
  let base = new Decimal("1")
  base = base.mul(playerRepeat[0].effect())
  if(player.infinity.stats.SP.gte(1)) { base = base.mul(SPboost())}
  return base
}

export function calcHP() {
  let base = new Decimal("100")
  base = base.mul(playerRepeat[1].effect())
  if(player.infinity.stats.SP.gte(1)) { base = base.mul(SPboost())}
  if(cosmicRepeats[5].effect().gte(1)) base = base.mul(cosmicRepeats[5].effect())
  return base
}
export function beatStage() {
  const stats = player.infinity.stats

  if (stats.stage.gt(stats.bestStage)) {
    stats.bestStage = stats.stage
  }

  stats.stage = stats.stage.add(1)
  generateEnemy()
}

export function generateEnemy() {
  const stage = player.infinity.stats.stage
  const enemy = player.infinity.enemy

  enemy.maxHP = new Decimal(250).mul(
    new Decimal(3).pow(stage)
  )
  if(player.infinity.stats.stage.gte(600)) {enemy.maxHP = enemy.maxHP.pow(4)}
  enemy.maxHP = enemy.maxHP.div(cosmicRepeats[2].effect())
  enemy.HP = enemy.maxHP

  enemy.DMG = new Decimal(10).mul(
    new Decimal(1.5).pow(stage)
  )
}

export function stopBattle() {
  if (battleInterval !== null) {
    clearInterval(battleInterval)
    battleInterval = null
  }
}

export function attackEnemy() {
  const stats = player.infinity.stats
  const enemy = player.infinity.enemy

  if (battleInterval !== null) return

  if (enemy.maxHP.lte(0)) {
    generateEnemy()
  }

  if (stats.HP.lte(0)) {
    stats.HP = stats.maxHP
    generateEnemy()
  }

  battleInterval = setInterval(() => {
    const damage = Decimal.max(stats.DMG, 1)

    enemy.HP = Decimal.max(
      enemy.HP.sub(damage),
      0
    )

    if (enemy.HP.lte(0)) {
      stopBattle()

      beatStage()

      stats.HP = stats.maxHP

      return
    }

    const enemyDamage = Decimal.max(enemy.DMG.sub(stats.Def), 1)

    stats.HP = Decimal.max(
      stats.HP.sub(enemyDamage),
      0
    )

    if (stats.HP.lte(0)) {
      stopBattle()
    }
  }, 250)
}

export function likeareallyfastattackenemyfunction() {
  const stats = player.infinity.stats
  const enemy = player.infinity.enemy

  if (battleInterval !== null) return

  if (enemy.maxHP.lte(0)) {
    generateEnemy()
  }

  if (stats.HP.lte(0)) {
    stats.HP = stats.maxHP
    generateEnemy()
  }

  battleInterval = setInterval(() => {
    const damage = Decimal.max(stats.DMG, 1)

    let bulkCount = 0
    const maxBulkStages = 100000

    while (
      enemy.HP.lte(damage) &&
      bulkCount < maxBulkStages
    ) {
      enemy.HP = new Decimal(0)

      stopBattle()
      beatStage()

      stats.HP = stats.maxHP
      bulkCount++

      if (enemy.HP.gt(damage)) break
    }

    if (battleInterval === null) {

      if (enemy.HP.gt(0)) {
        battleInterval = setInterval(() => {
          const currentDamage = Decimal.max(stats.DMG, 1)

          enemy.HP = Decimal.max(
            enemy.HP.sub(currentDamage),
            0
          )

          if (enemy.HP.lte(0)) {
            stopBattle()
            beatStage()
            stats.HP = stats.maxHP
            return
          }

          const currentEnemyDamage = Decimal.max(
            enemy.DMG.sub(stats.Def),
            1
          )

          stats.HP = Decimal.max(
            stats.HP.sub(currentEnemyDamage),
            0
          )

          if (stats.HP.lte(0)) {
            stopBattle()
          }
        }, 1)
      }

      return
    }

    enemy.HP = Decimal.max(
      enemy.HP.sub(damage),
      0
    )

    if (enemy.HP.lte(0)) {
      stopBattle()
      beatStage()
      stats.HP = stats.maxHP
      return
    }

    const enemyDamage = Decimal.max(
      enemy.DMG.sub(stats.Def),
      1
    )

    stats.HP = Decimal.max(
      stats.HP.sub(enemyDamage),
      0
    )

    if (stats.HP.lte(0)) {
      stopBattle()
    }
  }, 1)
}

export const playerRepeat = reactive<repeatableupgradebutbetterlmao[]>([ 
  {
    id: "0",
    title: "Calamity's defense",
    description: "Increase defense by x1.5",
    amountbought: new Decimal(0),
    basecost: new Decimal("1"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(2, this.amountbought)
    )

    if (this.amountbought.gt(30)) {
        scale = scale.mul(
            Decimal.pow(3.5, this.amountbought.sub(30))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(1.5, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
    {
    id: "1",
    title: "Calamity's health",
    description: "Increase HP by x2",
    amountbought: new Decimal(0),
    basecost: new Decimal("10"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(2.5, this.amountbought)
    )

    if (this.amountbought.gt(20)) {
        scale = scale.mul(
            Decimal.pow(4, this.amountbought.sub(20))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(2, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
      {
    id: "2",
    title: "Calamity's damage",
    description: "Increase damage by x1.5",
    amountbought: new Decimal(0),
    basecost: new Decimal("20"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(1.5, this.amountbought)
    )

    if (this.amountbought.gt(50)) {
        scale = scale.mul(
            Decimal.pow(3, this.amountbought.sub(50))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(1.5, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
  
      {
    id: "3",
    title: "Calamity's self-infliction",
    description: "Increase calamity energy by x2",
    amountbought: new Decimal(0),
    basecost: new Decimal("200"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(2.5, this.amountbought)
    )

    if (this.amountbought.gt(20)) {
        scale = scale.mul(
            Decimal.pow(3.5, this.amountbought.sub(20))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(2, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
])


export function buyPlayerRepeat(id: string) {

  const upgrade = playerRepeat.find(upg => upg.id === id)

  if (!upgrade) return

  const cost = upgrade.cost()

  if (player.infinity.calamen.lt(cost)) return

  player.infinity.calamen = player.infinity.calamen.sub(cost)
  upgrade.amountbought = upgrade.amountbought.add(1)
}

export function cosmicGain() {
  let gain = new Decimal("0")
  if(player.infinity.stats.stage.gte(30)) gain = gain.add(player.infinity.stats.stage.div(30).pow(1.5))
  if(cosmicRepeats[3].effect().gte(1)) gain = gain.mul(cosmicRepeats[3].effect())
  if(player.infinity.stats.SP.gte(1)) { gain = gain.mul(SPboost())}
  if(SPrepeats[0].effect().gte(1)) gain = gain.pow(SPrepeats[0].effect())
    if(hindRepeats[3].effect().gte(1)) gain = gain.pow(hindRepeats[3].effect())

    return gain
}

export function cosmicReset() {
  player.infinity.stats.CosP = player.infinity.stats.CosP.add(cosmicGain())
  if(player.infinity.stats.bestStage.gte(30)) {
    player.infinity.stats.stage = new Decimal(0)
    player.infinity.calamen = new Decimal(0)
    playerRepeat.forEach(g => {
      g.amountbought = new Decimal("0")
    });
  }
  generateEnemy()

}

export function requirelesscosmicReset() {
    player.infinity.stats.stage = new Decimal(0)
    player.infinity.calamen = new Decimal(0)
    playerRepeat.forEach(g => {
      g.amountbought = new Decimal("0")
    });
}


export const cosmicRepeats = reactive<repeatableupgradebutbetterlmao[]>([ 
  {
    id: "0",
    title: "Cosmical ascension",
    description: "Increase calamity energy gain by x10",
    amountbought: new Decimal(0),
    basecost: new Decimal("0.1"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(100, this.amountbought)
    )

    if (this.amountbought.gt(1000)) {
        scale = scale.mul(
            Decimal.pow(1000, this.amountbought.sub(30))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(10, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
  
  {
    id: "1",
    title: "The greatest soul.",
    description: "Increase damage by x5",
    amountbought: new Decimal(0),
    basecost: new Decimal("0.5"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(5, this.amountbought)
    )

    if (this.amountbought.gt(30)) {
        scale = scale.mul(
            Decimal.pow(7.5, this.amountbought.sub(30))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(5, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
    {
    id: "2",
    title: "Weakened soul.",
    description: "Reduce the enemy's base health by /1.2",
    amountbought: new Decimal(0),
    basecost: new Decimal("2"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(2, this.amountbought)
    )

    if (this.amountbought.gt(30)) {
        scale = scale.mul(
            Decimal.pow(5, this.amountbought.sub(30))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(1.2, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently /" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
  
    {
    id: "3",
    title: "Dicosmic.",
    description: "Increase CoSP (Cosmic points) gain by x3",
    amountbought: new Decimal(0),
    basecost: new Decimal("1"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(4, this.amountbought)
    )

    if (this.amountbought.gt(10)) {
        scale = scale.mul(
            Decimal.pow(10, this.amountbought.sub(10))
        )
    }
    if (this.amountbought.gt(100)) {
        scale = scale.mul(
            Decimal.pow(1e10, this.amountbought.sub(100))
        )
    }
    return scale
    },
    effect() {
      return Decimal.pow(3, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
          {
    id: "4",
    title: "Star's eternity",
    description: "Increase eternal energy by x5",
    amountbought: new Decimal(0),
    basecost: new Decimal("1000"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(15, this.amountbought)
    )

    if (this.amountbought.gt(20)) {
        scale = scale.mul(
            Decimal.pow(200, this.amountbought.sub(20))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(5, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
            {
    id: "5",
    title: "Rejuvenating soul.",
    description: "Increase max HP by x10",
    amountbought: new Decimal(0),
    basecost: new Decimal("600"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(10, this.amountbought)
    )

    if (this.amountbought.gt(10)) {
        scale = scale.mul(
            Decimal.pow(100, this.amountbought.sub(10))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(10, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
])

export function buyCosmicRepeat(id: string) {

  const upgrade = cosmicRepeats.find(upg => upg.id === id)

  if (!upgrade) return

  const cost = upgrade.cost()

  if (player.infinity.stats.CosP.lt(cost)) return

  player.infinity.stats.CosP = player.infinity.stats.CosP.sub(cost)
  upgrade.amountbought = upgrade.amountbought.add(1)
}

export function SPgain() {
  let gain = new Decimal("0")
  if(player.infinity.stats.stage.gte(70)) gain = gain.add(player.infinity.stats.stage.div(70).pow(1.5))
  if(player.infinity.stats.SP.gte(15)) gain = gain.mul(player.infinity.stats.CosP.add(1).pow(0.25))
    if(player.infinity.stats.SP.gte(1e130)) gain = gain.div("1e130").pow(0.5).mul("1e130")
    if(player.infinity.stats.SP.gte("1e1000")) gain = gain.div("1e1000").pow(0.05).mul("1e1000")

  if(hindRepeats[1].effect().gte(1)) gain = gain.mul(hindRepeats[1].effect())
    return gain
}

export function SPreset() {
  if(player.infinity.stats.stage.gte(70)) {
    player.infinity.stats.SP = player.infinity.stats.SP.add(SPgain())
    requirelesscosmicReset()
    cosmicRepeats.forEach(g => {
      g.amountbought = new Decimal("0")
    });
  }
  player.infinity.stats.CosP = new Decimal("0")
  generateEnemy()
}

export function SPboost() {
  let base = new Decimal("1")
  if(player.infinity.stats.SP.gte(1)) { 
    base = player.infinity.stats.SP
    base = base.mul(5).pow(1.25)
  }
  return base
}


export function autoBuyPlayerRepeats() {
  for (const upgrade of playerRepeat) {
    while (true) {
      const cost = upgrade.cost()

      if (player.infinity.calamen.lt(cost)) break

      upgrade.amountbought =
        upgrade.amountbought.add(1)
    }
  }
}

export const SPrepeats = reactive<repeatableupgradebutbetterlmao[]>([
  {
    id: "0",
    title: "Solar eruption",
    description: "Empower CoSP by 1.1",
    amountbought: new Decimal("0"),
    basecost: new Decimal("1e6"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(10, this.amountbought)
    )

    if (this.amountbought.gt(10)) {
        scale = scale.mul(
            Decimal.pow("1e200", this.amountbought.sub(10))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(1.1, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently ^" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
    {
    id: "1",
    title: "Entropic destruction",
    description: "Empower damage by 1.1",
    amountbought: new Decimal("0"),
    basecost: new Decimal("1e190"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow("1e10", this.amountbought)
    )

    if (this.amountbought.gt(10)) {
        scale = scale.mul(
            Decimal.pow("1e1000", this.amountbought.sub(10))
        )
    }

    return scale
    },
    effect() {
      return Decimal.pow(1.1, this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently ^" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
])

export function buySPRepeat(id: string) {

  const upgrade = SPrepeats.find(upg => upg.id === id)

  if (!upgrade) return

  const cost = upgrade.cost()

  if (player.infinity.stats.SP.lt(cost)) return

  player.infinity.stats.SP = player.infinity.stats.SP.sub(cost)
  upgrade.amountbought = upgrade.amountbought.add(1)
}

export function autoBuyCoSPRepeats() {
  for (const upgrade of cosmicRepeats) {
    while (true) {
      const cost = upgrade.cost()

      if (player.infinity.stats.CosP.lt(cost)) break

      upgrade.amountbought =
        upgrade.amountbought.add(1)
    }
  }
}