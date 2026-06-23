<script setup lang="ts">
import { fupgrades, buyFpUpgrade } from '../finity'
import { computed } from 'vue'
import { formatNumber } from '../format'
import { player } from '../main'


const fpUpgrades = computed(() => {
  return player.fupgrades.map((state, i) => ({
    ...fupgrades[i],
    ...state
  }))
})

const visibleFUpgrades = computed(() => {
  const lastBoughtIndex = fpUpgrades.value.findIndex(u => !u.bought)
  return lastBoughtIndex === -1 
    ? fpUpgrades.value 
    : fpUpgrades.value.slice(0, lastBoughtIndex + 1)
})
</script>

<template>
  <div id="fp-text">FP: {{ formatNumber(player.maincurrencies.FP) }}</div>
  <div id="fp-upgrades-container">
    <div 
      v-for="(upgrade, index) in visibleFUpgrades" 
      :key="upgrade.title"
      class="fp-upgrade-card"
      :class="{ bought: upgrade.bought }"
    >
      <h3>{{ upgrade.title }}</h3>
      <p>{{ upgrade.description }}</p>
      <p>Cost: {{ formatNumber(upgrade.cost) }} FP</p>
      <p v-if="upgrade.effectDisplay">{{ (upgrade.effectDisplay()) }}</p>
      <button @click="buyFpUpgrade(index)" :disabled="upgrade.bought">
        {{ upgrade.bought ? "Purchased" : "Buy upgrade" }}
      </button>
    </div>
  </div>
</template>


<style scoped>
#fp-upgrades-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.fp-upgrade-card {
  flex: 0 0 300px;
  min-height: 150px;
  padding: 10px;
  color: gold;
  border: 2px solid gold;
  font-family: monospace;
  text-align: center;
}
#fp-display {
  margin: 20px auto;
  color: gold;
  font-family: Consolas, 'Courier New', Courier, monospace;
  font-size: 24px;
  text-shadow: 0 0 12px gold, 0 0 20px orange;
  text-align: center;
}

.fp-upgrade-card button {
  color: gold;
  width: 150px;
  height: 50px;
  background-color: black;
  border: 2px solid gold;
  cursor: pointer;
}

.fp-upgrade-card.bought {
  border-color: purple;
  color: purple;
  text-shadow: 0 0 10px purple;
}

.fp-upgrade-card.bought button {
  border-color: purple;
  color: purple;
  text-shadow: 0 0 10px purple;
}

#fp-text {
  margin: 20px auto;
  color: gold;
  font-family:  monospace;
  font-size: 24px;
  text-shadow: 0 0 12px gold, 0 0 20px orange;
  text-align: center;
}
</style>

