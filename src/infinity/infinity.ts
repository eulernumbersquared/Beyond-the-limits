import Decimal from "break_eternity.js";
import { resetFinity } from "../finity";
import { player, type RepeatableUpgrade, type upgrades } from "../main";
import { reactive } from "vue";

const BASE_REQ = new Decimal("1.79e308");

export function infinitygain() {
    return player.maincurrencies.Points.log(BASE_REQ).floor().max(0);
}

export function infinityreset() {
    if (player.maincurrencies.Points.lt(BASE_REQ.pow(player.maincurrencies.IP.add(1)))) {
        return;
    }

    const gain = infinitygain();
    player.maincurrencies.IP = player.maincurrencies.IP.add(gain);
    player.infinity.amount = player.infinity.amount.add(1)
    resetFinity();

    player.maincurrencies.Points = new Decimal(0);
    player.maincurrencies.FP = new Decimal(0);

    player.repeatableUpgrades.forEach((a: RepeatableUpgrade) => {
        a.amountbought = new Decimal(0);
        a.scaling();
    });

    player.corrupt.BPiC = new Decimal(0);
    player.corrupt.Cpoints = new Decimal(0);

    player.fupgrades.forEach(u => {
        u.bought = false;
    });

    player.pupgrades.forEach(u => {
        u.bought = false;
    });
}

export const iupgrades: upgrades[] = reactive([    
    {
        id: "1",
        title: "The new era",
        description: "Unlock the solarity. This is when you'll have to do a bit of micro-ing.",
        cost: new Decimal('1'),
        bought: false
    },
    {
      id: "2",
      title: "Generation",
      description: "Gain 1% of FP/s. I'll be suprised if you actually get this",
      cost: new Decimal('2'),
      bought: false
    },
    {
      id: "3",
      title: "Stars of the solarity",
      description: "Damn ok",
      cost: new Decimal('3'),
      bought: false,
    }
])



export function buyIUpgradesReal(index: number) {
  const upg = iupgrades[index];
  if (!upg.bought && player.maincurrencies.IP.gte(upg.cost)) {
    player.maincurrencies.IP = player.maincurrencies.IP.sub(upg.cost);
    upg.bought = true;
  }
}

// solarity stuff
export function checksolarity() {
  if (player.infinity.solarity.lunargeneration) return "lunargen"
  if (player.infinity.solarity.solargeneration) return "solargen"
}
export function solaritylevelboost() {
  let boost = new Decimal(2).pow(player.infinity.solarity.solaritylevel).add(1)

  return boost
}
export function lunargen() {
  let gain = new Decimal('0.0001')
  gain = gain.mul(solaritylevelboost())
  return gain
}

export function solargen() {
  let gain = new Decimal('0.0001')
  gain = gain.mul(solaritylevelboost())
  return gain
}
export function solaritygen() {
  switch (checksolarity()) {
    case "lunargen":
      player.infinity.solarity.lunars = player.infinity.solarity.lunars.add(lunargen())
      break

    case "solargen":
      player.infinity.solarity.solars = player.infinity.solarity.solars.add(solargen())
      break

    default:
      
      break
  }
}

export function calcsolarenergy() {
  let gain = new Decimal('1')
  let lunar = player.infinity.solarity.lunars
  let solar = player.infinity.solarity.solars

  gain = gain.mul(lunar.mul(solar))

  return gain
}

export function solarenergyboost() {
  let boost = player.infinity.solarity.solarenergy.add(1).log(2).add(1).pow(1.2)

  return boost
}

export function solaritylevelthingie() {
  let level = new Decimal('1').mul(Decimal.pow(10, player.infinity.solarity.solaritylevel))

  if (player.infinity.solarity.solarityxp.gte(level)) {
    player.infinity.solarity.solaritylevel = player.infinity.solarity.solaritylevel.add(1)
    player.infinity.solarity.solarityxp = player.infinity.solarity.solarityxp.sub(level)
  }
}

export function investsolarityxp(amount: Decimal) {
  if (player.infinity.solarity.solarenergy.gte(0)) {
    player.infinity.solarity.solarenergy = player.infinity.solarity.solarenergy.sub(amount);
    player.infinity.solarity.solarityxp = player.infinity.solarity.solarityxp.add(amount);
    solaritylevelthingie();
  }
}

export function solaritylevelrequium(): Decimal {
  return new Decimal(1).mul(Decimal.pow(10, player.infinity.solarity.solaritylevel));
}

// i just shit my pants because this is a terraria calamity reference


export function calamitytiergain() {
  if(player.infinity.solarity.solaritylevel.gte(2) && player.infinity.calamitytier.eq(0)) {
    player.infinity.calamitytier = player.infinity.calamitytier.add(1)
    
  }
}