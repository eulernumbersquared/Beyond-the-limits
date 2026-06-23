import Decimal from "break_eternity.js"
import { player } from "./main"

export function DCprecentupd() {
    if (player.CM.CM.gte(1000) && player.DCs.DCprecent.lte(100)) {
        player.DCs.DCprecent = player.CM.CM.div(1000)
    }
    if (player.DCs.DCprecent.gte(100)) {
        player.DCs.DCprecent = new Decimal('100')
    }
    if (player.gods.god1com) {
        player.DCs.DCprecent = new Decimal('0')
    }
}

export function DCboost() {
    if(player.FCo.inFinalCorruption) {
    return player.DCs.DCprecent.pow(0.9).mul(1.5)
    }
    return new Decimal('0')
}