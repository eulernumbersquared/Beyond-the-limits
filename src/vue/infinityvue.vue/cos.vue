<script setup lang="ts">
import { formatNumber } from '../../format';
import { buyCosmicRepeat, cosmicGain, cosmicRepeats, cosmicReset } from '../../infinity/ss';
import { player } from '../../player';

</script>

<template>
    <h1 class="headingforthestar">You have {{formatNumber(player.infinity.stats.CosP)}} cosmic points</h1>
    <h1 class="headingforthestar" v-if="player.infinity.stats.SP.gte(1)">Since you supernovaed, you now generate cosmic points passively.</h1>
  <div class="stars">
    <div class="star"></div>
    <div class="star-text">
        COSMOS
        <button @click="cosmicReset()">Sacrifice your current stage, CE repeatables and calamity energy for {{ formatNumber(cosmicGain()) }} cosmic points.</button>
    </div>
  </div>
  <div id="cosmicRepeat">
    <div
  v-for="rupg in cosmicRepeats"
  :key="rupg.title"
  class="cosmic-repeat"
>
  <h3>{{ rupg.title }}</h3>
  <p>{{ rupg.description }}</p>

  <div class="cosmic-stats">
    <p>Cost: {{ formatNumber(rupg.cost()) }} CoSP</p>
    <p>{{ rupg.effectDisplay() }}</p>
    <p>Bought: {{ formatNumber(rupg.amountbought) }}</p>
  </div>

  <button
    class="upgrade-button"
    @click="() => {
      buyCosmicRepeat(rupg.id)
    }"
    :disabled="player.infinity.stats.CosP.lt(rupg.cost())"
  >
    Buy
  </button>
</div>
  </div>
</template>

<style>
.stars {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  overflow: clip;
}

.star {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50px;
  left: 50px;
  background: linear-gradient(135deg, blue, rgb(216, 0, 216));
  clip-path: polygon(50% 0, 79% 90%, 2% 35%, 98% 35%, 21% 90%);
  animation: spin 4s linear infinite;
}

.star-text {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: rgb(247, 246, 246);
  font-size: 24px;
  font-weight: bold;
  font-family: WR;
  z-index: 1;
  pointer-events: auto;
}
.star-text button {
    margin-top: 10px;
    background-color: rgba(215, 0, 243, 0.4);
    font-family: ST;
    font-size: 25px;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
}

.headingforthestar {
    font-family: ST;
    color: blueviolet;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
#cosmicRepeat {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  font-family: monospace;
  text-align: center;
  padding-top: 30px;
}

.cosmic-repeat {
  width: 300px;
  min-height: 150px;
  padding: 10px;
  box-sizing: border-box;
  font-family: monospace;
  text-align: center;
  color: rgb(255, 2, 255);
  background: linear-gradient(135deg, purple, blue);
  border: 1px solid rgb(199, 0, 182);
  transition: all 0.3s ease;
  
}

.cosmic-repeat:hover {
  border-color: rgb(255, 0, 212);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
}

.cosmic-repeat h3 {
  color: rgb(19, 1, 44);
}

.cosmic-repeat button {
  padding: 6px 20px;
  background: linear-gradient(135deg, purple, blue);
  border: 1px solid rgb(252, 252, 252);
  color: rgb(254, 254, 255);
  font-family: monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cosmic-repeat button:hover:not(:disabled) {
  background-color: rgb(120, 0, 0);
  box-shadow: 0 0 8px red;
}

.cosmic-repeat button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>