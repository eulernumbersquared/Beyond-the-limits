import Decimal from "break_eternity.js";
import { player } from "./main";
import { requirelessfinity } from "./finity";
import { resetRepeatableCosts } from "./points";

export function godstatus() {
  if (player.FCo.inFinalCorruption && player.DCs.DCprecent.gte(100)) {
    player.FCo.inFinalCorruption = false
    player.FCo.FCfin = true
    player.corrupt.Incorruption = false
    player.gods.god1com = true
    player.CM.CMunlocked = false
    player.CM.CM = new Decimal(0)
    player.DCs.DCprecent = new Decimal(0)
    requirelessfinity()
    resetRepeatableCosts()
  }
}