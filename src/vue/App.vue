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
import { secretdebug, balancefixing, failing, okthisoneisforpoints, activateDialogue, dialogueInput, debugToFupgrade6, reachcalamitytier1likeagoodboy, resetce, heyheymanguesswhat } from '../basicallyallthetesting.ts'
import { player } from '../player.ts'
import FC from './FC.vue'
import CMM from './CMM.vue'
import Decorruptionizer from './Decorruptionizer.vue'
import Infinity from './infinity.vue'
import { infinitygain, requirelessinfinity } from '../infinity/infinity.ts'
import { synergyTick } from '../infinity/FoI.ts'
import Taboftheneferoustesting from './taboftheneferoustesting.vue'
// @ts-ignore Vue SFC declaration is not available for this module path.
import Delusion from './infinityvue.vue/Delusion.vue'
import { fuckingkillgod2 } from '../infinity/hind.ts'
import { FPgain } from '../finity.ts'

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

const tabs = ['Upgrades', 'Matterions', 'Finity', 'Infinity', 'Settings', 'CMM', 'Decorruptionizer', 'Delusion']
const activeTab = makePersistentTab('activeTab', tabs, 'Upgrades')

const visibleTabs = computed(() => {
  return tabs.filter(t => {
    if (t === 'Matterions') return player.pupgrades[2]?.bought && !player.FCo.inFinalCorruption
    if (t === 'Finity') return (player.finity.unlocked || player.pupgrades[14]?.bought) && !player.FCo.inFinalCorruption
    if (t === 'Repeatables') return pupgrades[19]?.bought
    if (t === 'CMM') return player.pupgrades[9]?.bought && player.FCo.inFinalCorruption
    if (t === 'Decorruptionizer') return player.FCo.inFinalCorruption && player.pupgrades[16]?.bought
    if (t === 'Infinity') return  player.infinity.amount.gte(1) || player.maincurrencies.Points.gte(1.79e308) || player.maincurrencies.IP.gte(0.01)
    if (t === 'Delusion') return player.gods.good2com
    return true
  })
})

const finityTabs = computed(() => {
  const base = ['Upgrades']
  if (player.pupgrades[14].bought) base.push('Finity')
  if (player.fupgrades[1]?.bought) base.push('Corruption')
  if (player.fupgrades[6]?.bought) base.push('Final Corruption')
  return base
})
const activeFinityTab = makePersistentTab('activeFinityTab', finityTabs.value, 'Upgrades')
watch(() => player.infinity.del.inDel, (inDel) => {
  document.body.classList.toggle('delusion-mode', inDel)
}, { immediate: true })

</script>

<template>
  <!--
 <p>Debug: FC={{ player.FCo.inFinalCorruption }} | Upg16={{ pupgrades[16]?.bought }}</p>
  <button @click="hardReset()">unstylized button.mp4</button>
  <button @click="failing()">return of unstylized button.mp3</button>
  <button @click="balancefixing()">ok this button does something useful</button>
  <button @click="debugToFupgrade6()">free endgamer!!!!! (for version alpha)</button>
  <input type="Decimal" v-model.number="fpAmount" placeholder="Enter FP to add" />
  <button @click="addFP()">Add FP</button>
  <button @click="requirelessinfinity()">ok now pelase click this if ur CT2 for balancing reasons</button>
  <button @click="synergyTick()">by the grace of some gods idk cast a farm tick!</button>
    <div>
    <input v-model="dialogueInput" placeholder="Enter dialogue ID" />
    <button @click="activateDialogue">Start Dialogue</button>
  </div>
  <button @click="reachcalamitytier1likeagoodboy()">CT1 scary</button>
<button @click="resetce()">reset CE</button>
<button @click="heyheymanguesswhat()">testing</button>
<button @click="fuckingkillgod2()">kill ananke because its very important</button>
  <input type="Decimal" v-model.number="pointA" placeholder ="Points!!!" />
  <button @click="addPoint()">ok now this is for points</button>
<div id="app" :class="{ finalcorruption: player.FCo.inFinalCorruption }"> -->
    <Dialogue />

  <div class="game-layout">

    <aside class="left-sidebar">
      <div class="sidebar-title">Navigation</div>

      <button
        v-for="tab in visibleTabs"
        :key="tab"
        :class="['tab-btn', tab.toLowerCase(), { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </aside>

    <main class="main-content">

      <h1 id="points">
        Points: {{ formatNumber(player.maincurrencies.Points) }}
        ({{ formatNumber(pointgen()) }}/s)
      </h1>

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
      @click="activeFinityTab = tab"
    >
      {{ tab }}
    </button>
  </div>

  <Finityupgrades v-if="activeFinityTab === 'Upgrades'" />
  <Finity 
  v-if="activeFinityTab === 'Finity' && player.pupgrades[14]?.bought" />
  <Corruption
    v-if="activeFinityTab === 'Corruption' && player.fupgrades[1]?.bought"
  />

  <FC
    v-if="activeFinityTab === 'Final Corruption' && player.FCo.FCunl"
  />
</div>

<div v-if="activeTab === 'Settings'">
  <Settings />
</div>

<div v-if="activeTab === 'Infinity'">
  <Infinity />
</div>

<div v-if="activeTab === 'Delusion'">
  <Delusion />
</div>

    </main>

    <aside class="right-sidebar">
      <div class="sidebar-title">Currencies</div>

      <div class="currency">
        <span>Points</span>
        <strong>{{ formatNumber(player.maincurrencies.Points) }}</strong>
        <strong> ({{ formatNumber(pointgen()) }}/s)</strong>
      </div>

      <div class="currency" id="finity" v-if="player.finity.amount.gte(1)">
        <span>FP</span>
        <strong>{{ formatNumber(player.maincurrencies.FP) }}</strong>
        <strong> (+{{ formatNumber(FPgain()) }})</strong>
      </div>
      <div class="currency" id="infinity" v-if="player.infinity.amount.gte(1)">
        <span>IP</span>
        <strong>{{ formatNumber(player.maincurrencies.IP) }}</strong>
        <strong> (+{{ formatNumber(infinitygain()) }})</strong>
      </div>
    </aside>

  </div>
</template>
<style>
#finity {
  background: #332b00;
  border-color: gold;
}

#finity strong {
  color: gold;
}

.currency#infinity {
  background: #001a33;
  border: 1px solid #00e5ff;
}

.currency#infinity strong {
  color: #00e5ff;
}
body {
  margin: 0;
  background-color: #000000;
  transition: filter 1s ease;
}

body.delusion-mode {
  filter: grayscale(0.85) brightness(0.85);
}

#app {
  min-height: 100vh;
  color: white;
  font-family: monospace;
}


.game-layout {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr) 220px;
  gap: 15px;
  padding: 15px;
  align-items: start;
  min-height: calc(100vh - 100px);
}

.left-sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  top: 10px;
  padding: 10px;
  background: #080808;
  border: 1px solid #550011;
  border-radius: 8px;
}

.sidebar-title {
  color: crimson;
  font-size: 18px;
  text-align: center;
  padding: 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid crimson;
  text-shadow: 0 0 8px crimson;
}

.tab-btn {
  width: 100%;
  padding: 12px 5px;
  margin: 0;
  font-family: ST;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid crimson;
  background: #111;
  color: crimson;
}

.tab-btn:hover {
  background: crimson;
  color: white;
  transform: translateX(3px);
  box-shadow: 0 0 12px crimson;
}

.tab-btn.active {
  background: crimson;
  color: white;
  box-shadow: 0 0 15px crimson;
}

.tab-btn.settings {
  background: #222;
  color: gold;
  border-color: gold;
}

.tab-btn.settings:hover,
.tab-btn.settings.active {
  background: gold;
  color: black;
  box-shadow: 0 0 15px gold;
}

.tab-btn.matterions {
  background: linear-gradient(90deg, red, purple, gold);
  color: white;
  border-color: white;
}

.tab-btn.matterions:hover,
.tab-btn.matterions.active {
  box-shadow: 0 0 15px red, 0 0 15px purple, 0 0 15px gold;
}

.tab-btn.finity {
  background: #222;
  color: #ffeb3b;
  border-color: #ffeb3b;
  text-shadow: 0 0 8px orange;
}

.tab-btn.finity:hover,
.tab-btn.finity.active {
  background: #eeff00;
  color: black;
  box-shadow: 0 0 20px yellow, 0 0 30px orange;
}

.tab-btn.infinity {
  background: #000814;
  color: #00e5ff;
  border-color: #00e5ff;
}

.tab-btn.infinity:hover,
.tab-btn.infinity.active {
  background: #0077ff;
  color: white;
  box-shadow: 0 0 20px #00e5ff;
}

.tab-btn.delusion {
  background: linear-gradient(90deg, #070707, white);
  color: white;
  border-color: white;
}

.tab-btn.delusion:hover,
.tab-btn.delusion.active {
  background: linear-gradient(90deg, white, #4b4b4b);
  transform: scale(1.03);
}

.main-content {
  min-width: 0;
  text-align: center;
  padding: 10px;
}

#points {
  color: rgb(252, 0, 0);
  text-shadow: 2px 2px 4px #ff3300d7;
  font-family: monospace;
  text-align: center;
  font-family: ST;
}

.right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 10px;
  padding: 10px;
  background: #000000;
  border: 1px solid #550011;
  border-radius: 8px;
}

.currency {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: #111;
  border: 1px solid crimson;
  border-radius: 5px;
  color: white;
  font-family: monospace;
  text-align: center;
  transition: 0.2s;
}

.currency:hover {
  border-color: red;
  box-shadow: 0 0 10px crimson;
}

.currency span {
  color: #aaa;
  font-size: 13px;
}

.currency strong {
  color: crimson;
  font-size: 16px;
  overflow-wrap: anywhere;
}

.sub-tab-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 15px 0;
}

.sub-tab-btn {
  background: #111;
  color: gold;
  border: 2px solid gold;
  padding: 8px 16px;
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
  box-shadow: 0 0 20px gold, 0 0 30px purple;
}

.sub-tab-btn.corruption {
  background: #1a001a;
  color: #c77dff;
  border-color: purple;
}

.sub-tab-btn.corruption:hover,
.sub-tab-btn.corruption.active {
  background: purple;
  color: white;
  box-shadow: 0 0 20px purple;
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
  color: #c77dff;
  text-shadow: 0 0 10px #c77dff, 0 0 20px purple;
}

.finalcorruption {
  background-color: #000;
  color: #c77dff;
}

.finalcorruption h1,
.finalcorruption h2,
.finalcorruption h3,
.finalcorruption p,
.finalcorruption span {
  color: #c77dff !important;
  text-shadow: 0 0 10px #c77dff, 0 0 20px purple !important;
}

.finalcorruption .left-sidebar,
.finalcorruption .right-sidebar {
  background: #080008;
  border-color: purple;
}

.finalcorruption .sidebar-title {
  color: #c77dff;
  border-color: purple;
}

.finalcorruption .tab-btn,
.finalcorruption .sub-tab-btn {
  background: #1a001a !important;
  color: #e0b3ff !important;
  border: 2px solid purple !important;
  text-shadow: 0 0 8px purple !important;
}

.finalcorruption .tab-btn.active,
.finalcorruption .sub-tab-btn.active {
  background: purple !important;
  color: white !important;
  box-shadow: 0 0 20px purple !important;
}

.finalcorruption button:hover {
  background: purple !important;
  color: white !important;
  box-shadow: 0 0 15px purple, 0 0 25px black !important;
}

.finalcorruption .currency {
  background: #1a001a;
  border-color: purple;
}

.finalcorruption .upgrade,
.finalcorruption .matter-box {
  background: rgba(30, 0, 40, 0.8) !important;
  border: 2px solid purple !important;
  color: #c77dff !important;
  text-shadow: 0 0 8px purple !important;
}

@font-face {
  font-family: 'MG';
  src: url('../font/mg-rising.otf.woff2') format('woff2');
}

@font-face {
  font-family: 'ST';
  src: url('../font/ShareTech-Regular.ttf');
}

@font-face {
  font-family: 'WR';
  src: url('../font/wannant-regular.otf');
}


@media (max-width: 1000px) {
  .game-layout {
    grid-template-columns: 125px minmax(0, 1fr);
  }

  .right-sidebar {
    grid-column: 2;
    position: static;
  }
}

@media (max-width: 550px) {
  .game-layout {
    display: flex;
    flex-direction: column;
  }

  .left-sidebar,
  .right-sidebar,
  .main-content {
    width: 100%;
    box-sizing: border-box;
    position: static;
  }

  .left-sidebar {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .left-sidebar .sidebar-title {
    grid-column: 1 / -1;
  }
}

</style>

