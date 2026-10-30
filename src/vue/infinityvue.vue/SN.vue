<script setup lang="ts">
import { formatNumber } from '../../format';
import { buySPRepeat, SPboost, SPgain, SPrepeats, SPreset } from '../../infinity/ss';
import { player } from '../../player';

</script>


<template>
    <h1 id="hithisisthesamestlye">You have {{ formatNumber(player.infinity.stats.SP) }} entropy <br>This boosts damage, defense, CE, HP and CoSP by x{{ formatNumber(SPboost()) }}!</h1>
    <h1 id="hithisisthesamestlye">At 5 entropy, enable auto-fighting.</h1>
    <h1 id="hithisisthesamestlye">At 10 entropy, autobuy calamity energy repeatables.</h1>
    <h1 id="hithisisthesamestlye">At 15 entropy, CoSP boosts entropy gain.</h1>
    <h1 id="hithisisthesamestlye">At 1 Sp entropy, autobuy CoSP repeatables.</h1>
  <div class="supernova">
    <div class="nova-glow"></div>
    <div class="nova-shockwave wave-one"></div>
    <div class="nova-shockwave wave-two"></div>
    <div class="nova-star-glow nova-star-glow-big"></div>
    <div class="nova-star-glow nova-star-glow-small"></div>
    <div class="nova-star nova-star-big"></div>
    <div class="nova-star nova-star-small"></div>
    <div class="nova-core"></div>

    <div class="nova-text">
      <p>Supernova</p>
      <button @click="SPreset()">Let an old era explode into new greatness! Gain {{ formatNumber(SPgain()) }} entropy, caused by the chaos, at the cost of all calamity energy features.</button>
    </div>
  </div>
   <div id="spRepeat">
    <div
  v-for="rupg in SPrepeats"
  :key="rupg.title"
  class="sp-repeat"
>
  <h3>{{ rupg.title }}</h3>
  <p>{{ rupg.description }}</p>

  <div class="sp-stats">
    <p>Cost: {{ formatNumber(rupg.cost()) }} CoSP</p>
    <p>{{ rupg.effectDisplay() }}</p>
    <p>Bought: {{ formatNumber(rupg.amountbought) }}</p>
  </div>

  <button
    class="upgrade-button"
    @click="() => {
      buySPRepeat(rupg.id)
    }"
    :disabled="player.infinity.stats.SP.lt(rupg.cost())"
  >
    Buy
  </button>
</div>
  </div>
</template>

<style scoped>
#spRepeat {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  font-family: monospace;
  text-align: center;
  padding-top: 30px;
}

.sp-repeat {
  width: 300px;
  min-height: 150px;
  padding: 10px;
  box-sizing: border-box;
  font-family: monospace;
  text-align: center;
  color: rgb(255, 238, 0);
  background: linear-gradient(135deg, rgb(216, 219, 22), rgb(99, 75, 9));
  border: 1px solid rgb(255, 169, 9);
  transition: all 0.3s ease;
  
}

.sp-repeat:hover {
  border-color: rgb(104, 73, 16);
  box-shadow: 0 0 10px rgba(255, 174, 0, 0.4);
}

.cosmic-repeat h3 {
  color: rgb(19, 1, 44);
}

.sp-repeat button {
  padding: 6px 20px;
  background: linear-gradient(135deg, rgb(255, 187, 0), rgb(255, 145, 0));
  border: 1px solid rgb(252, 252, 252);
  color: rgb(254, 254, 255);
  font-family: monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sp-repeat button:hover:not(:disabled) {
  background-color: rgb(120, 0, 0);
  box-shadow: 0 0 8px rgb(255, 136, 0);
}

.sp-repeat button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
#hithisisthesamestlye{
      margin: 0;
  background: linear-gradient(
    135deg,
    #fff176 0%,
    rgb(248, 223, 0) 25%,
    #fffde7 50%,
    #ff8f00 75%,
    rgb(248, 223, 0) 100%
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  font-family: ST;
}
.supernova {
  position: relative;
  width: 300px;
  height: 300px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
  pointer-events: none;
}
.nova-text button {
  margin-top: 10px;
  background: linear-gradient(
    135deg,
    rgba(255, 236, 128, 0.6),
    rgba(237, 241, 0, 0.4),
    rgba(255, 143, 0, 0.6),
    rgba(255, 241, 118, 0.4),
    rgba(255, 179, 0, 0.6)
  );
  background-size: 300% 300%;
  animation: nova-button-gradient 4s ease infinite;
  font-family: ST;
  font-size: 25px;
  color: #ffffff;
  border: none;
  width: 500px;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.4);
  transition: box-shadow 0.3s ease;
}

.nova-text button:hover {
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.8);
}

@keyframes nova-button-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.nova-text {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  color: rgb(255, 255, 255);
  font-family: WR, sans-serif;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  pointer-events: auto;
}

.nova-text p {
  margin: 0;
  background: linear-gradient(
    135deg,
    #fff176 0%,
    rgb(248, 223, 0) 25%,
    #fffde7 50%,
    #ff8f00 75%,
    rgb(248, 223, 0) 100%
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: nova-text-shine 4s ease-in-out infinite;
  filter: drop-shadow(0 0 4px rgba(255, 193, 7, 0.6));
}

@keyframes nova-text-shine {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.nova-glow {
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 220, 0.5) 0%,
    rgba(255, 220, 80, 0.25) 20%,
    rgba(255, 170, 0, 0.1) 40%,
    transparent 65%
  );
  animation: corona-pulse 3s ease-in-out infinite;
}

.nova-shockwave {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px solid rgba(255, 213, 79, 0.65);
  border-radius: 50%;
  animation: shockwave 3s ease-out infinite;
}

.wave-two {
  animation-delay: 1.5s;
}

.nova-star {
  position: absolute;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    100% 50%,
    61% 61%,
    50% 100%,
    39% 61%,
    0% 50%,
    39% 39%
  );
  background: linear-gradient(
    135deg,
    #fffde7 0%,
    #fff176 25%,
    #ffc107 55%,
    #ff8f00 80%,
    #ff6f00 100%
  );
  mix-blend-mode: screen;
}

.nova-star-big {
  width: 210px;
  height: 210px;
  opacity: 0.22;
  filter: none;
  animation:
    nova-clockwise 12s linear infinite,
    stellar-pulse 4s ease-in-out infinite;
}

.nova-star-small {
  width: 130px;
  height: 130px;
  opacity: 0.42;
  filter: none;
  animation:
    nova-counterclockwise 7s linear infinite,
    stellar-pulse 3s ease-in-out infinite reverse;
}

.nova-star-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(255, 213, 79, 0.22) 0%,
    rgba(255, 179, 0, 0.12) 35%,
    rgba(255, 140, 0, 0.04) 60%,
    transparent 70%
  );
}

.nova-star-glow-big {
  width: 260px;
  height: 260px;
  animation: corona-pulse 4s ease-in-out infinite;
}

.nova-star-glow-small {
  width: 170px;
  height: 170px;
  opacity: 0.8;
  animation: corona-pulse 3s ease-in-out infinite reverse;
}

.nova-core {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #ffffff 0%,
    #fffde7 12%,
    #ffee58 28%,
    rgba(255, 179, 0, 0.4) 50%,
    transparent 75%
  );
  animation: core-eruption 3s ease-in-out infinite;
}

@keyframes nova-clockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes nova-counterclockwise {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes stellar-pulse {
  0%, 100% { scale: 0.85; }
  50% { scale: 1.08; }
}

@keyframes corona-pulse {
  0%, 100% {
    transform: scale(0.75);
    opacity: 0.45;
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
  }
}

@keyframes shockwave {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  15% { opacity: 0.8; }
  100% {
    transform: scale(5);
    opacity: 0;
  }
}

@keyframes core-eruption {
  0%, 100% {
    transform: scale(0.65);
    filter: brightness(1);
    opacity: 0.75;
  }
  35% {
    transform: scale(1.2);
    filter: brightness(2);
    opacity: 1;
  }
  50% {
    transform: scale(1.8);
    filter: brightness(3);
    opacity: 1;
  }
  70% {
    transform: scale(1);
    filter: brightness(1.5);
    opacity: 0.9;
  }
}
</style>
