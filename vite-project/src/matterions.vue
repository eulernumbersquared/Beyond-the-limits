<script setup lang="ts">
import { mattergens, matterLevels, matterCosts, buyMatter } from './matterions'


const matterKeys = ["matter1", "matter2", "matter3"] as const
</script>

<template>
  <div id="matter-container">
    <div 
      v-for="key in matterKeys" 
      :key="key" 
      class="matter-box"
    >
      <h3>{{ key }}</h3>
      <p>Amount: {{ mattergens[key].toString() }}</p>
      <p>Level: {{ matterLevels[key].toString() }}</p>
      <p>Cost: {{ matterCosts[key].toString() }}</p>
      <button @click="buyMatter(key)">
        Buy {{ key }}
      </button>
    </div>
  </div>
</template>

<style scoped>
#matter-container {
  display: flex;           
  gap: 1.5rem;              
  justify-content: center;   
  flex-wrap: wrap;    
}

.matter-box {
  border: 2px solid chartreuse;
  padding: 1rem;
  min-width: 180px;
  text-align: center;
  background: black;
  color: rgb(104, 104, 104);
  font-family: retro, monospace; 
}

button {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgb(109, 109, 109);
  border: none;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background: rgb(255, 0, 0);
}
</style>
