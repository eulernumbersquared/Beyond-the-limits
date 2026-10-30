import { reactive } from 'vue'
import Decimal from 'break_eternity.js'
import { showTitleCard, startDialogue } from '../images/dialogue.ts'
import { autoBuyAll, pointgen, pupgrades, repeatableUpgrades } from './points.ts'
import { monogen, duogen, trigen, focus, autobuymatterion } from './matterions.ts'
import { loadGame, saveGame } from './save.ts'
import { fupgrades } from './finity.ts'
import { autoBPiC, corruptionTick, trackCorruptionPoints } from './corruption.ts'
import { checkunlFC } from './finalcorruption.ts'
import { gainCM } from './CM.ts'
import { DCboost, DCprecentupd } from './Decorr.ts'
import { godstatus } from './gods.ts'
import { calamitymilestones, calcsolarenergy, iupgrades, solaritygen } from './infinity/infinity.ts'
import {  EEgain, recalcLetterAmounts, setGrid, type Cell } from "./infinity/EL"
import { crops } from './infinity/FoI.ts'
import { farm } from './infinity/thisfileisheretomakeFoIwork.ts'
import { matterupdate } from './infinity/matter.ts'
import { attackEnemy, autoBuyCoSPRepeats, autoBuyPlayerRepeats, calcdamage, calcdefense, calcHP, cegain, cosmicGain, cosmicRepeats, likeareallyfastattackenemyfunction, playerRepeat, SPrepeats } from './infinity/ss.ts'
import { hindRepeats } from './infinity/hind.ts'
import { delRepeats, ppgain, updateBestPoints } from './infinity/del.ts'


export const TICK_MS = 100
export const TICK_SCALE = TICK_MS / 1000

function profileTick<T>(name: string, fn: () => T): T {
  const start = performance.now()
  const result = fn()
  const elapsed = performance.now() - start

  if (elapsed > 5) {
    console.warn(`[Slow tick] ${name}: ${elapsed.toFixed(2)}ms`)
  }

  return result
}

export function applyUpgradeEffects(
  upgrades: upgrades[],
  repeatables: RepeatableUpgrade[],
  flag: keyof upgrades
): Decimal {
  let gain = new Decimal(1)

  for (const upg of upgrades) {
    if (upg?.bought && upg[flag]) {
      const eff = typeof upg.effect === "function" ? upg.effect() : null
      if (eff && eff.isFinite()) {
        if ((upg as any).isExponent) {
          gain = gain.pow(eff)
        } else {
          gain = gain.mul(eff)
        }
      }
    }
  }

  for (const rupg of repeatables) {
    const hasFlag = (rupg as any)[flag]
    if (hasFlag && rupg.amountbought.gt(0)) {
      const eff = typeof rupg.effect === "function" ? rupg.effect() : null
        if (eff && eff.isFinite()) {
        if ((rupg as any).isExponent) {
          gain = gain.pow(eff)
        } else {
          gain = gain.mul(eff)
        }
      }
    }
  }

  return gain
}



export interface upgrades {
  id: string
  title: string
  description: string
  effect?: () => Decimal
  effectDisplay?: () => string
  cost: Decimal
  cost2?: Decimal
  bought?: boolean
  row?: number
  col?: number
  pointboost?: boolean
  FPboost?: boolean
  IPboost?: boolean
  CPointsboost?: boolean
}

export interface RepeatableUpgrade {
  id: string
  title: string
  description: string
  amountbought: Decimal
  basecost: Decimal
  cost: Decimal | (() => Decimal)
  scaling: () => Decimal
  effect: () => Decimal
  effectDisplay?: () => string
  pointboost?: boolean
  FPboost?: boolean
  IPboost?: boolean
  CPointsboost?: boolean
}

export interface repeatableupgradebutbetterlmao {
  id: string
  title: string
  description: string
  amountbought: Decimal
  basecost: Decimal
  cost: () => Decimal
  effect: () => Decimal
  effectDisplay: () => string
  unlocked: () => boolean
}
export interface milestone {
  id: string,
  title: string,
  description: string
  achieved: boolean
  effect?: () => Decimal
  effectDisplay?: () => Decimal
  requirement: () => boolean
}

export const player = reactive({
  maincurrencies: {
    Points: new Decimal(0),
    FP: new Decimal(0),
    IP: new Decimal('0'),
  },
  mattergens: {
    mono: new Decimal(0),
    duo: new Decimal(0),
    tri: new Decimal(0),
    ML: new Decimal(0),
    DL: new Decimal(0),
    TL: new Decimal(0),
    Dgen: new Decimal(0),
    Tgen: new Decimal(0),
    Mfocus: false,
    Dfocus: false,
    Tfocus: false,
  },
    DCs: {
    DCprecent: new Decimal(0),
    DCunlocked: false
  },
  dialog: {
    introTriggered: false,
    matterionstrigged: false,
    focustrigged: false,
    finitytrigged: false,
    corruptiontrigged: false,
    GoC1trigged: false,
    pointreaptrigged: false,
    CoCtrigged: false,
    FC1: false,
    FC2: false,
    FC3: false,
    FCfinale: false,
    infinityintro: false,
    CT1: false,
    CT2: false,
    CT3: false,
    CT15: false,
    notdialogbutshh: false,
    god2stitlecard: false,
    god2KILL: false,
    delenter: false,
  },
  corrupt: {
    Incorruption: false,
    Cpoints: new Decimal(0),
    BPiC: new Decimal(0),
  },
  FCo: {
    inFinalCorruption: false,
    FCunl: false,
    FCfin: false,
  },
  finity: {
    unlocked: false,
    amount: new Decimal(0),
    requirement: new Decimal("1e14"),
  },
  CM: {
    CM: new Decimal(0),
    CMunlocked: false,
  },
  gods: {
    god1com: false,
    good2com: false,
  },
  infinity: {
    amount: new Decimal('0'),
    requirement: new Decimal("1.79e308"),
    solarity: {
      solarenergy: new Decimal('0'),
      lunars: new Decimal('0'),
      solars: new Decimal('0'),
      lunargeneration: false,
      solargeneration: false,
      solaritylevel: new Decimal('0'),
      solarityxp: new Decimal('0'),
    },
    calamitytier: new Decimal('0'),
    eternalLetters: {
      grid: Array.from({ length: 7 }, (_, r) =>
        Array.from({ length: 7 }, (_, c) => ({
          row: r,
          col: c,
          letter: null as Cell["letter"]
        }))
      )
    },
    calamen: new Decimal("0"),
    eternalenergy: new Decimal('0'),
    thiscurrencyisonlycalledprobablymaybeonceforonelittlethingbutok: new Decimal("0"),
    matter: new Decimal("1"),
    matterX: new Decimal("0"),
    hmatter: new Decimal("0"),
    stats: {
      HP: new Decimal("100"),
      maxHP: new Decimal("100"),
      DMG: new Decimal("1"),
      Def: new Decimal("1"),
      stage: new Decimal("0"),
      bestStage: new Decimal("0"),
      CosP: new Decimal("0"),
      SP: new Decimal("0")
    },
    enemy: {
      HP: new Decimal("250"),
      maxHP: new Decimal("250"),
      DMG: new Decimal("10"),
    },
    god2: {
      HP: new Decimal("1e1500"),
      maxHP: new Decimal("1e1500"),
      DMG: new Decimal("1e700"),

      bossStage: new Decimal("0"),
      bestbossStage: new Decimal("0"),

      hindpoint: new Decimal("0")
    },
    del: {
      inDel: false,
      PPoints: new Decimal("0"),
      bestPoints: new Decimal("0"),  
      rank: new Decimal("0"),
      tier: new Decimal("0")  
    }
  },

  pupgrades,
  fupgrades,
  repeatableUpgrades,
  iupgrades,
  calamitymilestones,
  playerRepeat,
  cosmicRepeats,
  SPrepeats,
  hindRepeats,
  delRepeats,
  crops,
  farm,
})
function checkMilestones() {
  if (player.maincurrencies.Points.gte(1) && !player.dialog.introTriggered) {
    startDialogue("intro")
    player.dialog.introTriggered = true
  }
  if (player.mattergens.ML.gte(1) && !player.dialog.matterionstrigged) {
    startDialogue("matterions")
    player.dialog.matterionstrigged = true
  }
  if (player.pupgrades[3]?.bought && !player.dialog.focustrigged) {
    startDialogue("focus")
    player.dialog.focustrigged = true
  }
  if (player.finity.amount.gte(1) && !player.dialog.finitytrigged) {
    startDialogue("finity")
    player.dialog.finitytrigged = true
  }
  if (player.fupgrades[1]?.bought && !player.dialog.corruptiontrigged) {
    startDialogue("corruption")
    player.dialog.corruptiontrigged = true
  }
  if (player.fupgrades[3]?.bought && !player.dialog.GoC1trigged) {
    startDialogue("GoC1")
    player.dialog.GoC1trigged = true
  }
  if (player.pupgrades[19]?.bought && !player.dialog.pointreaptrigged) {
    startDialogue("pointrepeat")
    player.dialog.pointreaptrigged = true
  }
  if (player.fupgrades[6]?.bought && !player.dialog.CoCtrigged) {
    startDialogue("CoCu")
    player.dialog.CoCtrigged = true
  }
  if (player.maincurrencies.Points.gte(1) && player.FCo.inFinalCorruption && !player.dialog.FC1) {
    startDialogue("FC1")
    showTitleCard("Phthoros", "Errors of the singularity" ,"linear-gradient(90deg, #d1009d, #ff72ec")
    player.dialog.FC1 = true
  }
  if (player.DCs.DCprecent.gte(1) && !player.dialog.FC2) {
    startDialogue("FC2")
    player.dialog.FC2 = true
  }
  if (player.DCs.DCprecent.gte(50) && !player.dialog.FC3) {
    startDialogue("FC3")
    player.dialog.FC3 = true
  }
  if (player.gods.god1com && !player.dialog.FCfinale) {
    startDialogue("FCfinale")
    player.dialog.FCfinale = true
  }
  if (player.maincurrencies.Points.gte(1.79e308) && !player.dialog.infinityintro) {
    startDialogue("infinityintro")
    player.dialog.infinityintro = true
  }
  if (player.infinity.calamitytier.eq(1) && !player.dialog.CT1) {
    startDialogue("calamity1")
    player.dialog.CT1 = true
  }
  if (player.infinity.calamitytier.eq(2) && !player.dialog.CT2) {
    startDialogue("calamity2")
    player.dialog.CT2 = true
  }
  if(player.infinity.calamitytier.eq(3) && !player.dialog.CT3) {
    startDialogue("calamity3")
    player.dialog.CT3 = true
  }
  if(player.infinity.stats.SP.gte(1) && !player.dialog.notdialogbutshh) {
    showTitleCard("Supernova", "You have reached the" ,"linear-gradient(90deg, #dfd005, #ecbd3b, #fcf4fb")
    player.dialog.notdialogbutshh = true
  }
  if(player.infinity.calamitytier.eq(15) && !player.dialog.CT15) {
    startDialogue("calamity15")
    player.dialog.CT15 = true
  }
    if(player.infinity.god2.bossStage.gte(1) && !player.dialog.god2stitlecard) {
    showTitleCard("Ananke", "Weaver of the eternal suffering" ,"linear-gradient(90deg, #7500ac, #a70016")
    startDialogue("hp1")
    player.dialog.god2stitlecard = true
  }
  if(player.gods.good2com && !player.dialog.god2KILL) {
    startDialogue("hpend")
    player.dialog.god2KILL = true
  }
    if(player.infinity.del.inDel && !player.dialog.delenter) {
    showTitleCard("Delusion", "You have enter the" ,"linear-gradient(90deg, #000000, #fcfbfb")
    player.dialog.delenter = true
  }
}

loadGame()
setGrid(player.infinity.eternalLetters.grid)
recalcLetterAmounts()

setInterval(() => {
  player.maincurrencies.Points = player.maincurrencies.Points.add(
    pointgen().mul(TICK_SCALE)
  )

  checkMilestones()

  player.mattergens.mono = player.mattergens.mono.add(monogen())
  player.mattergens.duo = player.mattergens.duo.add(duogen())
  player.mattergens.tri = player.mattergens.tri.add(trigen())

  focus()
  autobuymatterion()

  trackCorruptionPoints()
  player.corrupt.Cpoints = player.corrupt.Cpoints.add(
    corruptionTick().mul(TICK_SCALE)
  )

  checkunlFC()

  player.CM.CM = player.CM.CM.add(gainCM().mul(TICK_SCALE))
  DCprecentupd()
  DCboost()
  godstatus()
  autoBuyAll()
  autoBPiC()
  solaritygen()
  player.infinity.solarity.solarenergy = player.infinity.solarity.solarenergy.add(calcsolarenergy())
  if(player.infinity.calamitytier.gte(1)) player.infinity.eternalenergy = player.infinity.eternalenergy.add(EEgain())
  if(player.infinity.calamitytier.gte(3)) player.infinity.calamen = player.infinity.calamen.add(cegain())
  player.infinity.stats.DMG = calcdamage()
  player.infinity.stats.Def = calcdefense()
  player.infinity.stats.maxHP = calcHP()
  if(player.infinity.stats.SP.gte(1)) player.infinity.stats.CosP = player.infinity.stats.CosP.add(cosmicGain())
  if(player.infinity.stats.SP.gte(5)) likeareallyfastattackenemyfunction()
    if(player.infinity.stats.SP.gte(10)) autoBuyPlayerRepeats()
      if(player.infinity.stats.SP.gte(1e24)) autoBuyCoSPRepeats()
  player.infinity.del.PPoints = player.infinity.del.PPoints.add(ppgain())
  updateBestPoints()
  matterupdate()
}, TICK_MS)

setInterval(() => {
  saveGame()
}, 10000)
