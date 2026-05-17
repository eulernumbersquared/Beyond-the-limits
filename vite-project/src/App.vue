<script setup lang="ts">
import { ref } from 'vue'
import { player } from './main'
import Dialogue from './dialogue.vue';
import Points from './points.vue';
import { calculatePointgain } from './points';

const tabs = ['Upgrades']
const activeTab = ref('Upgrades')
</script>

<template>
  <div id="app">
    <h1 id="points">Points: {{ player.Points }} ({{ calculatePointgain() }}/s)</h1>
    <Dialogue />
    <div id="tabs">
      <div class="tab-buttons">
        <button 
          v-for="tab in tabs" 
          :key="tab" 
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>

        <div v-if="activeTab === 'Upgrades'">
          <h2>Upgrades</h2>
          <Points />
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
  color: white;
  text-shadow: 0 0 5px chartreuse;
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
</style>
