import Decimal from "break_eternity.js";
import { fupgrades, resetFinity } from "../finity";
import { milestone, player, type RepeatableUpgrade, type upgrades } from "../player";
import { reactive } from "vue";
import { ELs } from "./EL";
import { crops } from "./FoI";
import { formatNumber } from "../format";

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

export function requirelessinfinity() {
    resetFinity();

    player.maincurrencies.Points = new Decimal(0);
    player.maincurrencies.FP = new Decimal(0);
    player.maincurrencies.FP = new Decimal("0")
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
        resetFinity();

}

export const iupgrades: upgrades[] = reactive([    
    {
        id: "1",
        title: "The new era",
        description: "Unlock the solarity. This is when you'll have to do a bit of micro-ing.",
        cost: new Decimal('1'),
        bought: false,
    },
    {
      id: "2",
      title: "Hell upon earth itself.",
      description: "",
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
  if(player.infinity.calamitytier.gte(1)) gain = gain.mul(player.fupgrades[10].effect?.() ?? new Decimal("1"))
  return gain
}

export function solargen() {
  let gain = new Decimal('0.0001')
  gain = gain.mul(solaritylevelboost())
  if(player.infinity.calamitytier.gte(1)) gain = gain.mul(player.fupgrades[10].effect?.() ?? new Decimal("1"))
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
  if(player.infinity.calamitytier.gte(1)) gain = gain.mul(ELs[3].effect())
    if (player.infinity.calamitytier.gte(2)) { gain = gain.mul(crops[2].effect() ?? 1)}
  return gain
}

export function solarenergyboost() {
  let boost = player.infinity.solarity.solarenergy.add(1).pow(1.2)

  return boost
}

export function solaritylevelthingie() {
  let level = Decimal.pow(10, player.infinity.solarity.solaritylevel)
  while (player.infinity.solarity.solarityxp.gte(level)) {
    player.infinity.solarity.solaritylevel =
    player.infinity.solarity.solaritylevel.add(1)
    player.infinity.solarity.solarityxp =
    player.infinity.solarity.solarityxp.sub(level)
    level = Decimal.pow(10, player.infinity.solarity.solaritylevel)
  }
}

export function investsolarityxp() {
  const energy = player.infinity.solarity.solarenergy
  if (energy.gt(0)) {
    player.infinity.solarity.solarityxp =
      player.infinity.solarity.solarityxp.add(energy)
    player.infinity.solarity.solarenergy = new Decimal(0)
    solaritylevelthingie()
  }
}

export function solaritylevelrequium(): Decimal {
  return new Decimal(1).mul(Decimal.pow(10, player.infinity.solarity.solaritylevel));
}

// i just shit my pants because this is a terraria calamity reference

export function calamityReset(): void {
  const requiredLevels = Decimal.pow(10, Decimal.pow(2, player.infinity.calamitytier).mul(400))

  if (player.maincurrencies.Points.gte(requiredLevels)) {
    player.infinity.calamitytier = player.infinity.calamitytier.add(1)

const milestone = calamitymilestones.find(m => m.id === player.infinity.calamitytier.toString())
if (milestone && !milestone.achieved && milestone.requirement()) {
  milestone.achieved = true
  console.log(`Milestone ${milestone.id} achieved: ${milestone.description}`)
}


    player.maincurrencies.Points = new Decimal(0)
    player.maincurrencies.FP = new Decimal(0)

    player.repeatableUpgrades.forEach(u => {
      u.amountbought = new Decimal(0)
      u.scaling()
    })
    player.fupgrades.forEach(u => (u.bought = false))
    player.pupgrades.forEach(u => (u.bought = false))
    player.infinity.solarity.solaritylevel = new Decimal("0")
    requirelessinfinity()
  }
}

export function calamityRequirement(): Decimal {
  return Decimal.pow(10, Decimal.pow(2, player.infinity.calamitytier).mul(400))
}

export const calamitymilestones: milestone[] = [
  {
    id: "1",
    title: "Calamity tier 1",
    description: "^0.5 points, disable repeatable upgrades, and unlock the eternal letters. Yes, you saw that correctly.",
    achieved: false,
    requirement: () => player.infinity.calamitytier.gte(1)
  },
  {
    id: "2",
    title: "Calamity tier 2",
    description: "FP's gain is entirely disabled but keep matterion's automation, unlock the farm of infinity and eternal letters E and F.",
    achieved: false,
    requirement: () => player.infinity.calamitytier.gte(2)
  },
  {
    id: "3",
    title: "Calamity tier 3",
    description: "Unlock star of the stellaris and more eternal letters.",
    achieved: false,
    requirement: () => player.infinity.calamitytier.gte(3)
    
  },
  {
    id: "4",
    title: "Calamity tier 5",
    description: "You're so presistent, aren't you? Unlock calamity energy, eternal energy and lime energy. ",
    achieved: false,
    requirement: () => player.infinity.calamitytier.gte(5)
  },
    {
    id: "5",
    title: "Calamity tier 10",
    description: "You think you're impressing me? ",
    achieved: false,
    requirement: () => player.infinity.calamitytier.gte(10)
  },

]

