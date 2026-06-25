import Decimal from "break_eternity.js"
import { player } from "./main"
import { getRepeatableCost } from "./points"

export function saveGame() {
  const saveData = JSON.stringify(player, (_key, value) => {
    if (value instanceof Decimal) return value.toString()
    return value
  })
<<<<<<< Updated upstream:src/save.ts
  localStorage.setItem("incrementalSave", saveData)
}

export function loadGame() {
  const saved = localStorage.getItem("incrementalSave")
  if (!saved) return

  const restored = JSON.parse(saved)
=======
  const encoded = btoa(saveData)
  localStorage.setItem("savedata", encoded)
}

export function loadGame() {
  const saved = localStorage.getItem("savedata")
  if (!saved) return

  let decoded: string
  try {
    decoded = atob(saved)
  } catch {
    decoded = saved
  }

  const restored = JSON.parse(decoded)
>>>>>>> Stashed changes:vite-project/src/save.ts

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

  restoreValues(player, restored)

  player.repeatableUpgrades.forEach((rep: any) => {
    if (!(rep.amountbought instanceof Decimal)) rep.amountbought = new Decimal(rep.amountbought ?? 0)
    rep.cost = getRepeatableCost(rep)
  })

  player.iupgrades.forEach((upg: any) => {
    if (!(upg.cost instanceof Decimal)) upg.cost = new Decimal(upg.cost ?? 0)
  })
}

export function hardReset() {
<<<<<<< Updated upstream:src/save.ts
  localStorage.removeItem("incrementalSave")
=======
  localStorage.removeItem("savedata")
>>>>>>> Stashed changes:vite-project/src/save.ts

  player.pupgrades.forEach(upg => upg.bought = false)
  player.repeatableUpgrades.forEach(rep => {
    rep.amountbought = new Decimal(0)
    rep.cost = rep.basecost
  })
  player.fupgrades.forEach(upg => upg.bought = false)

<<<<<<< Updated upstream:src/save.ts

=======
>>>>>>> Stashed changes:vite-project/src/save.ts
  player.iupgrades.forEach(upg => {
    upg.bought = false
    upg.cost = upg.id === "1" ? new Decimal(0) : new Decimal(2)
  })

  player.maincurrencies.Points = new Decimal(0)
  player.maincurrencies.IP = new Decimal(0)
  player.maincurrencies.FP = new Decimal(0)

  location.reload()
}
