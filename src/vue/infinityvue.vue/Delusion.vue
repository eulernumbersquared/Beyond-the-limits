<script setup lang="ts">
import { formatNumber } from '../../format';
import { buyDelupgrade, delRepeats, enterdelusion, ppgain } from '../../infinity/del';
import { player } from '../../player';

</script>

<template>
  <div class="delusion">
    <h1 class="delu-text">hi ok so small spoilers like something really epic and cool was meant to happen when you reach finity in delusion but like ya your gonna have to wait for v0.3 sowwy</h1>
    <h1 class="delu-text">"False dreams arise within your eyes..."</h1>
    <h1 class="delu-texty">Best points in delusion: {{ formatNumber(player.infinity.del.bestPoints) }} <br> You have {{ formatNumber(player.infinity.del.PPoints) }} ({{ formatNumber(ppgain()) }}/s) psuedo-points.</h1>
    <button class="delu-button" @click="enterdelusion()">ENTER THE DELUSION</button>
    </div>
          <div id="hindRepeat">
    <div
  v-for="rupg in delRepeats"
  :key="rupg.title"
  class="hind-repeat"
>
  <h3>{{ rupg.title }}</h3>
  <p>{{ rupg.description }}</p>

  <div class="hind-stats">
    <p>Requies: Hindrance {{ formatNumber(rupg.cost()) }}</p>
    <p>{{ rupg.effectDisplay() }}</p>
    <p>Bought: {{ formatNumber(rupg.amountbought) }}</p>
      </div>
    <button
    class="hind-button"
    @click="() => {
      buyDelupgrade(rupg.id)
    }"
    :disabled="player.infinity.calamen.lt(rupg.cost())"
  >
    Buy
  </button>
      </div>
  </div>
</template>

<style scoped>
.delusion {
  text-align: center;
  margin: 0 auto;
}
.delu-texty {
    font-size: 2rem;
  background: linear-gradient(
    90deg,
    #000000,
    #f0e9e9,
    #000000
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-family: ST;
}

.delusion .delu-text {
  font-size: 2rem;
  background: linear-gradient(
    90deg,
    #000000,
    #f0e9e9,
    #000000
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: delu-gradient 2s linear infinite;
  font-family: ST;
}

@keyframes delu-gradient {
  from {
    background-position: 100% center;
  }
  to {
    background-position: -100% center;
  }
}
.delu-button {
  position: relative;
  margin-top: 30px;
  padding: 15px 35px;
  background: #080808;
  color: #f0e9e9;
  border: 1px solid #f0e9e9;
  font-family: inherit;
  font-size: 1.2rem;
  letter-spacing: 3px;
  cursor: pointer;
  isolation: isolate;
  transition: background 0.3s, color 0.3s;
  font-family: ST;
}

.delu-button::before {
  content: "";
  position: absolute;
  inset: -2px;
  border: 1px solid #f0e9e9;
  pointer-events: none;
  z-index: -1;
  animation: delu-pulse 2s ease-out infinite;
}

@keyframes delu-pulse {
  0% {
    transform: scale(1);
    opacity: 0.9;
    box-shadow: 0 0 5px #f0e9e9;
  }
  100% {
    transform: scale(1.15, 1.5);
    opacity: 0;
    box-shadow: 0 0 20px #f0e9e9;
  }
}

.delu-button:hover {
  background: #f0e9e9;
  color: #080808;
}
#hindRepeat {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 30px auto;
  font-family: ST;
  text-align: center;
}

.hind-repeat {
  position: relative;
  width: 280px;
  padding: 15px;
  background: #080808;
  color: #f0e9e9;
  border: 1px solid #f0e9e9;
  isolation: isolate;
  transition: background 0.3s, color 0.3s;
}

.hind-repeat:hover {
  background: #1c1c1c;
  box-shadow: 0 0 12px #f0e9e955;
}

.hind-repeat h3 {
  font-family: ST;
  font-size: 1.3rem;
}

.hind-stats {
  font-size: 0.95rem;
}

.hind-button {
  position: relative;
  margin-top: 10px;
  padding: 10px 25px;
  background: #080808;
  color: #f0e9e9;
  border: 1px solid #f0e9e9;
  font-family: ST;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

.hind-button::before {
  content: "";
  position: absolute;
  inset: -2px;
  border: 1px solid #f0e9e9;
  pointer-events: none;
  z-index: -1;
  animation: delu-pulse 2s ease-out infinite;
}

.hind-button:hover:not(:disabled) {
  background: #f0e9e9;
  color: #080808;
}

.hind-button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.hind-button:disabled::before {
  animation: none;
}
</style>