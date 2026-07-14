import Decimal from "break_eternity.js"
import { player } from "./player"
import { getRepeatableCost } from "./points"
import { reactive } from "vue"
import { iupgrades as iupgradeDefs } from "./infinity/infinity"

export function saveGame() {
  const saveData = JSON.stringify(player, (key, value) => {
    if (value instanceof Decimal) return value.toString()

    if (key === "title" || key === "description" || key === "effect" || key === "effectDisplay") {
      return undefined
    }

    return value
  })

  const encoded = btoa(saveData)
  localStorage.setItem("incrementalSave", encoded)
}

function sanitizeSave(restored: any) {
  if (restored.iupgrades) {
    for (const upg of restored.iupgrades) {
      delete upg.title
      delete upg.description
      delete upg.effect
      delete upg.effectDisplay
    }
  }
  return restored
}

export function loadGame() {
  const saved = localStorage.getItem("incrementalSave")
  if (!saved) return

  let restored: any
  try {
    const decoded = atob(saved)
    restored = JSON.parse(decoded)
  } catch {
    try {
      restored = JSON.parse(saved)
    } catch (err) {
      console.error("Failed to load save", err)
      return
    }
  }

  restored = sanitizeSave(restored)

  restoreValues(player, restored)

  player.repeatableUpgrades.forEach((rep: any) => {
    if (!(rep.amountbought instanceof Decimal)) rep.amountbought = new Decimal(rep.amountbought ?? 0)
    rep.cost = getRepeatableCost(rep)
  })

  player.iupgrades.forEach((upg: any) => {
    if (!(upg.cost instanceof Decimal)) upg.cost = new Decimal(upg.cost ?? 0)
  })

  player.infinity.eternalLetters.grid = reactive(player.infinity.eternalLetters.grid)
}


function restoreValues(target: any, src: any) {
  if (src == null) return
  for (const key of Object.keys(target)) {
    const tVal = target[key]
    const sVal = src?.[key]
    if (sVal === undefined) continue

    if (tVal instanceof Decimal) {
      target[key] = new Decimal(sVal ?? 0)
    } else if (Array.isArray(tVal) && Array.isArray(sVal)) {
      for (let i = 0; i < tVal.length; i++) {
        if (sVal[i] === undefined) continue
        if (tVal[i] instanceof Decimal) {
          tVal[i] = new Decimal(sVal[i] ?? 0)
        } else if (typeof tVal[i] === "object" && tVal[i] !== null) {
          restoreValues(tVal[i], sVal[i])
        } else {
          tVal[i] = sVal[i]
        }
      }
    } else if (typeof tVal === "object" && tVal !== null) {
      restoreValues(tVal, sVal)
    } else {
      target[key] = sVal
    }
  }
}

export function hardReset() {
  localStorage.removeItem("incrementalSave")

  player.pupgrades.forEach(upg => upg.bought = false)
  player.repeatableUpgrades.forEach(rep => {
    rep.amountbought = new Decimal(0)
    rep.cost = rep.basecost
  })
  player.fupgrades.forEach(upg => upg.bought = false)

player.iupgrades.forEach((upg, i) => {
  upg.bought = false
  upg.cost = new Decimal(iupgradeDefs[i].cost)
})


  player.maincurrencies.Points = new Decimal(0)
  player.maincurrencies.IP = new Decimal(0)
  player.maincurrencies.FP = new Decimal(0)

  player.infinity.eternalLetters.grid.forEach(row =>
    row.forEach(cell => cell.letter = null)
  )

  location.reload()
  location.reload()
  location.reload()
}
