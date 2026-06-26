import { createApp, reactive } from 'vue'
import App from './vue/App.vue'
import Decimal from 'break_eternity.js'
import { startDialogue } from '../images/dialogue'
import { autoBuyAll, pointgen, pupgrades, repeatableUpgrades } from './points'
import { monogen, duogen, trigen, focus, autobuymatterion } from './matterions'
import { loadGame, saveGame } from './save'
import { fupgrades } from './finity.ts'
import { autoBPiC, corruptionTick, trackCorruptionPoints } from './corruption'
import { checkunlFC } from './finalcorruption'
import { gainCM } from './CM.ts'
import { DCboost, DCprecentupd } from './Decorr.ts'
import { godstatus } from './gods.ts'
import { calcsolarenergy, iupgrades, solaritygen } from './infinity/infinity.ts'
import { isInterfaceDeclaration } from 'typescript'

export const TICK_MS = 100
export const TICK_SCALE = TICK_MS / 1000

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
  cost: Decimal
  scaling: () => Decimal
  effect: () => Decimal
  effectDisplay?: () => string
  pointboost?: boolean
  FPboost?: boolean
  IPboost?: boolean
  CPointsboost?: boolean
}

export interface milestone {
  id: string
  title: string
  description: string
  achieved: boolean
  effect?: () => Decimal
  effectDisplay?: () => Decimal
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
    god2com: false,
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
    calamitytier: new Decimal('0')
  },
  pupgrades,
  fupgrades,
  repeatableUpgrades,
  iupgrades,
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
}

loadGame()

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
}, TICK_MS)

setInterval(() => {
  saveGame()
}, 10000)

createApp(App).mount('#app')
