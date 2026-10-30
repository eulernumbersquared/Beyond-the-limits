
import Decimal from "break_eternity.js";
import { resetFinity } from "../finity";
import { milestone, player, type RepeatableUpgrade, type upgrades } from "../player";
import { reactive } from "vue";
import { ELs } from "./EL";
import { crops } from "./FoI";
import { formatNumber } from "../format";

export function infinitygain() {
    if (player.maincurrencies.Points.lt("1.79e308")) return new Decimal(0);
    let gain = new Decimal("1");
    gain = player.maincurrencies.Points.log10().div(308).pow(1.5);
    if(player.infinity.calamitytier.gte(15)) { gain = gain.mul(player.infinity.god2.bossStage.add(1).pow(2)) }
    return gain;
}

export function infinityreset() {
    if (player.maincurrencies.Points.gte("1.79e308")) {
        player.maincurrencies.IP = player.maincurrencies.IP.add(infinitygain());
        player.infinity.amount = player.infinity.amount.add(1);
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
}

export function requirelessinfinity() {
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

// Infinity upgrades
export const iupgrades: upgrades[] = reactive([
    {
        id: "0",
        title: "The new era",
        description: "The boost from corruption points to points is x10 stronger.",
        cost: new Decimal("1"),
        bought: false,
    },
    {
        id: "1",
        title: "Blue",
        description: "It's alot more blue in here, x3 FP.",
        cost: new Decimal("1"),
        bought: false
    },
    {
        id: "2",
        title: "Classic boost",
        description: "x10 points",
        cost: new Decimal("1"),
        bought: false,
    },
    {
        id: "4",
        title: "A greater star",
        description: "Unlock solarity",
        cost: new Decimal("1"),
        bought: false,
    },
    {
        id: "5",
        title: "Energetic",
        description: "Boost solar and lunar gain by x10",
        cost: new Decimal("1"),
        bought: false,
    },
    {
        id: "6",
        title: "Fillllleeeeerrrrrrrr",
        description: "Boost solar energy by x10 and solar and lunar gain by x10 again",
        cost: new Decimal("1.3"),
        bought: false,
    },
    {
        id: "7",
        title: "Trax",
        description: "Trax? I have no idea, but x100 solar energy, solar and lunar.",
        cost: new Decimal("1.3"),
        bought: false,
    },
    {
        id: "8",
        title: "Afterimage",
        description: "These names don't make sense! IP boosts points at a reduced rate",
        effect() {
            return player.maincurrencies.IP.div(1.5);
        },
        effectDisplay() {
            return "Currently x" + formatNumber(this.effect?.() ?? new Decimal(1)) + " points";
        },
        cost: new Decimal("1000"),
        bought: false,
    },
    {
        id: "9",
        title: "The carnage",
        description: "^1.2 damage.",
        cost: new Decimal("1200"),
        bought: false,
    },
    {
        id: "10",
        title: "A powerful infinity",
        description: "^1.05 damage.",
        cost: new Decimal("1e9"),
        bought: false,
    },
]);

export function buyIUpgradesReal(index: number) {
    const upg = iupgrades[index];
    if (!upg.bought && player.maincurrencies.IP.gte(upg.cost)) {
        player.maincurrencies.IP = player.maincurrencies.IP.sub(upg.cost);
        upg.bought = true;
    }
}

// Solarity
export function checksolarity() {
    if (player.infinity.solarity.lunargeneration) return "lunargen";
    if (player.infinity.solarity.solargeneration) return "solargen";
}

export function solaritylevelboost() {
    return new Decimal(2).pow(player.infinity.solarity.solaritylevel).add(1);
}

export function lunargen() {
    let gain = new Decimal("0.0001");
    gain = gain.mul(solaritylevelboost());
    if (player.iupgrades[4].bought) gain = gain.mul(10);
    if (player.iupgrades[5].bought) gain = gain.mul(10);
    if (player.iupgrades[6].bought) gain = gain.mul(100);
    return gain;
}

export function solargen() {
    let gain = new Decimal("0.0001");
    gain = gain.mul(solaritylevelboost());
    if (player.iupgrades[4].bought) gain = gain.mul(10);
    if (player.iupgrades[5].bought) gain = gain.mul(10);
    if (player.iupgrades[6].bought) gain = gain.mul(100);
    return gain;
}

export function solaritygen() {
    switch (checksolarity()) {
        case "lunargen":
            player.infinity.solarity.lunars =
                player.infinity.solarity.lunars.add(lunargen());
            break;
        case "solargen":
            player.infinity.solarity.solars =
                player.infinity.solarity.solars.add(solargen());
            break;
        default:
            break;
    }
}

export function calcsolarenergy() {
    let gain = new Decimal("1");
    const lunar = player.infinity.solarity.lunars;
    const solar = player.infinity.solarity.solars;

    gain = gain.mul(lunar.mul(solar));
    if (player.infinity.calamitytier.gte(1)) gain = gain.mul(ELs[3].effect());
    if (player.infinity.calamitytier.gte(2)) gain = gain.mul(crops[2].effect() ?? 1);
    if (player.iupgrades[5].bought) gain = gain.mul(10);
    if (player.iupgrades[6].bought) gain = gain.mul(100);
    return gain;
}

export function solarenergyboost() {
    return player.infinity.solarity.solarenergy.add(1).pow(1.2);
}

export function solaritylevelthingie() {
    let level = Decimal.pow(10, player.infinity.solarity.solaritylevel);

    while (player.infinity.solarity.solarityxp.gte(level)) {
        player.infinity.solarity.solaritylevel =
            player.infinity.solarity.solaritylevel.add(1);
        player.infinity.solarity.solarityxp =
            player.infinity.solarity.solarityxp.sub(level);

        level = Decimal.pow(10, player.infinity.solarity.solaritylevel);
    }
}

export function investsolarityxp() {
    const energy = player.infinity.solarity.solarenergy;

    if (energy.gt(0)) {
        player.infinity.solarity.solarityxp =
            player.infinity.solarity.solarityxp.add(energy);
        player.infinity.solarity.solarenergy = new Decimal(0);
        solaritylevelthingie();
    }
}

export function solaritylevelrequium(): Decimal {
    return Decimal.pow(10, player.infinity.solarity.solaritylevel);
}

// Calamity milestones
export const calamitymilestones: milestone[] = reactive([
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
        description: "FP's gain is entirely disabled but keep matterion's automation, and reduce the gains of matter and hadronic matter by ^0.5, unlock the farm of infinity and eternal letters F and G.",
        achieved: false,
        requirement: () => player.infinity.calamitytier.gte(2)
    },
    {
        id: "3",
        title: "Calamity tier 3",
        description: "Good luck trying to get points! ^0.5 points, nullify fundamental struction's effect on points, unlock calamity energy and a new eternal letter.",
        achieved: false,
        requirement: () => player.infinity.calamitytier.gte(3)
    },
    {
        id: "4",
        title: "Calamity tier 15",
        description: "Summon Ananke, the goddess of hindrances, infront of your eyes.",
        achieved: false,
        requirement: () => player.infinity.calamitytier.gte(15)
    },
]);

export function syncCalamityMilestones() {
    for (const m of calamitymilestones) {
        if (!m.achieved && m.requirement()) {
            m.achieved = true;
        }
    }
}


export function calamityReset(): void {
    const requiredLevels = calamityRequirement();

    if (player.maincurrencies.Points.gte(requiredLevels)) {
        player.infinity.calamitytier =
            player.infinity.calamitytier.add(1);

        syncCalamityMilestones();

        player.maincurrencies.Points = new Decimal(0);
        player.maincurrencies.FP = new Decimal(0);

        player.repeatableUpgrades.forEach(u => {
            u.amountbought = new Decimal(0);
            u.scaling();
        });

        player.fupgrades.forEach(u => (u.bought = false));
        player.pupgrades.forEach(u => (u.bought = false));

        player.infinity.matter = new Decimal("1");
        player.infinity.matterX = new Decimal("0");
        player.infinity.hmatter = new Decimal("0");

        player.crops.forEach(u => (u.amount = new Decimal("0")));

        requirelessinfinity();
    }
}

export function calamityRequirement(): Decimal {
    const base = new Decimal("1e400");
    return base.mul(Decimal.pow("1e200", player.infinity.calamitytier));
}
