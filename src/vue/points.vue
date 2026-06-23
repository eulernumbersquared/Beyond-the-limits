<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { formatNumber } from '../format'
import { player } from '../main'
import { buyUpgrade, buyRepeatable, upgradeDescriptions, upgradeCosts, getRepeatableCost } from '../points'

const activeTab = ref<'upgrades' | 'repeatables'>('upgrades')

onMounted(() => {
  const savedTab = localStorage.getItem('activeUpgradeTab')
  if (savedTab === 'upgrades' || savedTab === 'repeatables') {
    activeTab.value = savedTab as 'upgrades' | 'repeatables'
  }
})

watch(activeTab, (newTab) => {
  localStorage.setItem('activeUpgradeTab', newTab)
})

const visibleUpgrades = computed(() => {
  const lastBoughtIndex = player.pupgrades.findIndex(
    (u: typeof player.pupgrades[number]) => !u?.bought
  )
  return lastBoughtIndex === -1 
    ? player.pupgrades 
    : player.pupgrades.slice(0, lastBoughtIndex + 1)
})

const visibleRepeatables = computed(() => {
  if (player.FCo.inFinalCorruption) {
    return player.repeatableUpgrades.length ? [player.repeatableUpgrades[0]] : []
  }
  if (player.pupgrades[19]?.bought) {
    return player.repeatableUpgrades
  }
  return []
})
</script>

<template>
  <div id="tabs">
    <button @click="activeTab = 'upgrades'" :class="{ active: activeTab === 'upgrades' }">Upgrades</button>
    <button @click="activeTab = 'repeatables'" :class="{ active: activeTab === 'repeatables' }" v-if="player.pupgrades[19]?.bought || player.FCo.inFinalCorruption">Repeatables</button>
  </div>

  <div v-if="activeTab === 'upgrades'" id="upgrades">
    <div 
      v-for="(upgrade, index) in visibleUpgrades" 
      :key="upgrade.title"
      class="upgrade"
      :class="{ bought: upgrade.bought }"
    >
      <h3>{{ upgrade.title }}</h3>
      <p v-html="upgradeDescriptions[index as number]"></p>
      <p>Cost: {{ formatNumber(upgradeCosts[index as number]) }}</p>
      <p v-if="upgrade.effectDisplay">{{ upgrade.effectDisplay() }}</p>
      <button @click="buyUpgrade(index as number)" :disabled="upgrade.bought">
        {{ upgrade.bought ? "Purchased" : "Buy upgrade" }}
      </button>
    </div>
  </div>

  <div v-if="activeTab === 'repeatables'" id="repeatables">
    <div 
      v-for="(rupg, idx) in visibleRepeatables" 
      :key="rupg.title"
      class="repeatable"
      :class="'repeatable-' + idx"
    >
      <h3>{{ rupg.title }}</h3>
      <p>{{ rupg.description }}</p>
      <p>Cost: {{ formatNumber(getRepeatableCost(rupg)) }}</p>
      <p>Effect: {{ typeof rupg.effectDisplay === 'function' ? rupg.effectDisplay() : rupg.effectDisplay }}</p>
      <p>Purchased: {{ rupg.amountbought?.toString() }}</p>
      <button @click="buyRepeatable(rupg)">
        Purchase
      </button>
    </div>
  </div>
</template>


<style scoped>
#tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 1rem;
}
#tabs button {
  background: black;
  color: crimson;
  border: 2px solid crimson;
  padding: 8px 16px;
  font-family: 'Orbitron', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}
#tabs button:hover {
  box-shadow: 0 0 10px crimson;
  text-shadow: 0 0 5px crimson;
}
#tabs button.active {
  background: crimson;
  color: white;
  border-color: crimson;
  text-shadow: 0 0 10px crimson;
  box-shadow: 0 0 15px crimson;
}

#upgrades {
  display: flex;           
  flex-wrap: wrap;            
  gap: 1rem;                  
  justify-content: center;
  color: rgb(255, 0, 0);
  text-shadow: 0 0 5px rgb(255, 0, 0);
  font-family: monospace;
  text-align: center;
}

.upgrade {
  border: 2px solid rgb(255, 2, 53);
  width: 300px;
  min-height: 150px;
  padding: 10px;
  margin: 10px 0;
  color: rgb(255, 0, 0);
  font-family: monospace;
  text-align: center;
  transition: all 0.3s ease;
}
.upgrade h3 {
  margin: 0;      
  font-size: 1.2rem;       
  line-height: 1.4;    
  color: inherit;     
}

/* Purchase button */
.upgrade button {
  background: black;
  color: crimson;
  border: 2px solid crimson;
  width: 150px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.upgrade button:hover {
  box-shadow: 0 0 10px crimson;
  text-shadow: 0 0 5px crimson;
}

/* Bought state — lime override */
.upgrade.bought {
  border-color: lime;
  color: lime;
  text-shadow: 0 0 10px lime;
}
.upgrade.bought button {
  background: black !important;
  border-color: lime !important;
  color: lime !important;
  text-shadow: 0 0 10px lime !important;
  box-shadow: 0 0 15px lime !important;
}

/* Repeatables container */
#repeatables {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  font-family: monospace;
  text-align: center;
}

/* Repeatables base */
.repeatable {
  width: 300px;
  min-height: 150px;
  padding: 10px;
  margin: 10px;
  font-family: monospace;
  text-align: center;
  transition: all 0.3s ease;
}


.repeatable-0 {
  border: 2px dashed cyan;
  color: cyan;
  background-color: rgba(0,0,0,0.7);
  box-shadow: 0 0 10px cyan;
}
.repeatable-0 button {
  background: black;
  border: 2px solid cyan;
  color: cyan;
  cursor: pointer;
  transition: all 0.3s ease;
}
.repeatable-0 button:hover {
  box-shadow: 0 0 10px cyan;
  text-shadow: 0 0 5px cyan;
}


.repeatable-1 {
  border: 2px solid purple;
  color: violet;
  background: linear-gradient(black, purple);
  box-shadow: 0 0 15px violet;
}
.repeatable-1 button {
  background: black;
  border: 2px solid violet;
  color: violet;
  cursor: pointer;
  transition: all 0.3s ease;
}
.repeatable-1 button:hover {
  box-shadow: 0 0 15px violet;
  text-shadow: 0 0 5px violet;
}


.repeatable-2 {
  border: 2px solid gold;
  color: gold;
  background: linear-gradient(black, darkblue);
  box-shadow: 0 0 15px gold;
}
.repeatable-2 button {
  background: black;
  border: 2px solid gold;
  color: gold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.repeatable-2 button:hover {
  box-shadow: 0 0 15px gold;
  text-shadow: 0 0 5px gold;
}
</style>
