<script setup lang="ts">
import { pupgrades } from './points'
import { computed } from 'vue'

// show upgrades up to the last bought one + 1
const visibleUpgrades = computed(() => {
  const lastBoughtIndex = pupgrades.findIndex(u => !u.bought)
  return lastBoughtIndex === -1 
    ? pupgrades 
    : pupgrades.slice(0, lastBoughtIndex + 1)
})

function buyUpgrade(upgrade: { bought: boolean }) {
  upgrade.bought = true
}
</script>

<template>
  <div id="upgrades">
    <div 
      v-for="upgrade in visibleUpgrades" 
      :key="upgrade.title"
      class="upgrade"
      :class="{ bought: upgrade.bought }"
    >
      <h3>{{ upgrade.title }}</h3>
      <p>{{ upgrade.description }}</p>
      <p>Cost: {{ upgrade.cost.toString() }}</p>
      <button @click="buyUpgrade(upgrade)" :disabled="upgrade.bought">
        {{ upgrade.bought ? "Purchased" : "Buy upgrade" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
#upgrades {
  display: flex;           
  flex-wrap: wrap;            
  gap: 1rem;                  
  justify-content: center;
}

.upgrade {
  border: 2px solid rgb(255, 0, 0);
  padding: 1rem;
  min-width: 150px;
  text-align: center;
}
</style>

<style>
.upgrade {
  border: 2px solid rgb(255, 2, 53);
  width: 300px;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  color: rgb(255, 0, 0);
  font-family: monospace;
  text-align: center;
  transition: all 0.3s ease;
}

.upgrade button {
  color: rgb(255, 0, 0);
  width: 150px;
  height: 50px;
  background-color: black;
  border: 2px solid red;
  cursor: pointer;
}
.upgrade.bought {
  border-color: lime;
  color: lime;
  text-shadow: 0 0 10px lime;
}

.upgrade.bought button {
  border-color: lime;
  color: lime;
  text-shadow: 0 0 10px lime;
}
</style>
