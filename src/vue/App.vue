<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Dialogue from './dialogue.vue'
import Points from './points.vue'
import { pointgen, pupgrades } from '../points.ts'
import Matterions from './matterions.vue'
import { formatNumber } from '../format.ts'
import { hardReset } from '../save.ts'
import Finity from './finity.vue'
import Settings from './settings.vue'
import Finityupgrades from './finityupgrades.vue'
import Corruption from './corruption.vue'
import { secretdebug, balancefixing, failing, okthisoneisforpoints, activateDialogue, dialogueInput, debugToFupgrade6 } from '../basicallyallthetesting.ts'
import { player } from '../main.ts'
import FC from './FC.vue'
import CMM from './CMM.vue'
import Decorruptionizer from './Decorruptionizer.vue'
import Infinity from './infinity.vue'

const fpAmount = ref<number>(0)
const pointA = ref<number>(0)
function addFP() { secretdebug(fpAmount.value) }
function addPoint() { okthisoneisforpoints(pointA.value) }

function makePersistentTab(key: string, options: string[], initial: string) {
  const tab = ref(initial)
  onMounted(() => {
    const saved = localStorage.getItem(key)
    if (saved && options.includes(saved)) tab.value = saved
  })
  watch(tab, (newVal) => localStorage.setItem(key, newVal))
  return tab
}

const tabs = ['Upgrades', 'Matterions', 'Finity', 'Infinity', 'Settings', 'CMM', 'Decorruptionizer']
const activeTab = makePersistentTab('activeTab', tabs, 'Upgrades')

const visibleTabs = computed(() => {
  return tabs.filter(t => {
    if (t === 'Matterions') return player.pupgrades[2]?.bought && !player.FCo.inFinalCorruption
    if (t === 'Finity') return (player.finity.unlocked || player.pupgrades[14]?.bought) && !player.FCo.inFinalCorruption
    if (t === 'Repeatables') return pupgrades[19]?.bought
    if (t === 'CMM') return player.pupgrades[9]?.bought && player.FCo.inFinalCorruption
    if (t === 'Decorruptionizer') return player.FCo.inFinalCorruption && player.pupgrades[16]?.bought
    if (t === 'Infinity') return  player.infinity.amount.gte(1) || player.maincurrencies.Points.gte(1.79e308)
    return true
  })
})

const finityTabs = computed(() => {
  const base = ['Upgrades']
  if (player.fupgrades[1]?.bought) base.push('Corruption')
  if (player.fupgrades[6]?.bought) base.push('Final Corruption')
  return base
})
const activeFinityTab = makePersistentTab('activeFinityTab', finityTabs.value, 'Upgrades')
</script>



<template>
 <!-- <p>Debug: FC={{ player.FCo.inFinalCorruption }} | Upg16={{ pupgrades[16]?.bought }}</p>
  <button @click="hardReset()">unstylized button.mp4</button>
  <button @click="failing()">return of unstylized button.mp3</button>
  <button @click="balancefixing()">ok this button does something useful</button>
  <button @click="debugToFupgrade6()">instant fupgrade 6 setup</button>
  <input type="Decimal" v-model.number="fpAmount" placeholder="Enter FP to add" />
  <button @click="addFP()">Add FP</button>


    <div>
    <input v-model="dialogueInput" placeholder="Enter dialogue ID" />
    <button @click="activateDialogue">Start Dialogue</button>
  </div>


  <input type="Decimal" v-model.number="pointA" placeholder ="Points!!!" />
  <button @click="addPoint()">ok now this is for points</button> -->

  <div id="app" :class="{ finalcorruption: player.FCo.inFinalCorruption }">
    <h1 id="points">
      Points: {{ formatNumber(player.maincurrencies.Points) }} ({{ formatNumber(pointgen()) }}/s)
    </h1>
    <span v-if="player.corrupt.Incorruption && !player.FCo.inFinalCorruption" class="Basicwarningtext" id="corruption">
      You are currently inside the corruption!
    </span>
    <span v-if="player.FCo.inFinalCorruption" class="Basicwarningtext">
      You are currently in the FINAL CORRUPTION.
    </span>
    <Finity />
    <Dialogue />

    <div id="tabs">
      <div class="tab-buttons">
        <button 
          v-for="tab in visibleTabs" 
          :key="tab" 
          :class="['tab-btn', tab.toLowerCase(), { active: activeTab === tab }]"
          @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>

      <div v-if="activeTab === 'Upgrades'">
        <Points />
      </div>

            <div v-if="activeTab === 'Matterions' && !player.corrupt.Incorruption">
        <Matterions />
      </div>
              <div v-if="activeTab === 'Decorruptionizer'">
          <Decorruptionizer />
        </div>
        <div v-if="activeTab === 'CMM'">
          <CMM />
        </div>
      <div v-if="activeTab === 'Finity'">
        <div class="sub-tab-buttons">
          <button 
            v-for="tab in finityTabs" 
            :key="tab" 
            :class="['sub-tab-btn', tab.toLowerCase(), { active: activeFinityTab === tab }]"
            @click="activeFinityTab = tab">
            {{ tab }}
          </button>
        </div>
        <div v-if="activeFinityTab === 'Upgrades'">
          <Finityupgrades />
        </div>
        <div v-if="activeFinityTab === 'Corruption' && player.fupgrades[1]?.bought">
          <Corruption />
        </div>
        <div v-if="activeFinityTab === 'Final Corruption' && player.FCo.FCunl">
            <FC />
      </div>
      </div>

      <div v-if="activeTab === 'Settings'">
        <Settings />
      </div>
      <div v-if="activeTab === 'Infinity'">
        <Infinity />
      </div>
    </div>
  </div>
</template>
<style>
body {
  margin: 0;
  background-color: #000000;
}

#points { 
  color: rgb(255, 0, 0);
  text-shadow: 0 0 5px rgb(255, 0, 0);
  font-family: monospace;
  text-align: center;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.tab-buttons button {
  background: black;
  color: rgb(230, 0, 0);
  border: 2px solid crimson;
  padding: 8px 16px;
  margin: 0 5px;
  font-family: 'Orbitron', monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-buttons button.active {
  background: crimson;
  color: white;
}

.tab-content {
  border: 2px solid crimson;
  padding: 20px;
  min-height: 200px;
  color: rgb(255, 0, 0);
  font-family: monospace;
}
.tab-content h2 {
  color: rgb(255, 0, 0);
  text-shadow: 0 0 5px crimson;
  text-align: center;
}
.tab-btn {
  padding: 10px 20px;
  margin: 5px;
  font-family: 'Orbitron', monospace;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  border: 2px solid transparent;
}

.tab-btn.settings {
  background: #222;
  color: gold;
  border-color: gold;
  text-shadow: 0 0 8px gold;
}

.tab-btn.settings:hover {
  background: gold;
  color: black;
  box-shadow: 0 0 15px gold;
}

.tab-btn.matterions {
  background: linear-gradient(90deg, red, purple, gold);
  color: white;
  border: 2px solid #fff;
  text-shadow: 0 0 6px black;
}

.tab-btn.matterions:hover {
  box-shadow: 0 0 15px red, 0 0 15px purple, 0 0 15px gold;
  transform: scale(1.05);
}

.sub-tab-buttons {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.sub-tab-btn {
  background: #111;
  color: gold;
  border: 2px solid gold;
  padding: 8px 16px;
  margin: 0 6px;
  font-family: 'Orbitron', monospace;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 6px gold, 0 0 10px purple;
}

.sub-tab-btn:hover {
  background: rgb(146, 125, 8);
  color: black;
  box-shadow: 0 0 15px gold, 0 0 20px purple;
  transform: scale(1.05);
}

.sub-tab-btn.active {
  background: gold;
  color: white;
  border-color: gold;
  text-shadow: 0 0 10px gold, 0 0 15px purple;
  box-shadow: 0 0 20px gold, 0 0 30px purple;
}
.sub-tab-btn.corruption {
  background: #1a001a;
  color: #c77dff;
  border: 2px solid purple;
  text-shadow: 0 0 6px purple, 0 0 12px black;
}

.sub-tab-btn.corruption:hover {
  background: purple;
  color: white;
  box-shadow: 0 0 15px purple, 0 0 25px black;
  transform: scale(1.05);
}

.sub-tab-btn.corruption.active {
  background: black;
  color: #e0b3ff; /* softer glowing purple */
  border-color: purple;
  text-shadow: 0 0 10px purple, 0 0 20px black;
  box-shadow: 0 0 20px purple, 0 0 30px black;
}
/* Finity tab: bright yellow glow */
.tab-btn.finity {
  background: #222; /* dark base so yellow pops */
  color: #ffeb3b;   /* bright yellow text */
  border: 2px solid #ffeb3b;
  text-shadow: 0 0 8px #ffeb3b, 0 0 12px orange;
  box-shadow: 0 0 10px rgba(255, 235, 59, 0.6), 0 0 20px rgba(255, 165, 0, 0.6);
  transition: all 0.3s ease;
}

.tab-btn.finity:hover {
  background: yellow;
  color: black;
  box-shadow: 0 0 20px #ffeb3b, 0 0 30px orange;
  transform: scale(1.08);
}

.tab-btn.finity.active {
  background: rgb(238, 255, 0);
  color: black;
  border-color: #ffeb3b;
  text-shadow: 0 0 12px #ffeb3b, 0 0 20px orange;
  box-shadow: 0 0 25px #ffeb3b, 0 0 40px orange;
}
.Basicwarningtext {
  font-family: retro, monospace;
  color: crimson;
  text-shadow: 0 0 10px crimson;
  display: block;
  margin: 10px auto;
  font-size: 1.2rem;
  text-align: center;
}
.Basicwarningtext#corruption {
  font-family: retro, monospace;
  color: #c77dff;
  text-shadow: 0 0 10px #c77dff, 0 0 20px purple;
}
.tab-btn.infinity {
  background: #000814;
  color: #00e5ff;
  border: 2px solid #00e5ff;
  text-shadow: 0 0 8px #00e5ff, 0 0 12px #0077ff;
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.7), 0 0 25px rgba(0, 119, 255, 0.6);
  transition: all 0.3s ease;
}

.tab-btn.infinity:hover {
  background: #00e5ff;
  color: black;
  box-shadow: 0 0 20px #00e5ff, 0 0 35px #0077ff;
  transform: scale(1.08);
}

.tab-btn.infinity.active {
  background: #0077ff;
  color: white;
  border-color: #00e5ff;
  text-shadow: 0 0 12px #00e5ff, 0 0 20px #0077ff;
  box-shadow: 0 0 25px #00e5ff, 0 0 40px #0077ff;
}
.finalcorruption {
  background-color: #000;
  color: #c77dff;
}

.finalcorruption h1,
.finalcorruption h2,
.finalcorruption h3,
.finalcorruption p,
.finalcorruption span,
.finalcorruption .Basicwarningtext {
  color: #c77dff !important;
  text-shadow: 0 0 10px #c77dff, 0 0 20px purple !important;
}

.finalcorruption .tab-btn,
.finalcorruption .sub-tab-btn {
  background: #1a001a !important;
  color: #e0b3ff !important;
  border: 2px solid purple !important;
  text-shadow: 0 0 8px purple, 0 0 12px black !important;
}

.finalcorruption .tab-btn.active,
.finalcorruption .sub-tab-btn.active {
  background: purple !important;
  color: white !important;
  border-color: #c77dff !important;
  box-shadow: 0 0 20px purple, 0 0 30px black !important;
}

.finalcorruption button {
  background: #2a0033 !important;
  color: #e0b3ff !important;
  border: 2px solid purple !important;
  text-shadow: 0 0 6px purple !important;
}

.finalcorruption button:hover {
  background: purple !important;
  color: white !important;
  box-shadow: 0 0 15px purple, 0 0 25px black !important;
}

/* Upgrade cards */
.finalcorruption .upgrade,
.finalcorruption .matter-box {
  background: rgba(30, 0, 40, 0.8) !important;
  border: 2px solid purple !important;
  color: #c77dff !important;
  text-shadow: 0 0 8px purple !important;
}

</style>

