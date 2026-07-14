
import Decimal from "break_eternity.js"
import { player } from "./player.ts"

export function failing() {
  player.finity.amount = new Decimal("1")
  player.maincurrencies.FP = new Decimal("1e30")
}
export function secretdebug(amount: number) {
  player.maincurrencies.FP = new Decimal(amount)
}
export function okthisoneisforpoints(amount: number) {
  player.maincurrencies.Points = new Decimal(amount)
}

export function reachcalamitytier1likeagoodboy() {
  player.infinity.calamitytier = new Decimal("1")
}
export function balancefixing() {
        player.maincurrencies.IP = new Decimal("100")
}

export function debugToFupgrade6() {
  player.maincurrencies.FP = new Decimal('1e30')
  player.maincurrencies.Points = new Decimal('1e30')

  player.pupgrades.forEach((upgrade) => {
    upgrade.bought = true
  })

  player.fupgrades.forEach((upgrade) => {
    upgrade.bought = true
  })
  player.iupgrades[0].bought = true
  player.infinity.solarity.solaritylevel = new Decimal("2")
  player.FCo.FCfin = true
  player.gods.god1com = true
  player.infinity.amount = new Decimal("1")
  player.infinity.calamitytier = new Decimal("2")
}


import { ref } from 'vue'
import { startDialogue } from '../images/dialogue.ts'

export const dialogueInput = ref('')

export function activateDialogue() {
  const id = dialogueInput.value.trim()
  if (id) {
    startDialogue(id)
  }
}

