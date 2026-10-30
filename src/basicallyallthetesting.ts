
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
// showTitleCard("God of corruption", "Errors of the singularity" ,"linear-gradient(90deg, #d1009d, #ff72ec, white")
export function reachcalamitytier1likeagoodboy() {
  showTitleCard("Phthoros", "Errors of the singularity" ,"linear-gradient(90deg, #d1009d, #ff72ec")
}
export function balancefixing() {
        crops[0].amount = new Decimal("100")
        crops[1].amount = new Decimal("100")
        crops[2].amount = new Decimal("100")
        player.infinity.hmatter = new Decimal("1e6")
}

export function debugToFupgrade6() {
  player.finity.amount = new Decimal("1")
  player.infinity.amount = new Decimal("1")
  player.maincurrencies.IP = new Decimal("1")
  player.crops[0].amount = new Decimal("0")
  player.crops[1].amount = new Decimal("0")
  player.crops[2].amount = new Decimal("0")
  player.infinity.eternalenergy = new Decimal("0")
  player.infinity.solarity.solaritylevel = new Decimal("1")
  player.maincurrencies.Points = new Decimal("1")
  player.gods.god1com = true
  player.FCo.FCfin = true
  player.infinity.hmatter = new Decimal("0")
}

export function resetce() {
  player.infinity.calamitytier = new Decimal("15")
}

export function heyheymanguesswhat() {
  player.infinity.god2.bossStage = new Decimal("0")
  player.infinity.stats.bestStage = new Decimal("50")
  hindRepeats[0].amountbought = new Decimal("0")
  generateBoss()
  generateEnemy()
}
import { ref } from 'vue'
import { nextLine, showTitleCard, startDialogue } from '../images/dialogue.ts'
import { crops } from "./infinity/FoI.ts"
import { generateEnemy, playerRepeat, SPrepeats } from "./infinity/ss.ts"
import { generateBoss, hindRepeats } from "./infinity/hind.ts"

export const dialogueInput = ref('')

export function activateDialogue() {
  const id = dialogueInput.value.trim()
  if (id) {
    startDialogue(id)
  }
}

