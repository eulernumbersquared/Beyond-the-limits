// ok you gain matter per something
// then for every 1.79e308^(matter-x) you can gain matter-x
// ok then softcap at 1.79e308 because fuck you

import Decimal from "break_eternity.js";
import { player } from "../player";
import { ELs } from "./EL";
import EL from "../vue/infinityvue.vue/EL.vue";
import { crops } from "./FoI.ts";



export function mattergain() {
    let gain = new Decimal("1")
    if(player.infinity.eternalenergy.gte(1e6)) {
        gain = new Decimal("1.01")
    }
    gain = gain.times(player.infinity.matterX.div(10).add(1))
    if(player.infinity.matter.gte(1e100)) gain = gain.pow(0.3)
    if(player.infinity.hmatter.gte(1)) gain = gain.mul(player.infinity.hmatter.add(1).mul(1.5))
    if(player.infinity.matter.gte(1e150)) gain = gain.pow(0.4)
    if(player.infinity.matter.gte('1e500')) gain = gain.pow(0.3)
    if(player.infinity.matter.gte('1e1500')) gain = gain.pow(0.05)
    if(player.infinity.hmatter.gte(1)) gain = gain.mul(ELs[4].effect())
    if(player.infinity.hmatter.gte(10)) gain = gain.mul(100)
    if(player.infinity.hmatter.gte(500)) gain = gain.pow(3)
    if(player.infinity.hmatter.gte(15000)) gain = gain.pow(player.infinity.matterX.div(10).add(1))
    if(player.infinity.hmatter.gte(100000)) gain = gain.pow(player.infinity.hmatter.add(1).mul(0.1))
    if(player.infinity.matter.gte('2.71e7389056')) gain = gain.log10().log10()
    if(player.infinity.calamitytier.gte(2)) gain = gain.pow(0.5)
    if(player.infinity.calamitytier.gte(2) && crops[0].effect().gte(1)) gain = gain.pow(crops[0].effect())
    return gain
}

export function matterupdate() {
    if(player.infinity.eternalenergy.gte(1e6)) {
        player.infinity.matter = player.infinity.matter.mul(mattergain())
        if(player.infinity.matter.lte(0)) { player.infinity.matter = new Decimal("1")}
    }
}

export function matterX() {
    let req = new Decimal("1e15").pow(player.infinity.matterX.add(1))

    return req
}

export function matterXgain() {
    if(player.infinity.matter.gte(matterX())) {
        player.infinity.matterX = player.infinity.matterX.add(1)
        player.infinity.matter = new Decimal("0")
    }
}
export function hmatergain() {
    let gain = new Decimal("1")
    gain = player.infinity.matterX.div(10).pow(0.9)
    if(player.infinity.hmatter.gte(15)) { gain = gain.mul(player.infinity.matter.add(1).log10().pow(0.9))}
    if(player.infinity.calamitytier.gte(2)) gain = gain.pow(0.5)
    if(player.infinity.calamitytier.gte(2) && crops[1].amount.gte(1)) gain = gain.mul(crops[1].effect())
    return gain
}
export function hmatter() {
    let req = new Decimal("10")
    if(player.infinity.matterX.gte(req)) {
        player.infinity.hmatter = player.infinity.hmatter.add(hmatergain())
        player.infinity.matter = new Decimal("1")
        player.infinity.matterX = new Decimal("0")
    }
}
