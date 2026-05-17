import Decimal from "break_eternity.js";
import { reactive } from "vue";

export const mattergens = reactive({
  matter1: new Decimal(0),
  matter2: new Decimal(0),
  matter3: new Decimal(0),
})


export const matterLevels = reactive({
  matter1: new Decimal(0),
  matter2: new Decimal(0),
  matter3: new Decimal(0),
})


export const matterCosts = reactive({
  matter1: new Decimal(10),
  matter2: new Decimal(100),
  matter3: new Decimal(1000),
})


export function mattergen() {
  mattergens.matter2 = mattergens.matter2.add(matterLevels.matter3)
  mattergens.matter1 = mattergens.matter1.add(matterLevels.matter2)
}
export function buyMatter(u: "matter1" | "matter2" | "matter3") {
  const cost = matterCosts[u]
  const resource = mattergens[u]

  if (resource.gte(cost)) {
    mattergens[u] = resource.sub(cost)
    matterLevels[u] = matterLevels[u].add(1)
    matterCosts[u] = cost.mul(2)
  }
}
