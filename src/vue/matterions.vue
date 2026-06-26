<script setup lang="ts">
import { monoboost, monogen, getUpgradeCost, trigen, buyUpgrade, realityfocus, focus, duogen } from '../matterions'
import { formatNumber } from '../format'
import { player } from '../main';
</script>

<template>
  <h1 id="boost">
    Mono-matterion is currently boosting points by x{{ formatNumber(monoboost()) }}
  </h1>

  <div id="matter-container">
    <div class="matter-box mono-box">
     <h3>Mono-matterion</h3>
      <p>Amount: {{ formatNumber(player.mattergens.mono) }}</p>
      <p>Levels: {{ formatNumber(player.mattergens.ML) }}</p>
      <p>Boosting points by x{{ formatNumber(monoboost()) }}</p>
      <p>Cost: {{ formatNumber(getUpgradeCost('mono')) }} Points</p>
      <button class="mono-btn" @click="buyUpgrade('mono')">Buy Mono-matterion</button>
    </div>

    <div class="matter-box duo-box">
      <h3>Duo-matterion</h3>
      <p>Amount: {{ formatNumber(player.mattergens.duo) }}</p>
      <p>Levels: {{ formatNumber(player.mattergens.DL) }}</p>
      <p>Generation: +{{ formatNumber(monogen()) }} Mono/s</p>
      <p>Cost: {{ formatNumber(getUpgradeCost('duo')) }} Points</p>
      <button class="duo-btn" @click="buyUpgrade('duo')">Buy Duo-matterion</button>
    </div>

    <div class="matter-box tri-box">
      <h3>Tri-matterion</h3>
      <p>Amount: {{ formatNumber(player.mattergens.tri) }}</p>
      <p>Levels: {{ formatNumber(player.mattergens.TL) }}</p>
      <p>Generation: +{{ formatNumber(duogen()) }} Duo/s</p>
      <p>Cost: {{ formatNumber(getUpgradeCost('tri')) }} Points</p>
      <button class="tri-btn" @click="buyUpgrade('tri')">Buy Tri-matterion</button>
    </div>
  </div>

  <div id="focus-section" v-if="player.pupgrades[3].bought">
    <h2>Matterion Focus</h2>
    <p id="description">Focus on certain matterions to gain unique effects</p>
    <div id="focus-buttons">
      <div class="focus-card">
        <h3>Mono-matterion</h3>
        <p>Boosts Tri's and Duo's effect by x1.5 and x2 the point boost</p>
        <button 
          @click="player.mattergens.Mfocus = true; player.mattergens.Dfocus = false; player.mattergens.Tfocus = false; realityfocus()"
          :class="{ focused: focus() === 'monofocus' }">
          Focus Mono
        </button>
      </div>

      <div class="focus-card">
        <h3>Duo-matterion</h3>
        <p>Boost Duo's effect by x2</p>
        <button 
          @click="player.mattergens.Dfocus = true; player.mattergens.Mfocus = false; player.mattergens.Tfocus = false; realityfocus()"
          :class="{ focused: focus() === 'duofocus' }"
        >
          Focus Duo
        </button>
      </div>

      <div class="focus-card">
        <h3>Tri-matterion</h3>
        <p>Gain +{{ formatNumber(trigen()) }} Tri per second and multiply its effect by x2</p>
        <button 
          @click="player.mattergens.Tfocus = true; player.mattergens.Mfocus = false; player.mattergens.Dfocus = false; realityfocus()"
          :class="{ focused: focus() === 'trifocus' }"
        >
          Focus Tri
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
#boost {
  gap: 1.5rem;
  color: red;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
}

#matter-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.matter-box {
  padding: 1.5rem;
  width: 320px;
  text-align: center;
  background: linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(0,0,0,0.8));
  color: rgb(220,220,220);
  font-family: monospace;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(255,255,255,0.1);
}


.mono-box {
  border: 3px solid red;
  background: url('/images/mono.png') no-repeat center center;
  background-size: cover;
}



.duo-box {
  border: 3px solid magenta;
  background: url('/images/duo.png') no-repeat center center;
  background-size: cover;
}


.tri-box {
  border: 3px solid orange;
  background: url('/images/tri.png') no-repeat center center;
  background-size: cover;
}

button {
  padding: 0.8rem 1.6rem;
  font-family: monospace;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.25s ease;
  display: block;
  margin: 0.5rem auto 0;
  text-shadow: 0 0 6px currentColor;
}

/* Buyable buttons */
.mono-btn {
  border: 2px solid red;
  color: white;
  background: linear-gradient(to bottom, #ff4d4d, #990000);
  box-shadow: 0 0 8px red;
}
.mono-btn:hover {
  background: red;
  color: black;
  box-shadow: 0 0 15px red;
}

.duo-btn {
  border: 2px solid magenta;
  color: white;
  background: linear-gradient(to bottom, #ff66ff, #660066);
  box-shadow: 0 0 8px magenta;
}
.duo-btn:hover {
  background: magenta;
  color: black;
  box-shadow: 0 0 15px magenta;
}

.tri-btn {
  border: 2px solid orange;
  color: white;
  background: linear-gradient(to bottom, #ffb84d, #994d00);
  box-shadow: 0 0 8px orange;
}
.tri-btn:hover {
  background: orange;
  color: black;
  box-shadow: 0 0 15px orange;
}

/* Focus buttons inside cards */
.focus-card button {
  width: 100%;
  margin-top: 0.6rem;
}

/* Mono focus */
.focus-card:nth-child(1) button {
  border: 2px solid red;
  color: white;
  background: linear-gradient(to bottom, #ff4d4d, #990000);
  box-shadow: 0 0 8px red;
}
.focus-card:nth-child(1) button:hover {
  background: red;
  color: black;
  box-shadow: 0 0 15px red;
}

/* Duo focus */
.focus-card:nth-child(2) button {
  border: 2px solid magenta;
  color: white;
  background: linear-gradient(to bottom, #ff66ff, #660066);
  box-shadow: 0 0 8px magenta;
}
.focus-card:nth-child(2) button:hover {
  background: magenta;
  color: black;
  box-shadow: 0 0 15px magenta;
}

/* Tri focus */
.focus-card:nth-child(3) button {
  border: 2px solid orange;
  color: white;
  background: linear-gradient(to bottom, #ffb84d, #994d00);
  box-shadow: 0 0 8px orange;
}
.focus-card:nth-child(3) button:hover {
  background: orange;
  color: black;
  box-shadow: 0 0 15px orange;
}

button.focused {
  border: 2px solid lime;
  color: black;

  /* Semi‑transparent neon fill */
  background-color: rgba(0, 255, 0, 0.6); /* 0.6 = 60% opacity */

  /* Glow effects */
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.8);
  text-shadow: 0 0 12px rgba(0, 255, 0, 0.9);
  outline: 2px solid lime;

  border-radius: 10px;
  font-weight: bold;
  letter-spacing: 1px;
}


#focus-buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

/* Focus card panels */
.focus-card {
  padding: 1.2rem;
  width: 240px;
  text-align: center;
  background: linear-gradient(to bottom, rgba(25,25,25,0.95), rgba(0,0,0,0.85));
  color: rgb(220,220,220);
  font-family: monospace;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255,255,255,0.1);
  border: 2px solid #444; /* neutral border by default */
}

/* Mono card glow */
.focus-card:nth-child(1) {
  border-color: red;
}
.focus-card:nth-child(1):hover {
  box-shadow: 0 0 20px red;
  text-shadow: 0 0 8px red;
}

/* Duo card glow */
.focus-card:nth-child(2) {
  border-color: magenta;
}
.focus-card:nth-child(2):hover {
  box-shadow: 0 0 20px magenta;
  text-shadow: 0 0 8px magenta;
}


.focus-card:nth-child(3) {
  border-color: orange;
}
.focus-card:nth-child(3):hover {
  box-shadow: 0 0 20px orange;
  text-shadow: 0 0 8px orange;
}

#focus-section h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: cyan;
  text-shadow: 0 0 10px cyan;
  font-family: retro, monospace;
  text-align: center;
}

.focus-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: white;
  text-shadow: 0 0 8px currentColor;
}

#description {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: white;
  text-shadow: 0 0 8px currentColor;
  font-family: retro, monospace;
  text-align: center;
}

</style>
