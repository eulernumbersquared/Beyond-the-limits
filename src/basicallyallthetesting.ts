
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
  player.infinity.matter = new Decimal("1e3434")
  player.infinity.eternalenergy = new Decimal("1e11")
}
export function balancefixing() {
        player.maincurrencies.IP = new Decimal("100")
}

export function debugToFupgrade6() {
  player.finity.amount = new Decimal("1")
  player.maincurrencies.FP = new Decimal("1e8")
  player.maincurrencies.Points = new Decimal("1e30")
  player.FCo.FCfin = true
  player.gods.god1com = true
  player.infinity.calamitytier = new Decimal("0")
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

