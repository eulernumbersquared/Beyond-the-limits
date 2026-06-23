<script setup lang="ts">
import { enterCorruption, exitCorruption, corruptionTick, calculatepointboosting } from "../corruption"
import { player } from '../main'
import { formatNumber } from "../format"
</script>

<template>
  <div id="corruption" v-if="!player.FCo.inFinalCorruption">
    <img class="corruption-image" src="/images/corruption.png" alt="CorruptionAura" />

    <h2 class="title">The corruption</h2>
    <h3 class="title">Based on best points in the corruption. Gain corruption points!</h3>

    
    <div class="corruption-stats">
      <h3>Corruption Points: <span class="value">{{ formatNumber(player.corrupt.Cpoints) }}</span></h3>
      <h3>Gain Rate: <span class="value">+{{ formatNumber(corruptionTick()) }}/s</span></h3>
      <h3>Best Points in Corruption: <span class="value">{{ formatNumber(player.corrupt.BPiC) }}</span></h3>
      <h3>Boosting Points: <span class="value">{{ formatNumber(calculatepointboosting()) }}x</span></h3>
    </div>

    
    <div class="corruption-penalties">
      <h2>Corruption Penalties</h2>
      <p>Matterions disabled</p>
      <p>Point gain ^0.5</p>
      <p>Corruption's boost to points is disabled!</p>
    </div>

    
    <div class="corruption-controls">
      <button v-if="!player.corrupt.Incorruption" @click="enterCorruption()">Enter Corruption (Does a finity reset!)</button>
      <button v-else @click="exitCorruption()">Exit Corruption</button>
    </div>
  </div>
</template>

<style scoped>
#corruption {
  margin: 20px auto;
  padding: 20px;
  max-width: 700px;
  position: relative;
  overflow: hidden;
  color: #c77dff;
  font-family: retro, monospace;
  text-align: center;
  border: 2px solid #5a0066;
  border-radius: 12px;
  box-shadow: 0 0 40px #5a0066, inset 0 0 50px #120022;
  background: radial-gradient(circle at center, #1a001a 0%, #000000 100%);
}

/* Image styling */
.corruption-image {
  display: block;
  height: 150px;
  margin: 0 auto 20px;
  object-fit: contain;
  border: none;
  box-shadow: none;
  border-radius: 0;
  transform: translateX(10px); /* shift slightly to the right */
}

/* Stats section */
.corruption-stats {
  margin: 15px 0;
  padding: 15px;
  background: repeating-linear-gradient(
    135deg,
    #1a001a,
    #0a000a 20px,
    #220022 40px
  );
  border: 2px solid #8a00cc;
  border-radius: 8px;
  box-shadow: inset 0 0 25px #8a00cc, 0 0 15px #220022;
}

.corruption-stats h3 {
  margin: 8px 0;
  color: #e0b3ff;
  text-shadow: 0 0 12px #8a00cc;
}

.value {
  font-weight: bold;
  color: #ffeb3b;
  text-shadow: 0 0 15px #ffeb3b, 0 0 25px orange;
}

/* Penalties section */
.corruption-penalties {
  margin: 22px 0;
  padding: 15px;
  background: repeating-radial-gradient(
    circle,
    #220022,
    #0a000a 40px,
    #1a001a 80px
  );
  border: 2px solid #8a00cc;
  border-radius: 8px;
  box-shadow: inset 0 0 20px #8a00cc, 0 0 15px #220022;
}

.corruption-penalties h2 {
  color: #c77dff;
  text-shadow: 0 0 12px #8a00cc;
  margin-top: 5px;
}

.corruption-penalties p {
  margin: 5px 0;
  color: #e0b3ff;
  text-shadow: 0 0 8px #8a00cc;
}

/* Controls */
.corruption-controls button {
  background: #0a000a;
  color: #c77dff;
  border: 2px solid #8a00cc;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 6px;
  font-family: retro, monospace;
  text-shadow: 0 0 10px #8a00cc;
  box-shadow: 0 0 15px #220022;
  width: 400px;
  height: 100px;
  font-size: 1.5em;
}

.corruption-controls button:hover {
  background: #8a00cc;
  color: white;
  box-shadow: 0 0 25px #8a00cc, 0 0 35px black;
}
</style>
