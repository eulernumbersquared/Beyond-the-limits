import Decimal from "break_eternity.js";
import { player, repeatableupgradebutbetterlmao } from "../player";
import { formatNumber } from "../format";
import { reactive } from "vue";

let battleInterval: ReturnType<typeof setInterval> | null = null

export function beatbossStage() {
  const boss = player.infinity.god2

  if (boss.bossStage.gt(boss.bestbossStage)) {
    boss.bestbossStage = boss.bossStage
  }

  boss.bossStage = boss.bossStage.add(1)
  generateBoss()
}

export function generateBoss() {
  const stage = player.infinity.god2.bossStage
  const enemy = player.infinity.god2

  enemy.maxHP = new Decimal("1e1500").mul(
    new Decimal(1e100).pow(stage)
  )
  if(stage.gte(500)) enemy.maxHP = enemy.maxHP.pow(4)

    enemy.HP = enemy.maxHP

  enemy.DMG = new Decimal("1e700").mul(
    new Decimal(1e100).pow(stage)
  )
}

export function stopBattle() {
  if (battleInterval !== null) {
    clearInterval(battleInterval)
    battleInterval = null
  }
}

export function attackBoss() {
  const stats = player.infinity.stats
  const enemy = player.infinity.god2

  if (battleInterval !== null) return

  if (enemy.maxHP.lte(0)) {
    generateBoss()
  }

  if (stats.HP.lte(0)) {
    stats.HP = stats.maxHP
    generateBoss()
  }

  battleInterval = setInterval(() => {
    const damage = Decimal.max(stats.DMG, 1)

    enemy.HP = Decimal.max(
      enemy.HP.sub(damage),
      0
    )

    if (enemy.HP.lte(0)) {
      stopBattle()

      beatbossStage()

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
  }, 10)
}

export const hindRepeats = reactive<repeatableupgradebutbetterlmao[]>([
  {
    id: "0",
    title: "Energy of the acursed",
    description: "Boost CE gain by ^1.1",
    amountbought: new Decimal("0"),
    basecost: new Decimal("0.999999"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(2, this.amountbought)
    )

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
    title: "Solar coalessence",
    description: "Boost SP by x1e10",
    amountbought: new Decimal("0"),
    basecost: new Decimal("20"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(2, this.amountbought)
    )

    return scale
    },
    effect() {
      return Decimal.pow("1e10", this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
      {
    id: "2",
    title: "Wrathful oppositon",
    description: "Boost damage by ^1.05",
    amountbought: new Decimal("0"),
    basecost: new Decimal("29"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(2, this.amountbought)
    )

    return scale
    },
    effect() {
      return Decimal.pow("1.06", this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently ^" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
    {
    id: "3",
    title: "Stellar hindrance",
    description: "Boost CoSP by ^1.05",
    amountbought: new Decimal("0"),
    basecost: new Decimal("45"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(2, this.amountbought)
    )

    return scale
    },
    effect() {
      return Decimal.pow("1.05", this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently ^" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
      {
    id: "4",
    title: "Condement of the galaxia",
    description: "Boost damage by ^1.05",
    amountbought: new Decimal("0"),
    basecost: new Decimal("200"),
    cost() {
    let scale = this.basecost.mul(
        Decimal.pow(1.125, this.amountbought)
    )
    if(this.amountbought.gte(5)) {
      scale = this.basecost.mul(Decimal.pow(1.2, this.amountbought ))
    }
    return scale
    },
    effect() {
      return Decimal.pow("1.05", this.amountbought.toNumber())
    },
    effectDisplay() {
      return "Currently ^" + formatNumber(this.effect())
    },
    unlocked() { return true}
  },
])

export function buyHindrepeat(id: string) {

  const upgrade = hindRepeats.find(upg => upg.id === id)

  if (!upgrade) return

  const cost = upgrade.cost()

  if (player.infinity.god2.bossStage.lt(cost)) return
  upgrade.amountbought = upgrade.amountbought.add(1)
}

export function fuckingkillgod2() {
  if(player.infinity.god2.bossStage.gte(500)) {
    player.gods.good2com = true
    player.gods.good2com = true
    player.gods.good2com = true

    player.gods.good2com = true
    player.infinity.god2.bossStage = new Decimal("0")
    player.infinity.god2.bestbossStage = new Decimal("0")
    hindRepeats.forEach((upg) => {
      upg.amountbought = new Decimal("0")
      })
    }
}