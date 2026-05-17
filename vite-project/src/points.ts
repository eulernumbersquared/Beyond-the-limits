import { reactive } from "vue";
import { player, type upgrades } from "./main";
import Decimal from "break_eternity.js";

export function calculatePointgain() {
    let gain = new Decimal(1)
    if(pupgrades[0].bought) {gain = gain.mul(2)}
    if(pupgrades[1].bought) {gain = gain.mul(3)}
    return gain
}

export const pupgrades: upgrades[] = reactive([
    {
        title: "Welcome!",
        description: "Multiply points by 2",
        cost: new Decimal('1'),
        bought: false
    },
    {
        title: "Gaming",
        description: "x3 more points",
        cost: new Decimal('10'),
        bought: false,
    },
    {
        title: "New feature already?",
        description: "Unlock the matterions",
        cost: new Decimal('100'),
        bought: false,
    },
])

export function buyUpgrade(index: number) {
  if (player.Points.gte(pupgrades[index].cost)) {
    player.Points = player.Points.sub(pupgrades[index].cost)
    pupgrades[index].bought = true
  }
}