
import Decimal from 'break_eternity.js'
import { fupgrades, requirelessfinity } from './finity'
import { player } from './main'

export function startFC() {
    if (player.FCo.FCunl && !player.FCo.FCfin && !player.FCo.inFinalCorruption) {
        player.FCo.inFinalCorruption = true
        player.corrupt.Incorruption = true
        player.DCs.DCprecent = new Decimal('0')
        player.CM.CM = new Decimal('0')

        requirelessfinity()

        player.repeatableUpgrades[0].scaling()
        player.repeatableUpgrades[1].scaling()
        player.repeatableUpgrades[2].scaling()

        player.repeatableUpgrades[0].amountbought = new Decimal('0')
        player.repeatableUpgrades[1].amountbought = new Decimal('0')
        player.repeatableUpgrades[2].amountbought = new Decimal('0')

        player.repeatableUpgrades[0].scaling()
        player.repeatableUpgrades[1].scaling()
        player.repeatableUpgrades[2].scaling()

        player.repeatableUpgrades[0].basecost = new Decimal('1')
        player.repeatableUpgrades[1].basecost = new Decimal('10')
        player.repeatableUpgrades[2].basecost = new Decimal('100')

        player.repeatableUpgrades[0].cost = new Decimal('1')
        player.repeatableUpgrades[1].cost = new Decimal('10')
        player.repeatableUpgrades[2].cost = new Decimal('100')
        player.repeatableUpgrades[0].scaling()
        player.repeatableUpgrades[1].scaling()
        player.repeatableUpgrades[2].scaling()

        player.pupgrades[19].bought = true
    }
}

export function checkunlFC() {
    if (fupgrades[6].bought) {
        player.FCo.FCunl = true
    }
}