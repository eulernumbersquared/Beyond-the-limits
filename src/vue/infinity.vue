<script setup lang="ts">
import { ref, computed } from 'vue';
import Decimal from 'break_eternity.js';
import { infinitygain, infinityreset, iupgrades, buyIUpgradesReal } from '../infinity/infinity';
import { player } from '../main';
import { formatNumber } from '../format';
import solarity from './infinityvue.vue/solarity.vue'
import CT from './infinityvue.vue/CT.vue';

const BASE_REQ = new Decimal("1.79e308");

function nextIPRequirement() {
  return BASE_REQ.pow(player.maincurrencies.IP.add(1));
}

const savedTab = (localStorage.getItem('activeTab') as 'infinity'  |'iupgrades'| 'Solarity' | null) ?? 'infinity';
const activeTab = ref<'infinity' | 'iupgrades' | 'Solarity' | 'Calamity tier'>(savedTab);


const visibleInfinityUpgrades = computed(() => {
  const lastBoughtIndex = iupgrades.findIndex(
    (u: typeof iupgrades[number]) => !u?.bought
  )
  return lastBoughtIndex === -1 
    ? iupgrades 
    : iupgrades.slice(0, lastBoughtIndex + 1)
})
</script>

<template>
  <div class="infinity-tabs">
    <button :class="{active: activeTab === 'infinity'}" @click="activeTab = 'infinity'">Infinity</button>
    <button :class="{active: activeTab === 'iupgrades'}" @click="activeTab = 'iupgrades'">Upgrades</button>
    <button :class="{active: activeTab === 'Solarity'}" @click="activeTab = 'Solarity'" v-if="iupgrades[0].bought">Solarity</button>
    <button :class="{active: activeTab === 'Calamity tier'}" @click="activeTab = 'Calamity tier'" v-if="player.infinity.solarity.solaritylevel.gte(2)">Calamity tier</button>
  </div>

  <section v-if="activeTab === 'infinity'" class="infinity-panel">
    <button 
      id="infinity-button" 
      @click="infinityreset()" 
      :class="{ disabled: player.maincurrencies.Points.lt(nextIPRequirement()) }"
    >
      Endorse the infinity for {{ formatNumber(infinitygain()) }} IP
    </button>
    <h3 class="infinity-warm">This will reset everything before this except god of corruption's completion! Good luck with the new era.</h3>
    <h1 class="infinity-ipamount">
      You currently have {{ formatNumber(player.maincurrencies.IP) }} IP 
      (Gain +1 after {{ formatNumber(nextIPRequirement()) }} points!)
    </h1>
  </section>

 

  <section v-if="activeTab === 'iupgrades'" class="infinity-panel">
    <div class="infinity-upgrade-grid">
      <div v-for="(upg, idx) in visibleInfinityUpgrades" 
           :key="upg.title" 
           class="infinity-upgrade-card"
           :class="{ bought: upg.bought }">
        <h3>{{ upg.title }}</h3>
        <p>{{ upg.description }}</p>
        <p>Cost: {{ formatNumber(upg.cost) }} IP</p>
        <button 
          :disabled="upg.bought || player.maincurrencies.IP.lt(upg.cost)" 
          @click.stop="buyIUpgradesReal(idx)"
        >
          {{ upg.bought ? 'Owned' : 'Buy' }}
        </button>
      </div>
    </div>
  </section>
  <section v-if="activeTab === 'Solarity'" class="infinity-panel">
    <solarity />
  </section>
    <section v-if="activeTab === 'Calamity tier'" class="infinity-panel">
    <c-t />
  </section>
</template>

<style scoped>
.infinity-node.locked {
  opacity: 0.5;
  cursor: not-allowed;
}
.infinity-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
  font-family: 'Courier New', monospace;
}
.infinity-tabs button {
  background: #071029;
  color: #00e5ff;
  border: 1px solid #00e5ff;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}
.infinity-tabs button.active {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white;
}
.respec-button {
  background: #000814;
  border: 2px solid #00e5ff;
  color: #00e5ff;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.respec-button:hover {
  background: #00e5ff;
  color: black;
}
.infinity-panel {
  background: rgba(0,0,0,0.25);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-family: 'Courier New', monospace;
}

#infinity-button {
  display: block;
  margin: 0 auto;
  height: 100px;
  width: 500px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #00e5ff;
  background: #000814;
  color: #00e5ff;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

#infinity-button.disabled {
  background: grey;
  color: #ccc;
  cursor: not-allowed;
}

.infinity-warm {
  margin-top: 10px;
  color: #bfe9ff;
  text-align: center;
  font-family: 'Courier New', monospace;
}
.infinity-ipamount {
  margin-top: 10px;
  color: #00e5ff;
  font-family: 'Courier New', monospace;
  text-align: center;
}

.infinity-grid {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-auto-rows: 80px;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
  font-family: 'Courier New', monospace;
}

.infinity-node {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  border-radius: 6px;
  color: white;
  font-weight: bold;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  box-shadow: 0 0 10px rgba(0,114,255,0.6);
  transition: all 0.2s ease;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  padding: 4px;
}
.infinity-node.center {
  background: linear-gradient(135deg, #ff4e50, #f9d423);
}
.infinity-node:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0,114,255,0.8);
}
.infinity-node.selected {
  outline: 2px solid #fff;
}

.infinity-node button {
  margin-top: 6px;
  padding: 8px 16px;   
  font-size: 14px;      
  border-radius: 8px;
  border: 2px solid #00e5ff; 
  background: #000814;
  color: #00e5ff;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  width: 100%;
  height: 35px;
}
.infinity-node button:hover {
  background: #00e5ff;
  color: black;
}
.infinity-node button:disabled {
  background: grey;
  color: #ccc;
  border: none;
  cursor: not-allowed;
}

.infinity-node-desc {
  margin-top: 20px;
  color: #0072ff;
  font-family: 'Courier New', monospace;
}

.infinity-upgrade-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-top: 20px;
  justify-content: center;
  font-family: 'Courier New', monospace;
}

.infinity-upgrade-grid {
  display: flex;           
  flex-wrap: wrap;            
  gap: 1rem;                  
  justify-content: center;
  color: dodgerblue;
  text-shadow: 0 0 5px dodgerblue;
  font-family: monospace;
  text-align: center;
}

.infinity-upgrade-card {
  border: 2px solid dodgerblue;
  width: 300px;
  min-height: 150px;
  padding: 10px;
  margin: 10px 0;
  color: dodgerblue;
  font-family: monospace;
  text-align: center;
  transition: all 0.3s ease;
  background: black; /* keep background black */
}
.infinity-upgrade-card h3 {
  margin: 0;      
  font-size: 1.2rem;       
  line-height: 1.4;    
  color: inherit;     
}

/* Purchase button */
.infinity-upgrade-card button {
  background: black;
  color: dodgerblue;
  border: 2px solid dodgerblue;
  width: 150px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.infinity-upgrade-card button:hover {
  box-shadow: 0 0 10px dodgerblue;
  text-shadow: 0 0 5px dodgerblue;
}

/* Bought state — lime override */
.infinity-upgrade-card.bought {
  border-color: lime;
  color: lime;
  text-shadow: 0 0 10px lime;
}
.infinity-upgrade-card.bought button {
  background: black !important;
  border-color: lime !important;
  color: lime !important;
  text-shadow: 0 0 10px lime !important;
  box-shadow: 0 0 15px lime !important;
}
</style>