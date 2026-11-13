import Decimal from "break_eternity.js";
import { milestone, player, repeatableupgradebutbetterlmao } from "../player";
import { requirelessinfinity } from "./infinity";
import { reactive } from "vue";
import { formatNumber } from "../format";

export function delusionality() {
    requirelessinfinity()
}

export function enterdelusion() {
    if(player.infinity.del.inDel == false) {player.infinity.del.inDel = true; delusionality()}
    else player.infinity.del.inDel = false
}

export function updateBestPoints() {
  if (player.infinity.del.inDel &&
      player.maincurrencies.Points.gt(player.infinity.del.bestPoints)) {
    player.infinity.del.bestPoints = player.maincurrencies.Points

  }
}

export function ppgain() {
    let gain = player.infinity.del.bestPoints
    if(delRepeats[0].amountbought.gte(1)) gain = gain.mul(delRepeats[0].effect())
    return gain
}

export const delRepeats = reactive<repeatableupgradebutbetterlmao[]>([ 
    {
        id: "0",
        title: "A deluded future",
        description: "x1.2 psuedo points per upgrade bought",
        amountbought: new Decimal("0"),
        basecost: new Decimal("1000"),
        cost() {
        let scale = this.basecost.mul(
        Decimal.pow(2, this.amountbought)
        )
        if(this.amountbought.gte(75)) scale = this.basecost.mul(
        Decimal.pow(2.2, this.amountbought)
        )
        return scale
        },
        effect() {
      return Decimal.pow(1.2, this.amountbought.toNumber())
        },
        effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
        },
        unlocked() { return true}
},
    {
        id: "1",
        title: "Faded support",
        description: "While in delusional, x10 points.",
        amountbought: new Decimal("0"),
        basecost: new Decimal("2500"),
        cost() {
        let scale = this.basecost.mul(
        Decimal.pow(10, this.amountbought)
        )
        if(this.amountbought.gte(10)) scale = this.basecost.mul(
        Decimal.pow(25, this.amountbought)
        )
        return scale
        },
        effect() {
      return Decimal.pow(10, this.amountbought.toNumber())
        },
        effectDisplay() {
      return "Currently x" + formatNumber(this.effect())
        },
        unlocked() { return true}
},
])

export function buyDelupgrade(id: string) {

  const upgrade = delRepeats.find(upg => upg.id === id)

  if (!upgrade) return

  const cost = upgrade.cost()

  if (player.infinity.del.PPoints.lt(cost)) return

  player.infinity.del.PPoints = player.infinity.del.PPoints.sub(cost)
  upgrade.amountbought = upgrade.amountbought.add(1)
}
