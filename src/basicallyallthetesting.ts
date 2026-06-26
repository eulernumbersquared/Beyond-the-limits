
import Decimal from "break_eternity.js"
import { player } from "./main"

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

