<script setup lang="ts">
import { canResetFinity, resetFinity, FPgain } from "../finity";
import { player } from "../main";
import { formatNumber } from "../format";
</script>

<template>
  <div class="finity-container" v-if="player.finity.unlocked">
    
    <button 
  v-if="player.finity.unlocked && player.pupgrades[14].bought"
      :disabled="!canResetFinity()" 
      class="finity-btn" 
      @click="resetFinity"
    >
      Enter the Finity and gain {{ formatNumber(FPgain()) }} FP
    </button>

    <p v-else class="finity-locked">
      You need point upgrade 15 to finity!
    </p>
  </div>
</template>

<style scoped>
.finity-container {
  text-align: center;
  margin: 40px 0;
}

.finity-text {
  margin-top: 14px;
  color: gold;
  font-family: 'Orbitron', monospace;
  font-size: 20px;
  text-shadow: 0 0 12px gold;
}

.finity-btn {
  width: 280px;
  height: 105px;
  background: linear-gradient(90deg, #0f0c29, #302b63, #f5af19);
  color: white;
  border: 3px solid #fff;
  font-family: 'Orbitron', monospace;
  font-size: 18px;
  text-shadow: 0 0 15px black;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  letter-spacing: 2px;
}

.finity-btn:hover:enabled {
  box-shadow: 0 0 25px red, 0 0 25px purple, 0 0 25px gold;
  transform: scale(1.05);
}

.finity-btn:disabled {
  background: #333;
  border-color: #666;
  color: #999;
  cursor: not-allowed;
  text-shadow: none;
}

.finity-locked {
  margin-top: 20px;
  color: #ffcc00;
  font-family: 'Orbitron', monospace;
  font-size: 18px;
  text-shadow: 0 0 8px #ffcc00;
  text-align: center;
}
</style>
