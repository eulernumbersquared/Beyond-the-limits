<script setup lang="ts">
import { formatdiff, formatNumber } from '../../format';
import { calcsolarenergy, investsolarityxp, lunargen, solarenergyboost, solargen, solaritylevelboost, solaritylevelrequium } from '../../infinity/infinity';
import { player } from '../../main';

function enableLunarGen() {
  player.infinity.solarity.lunargeneration = true
  player.infinity.solarity.solargeneration = false
}

function enableSolarGen() {
  player.infinity.solarity.solargeneration = true
  player.infinity.solarity.lunargeneration = false
}

function investAll() {
  const amount = player.infinity.solarity.solarenergy;
  if (amount.gte(0)) {
    investsolarityxp(amount);
  }
}
</script>

<template>
  <h1 id="solarity">THE SOLARITY</h1>

  <div id="solarity-row">
    <div id="scarysolarity">
      <img src="/images/basesolarity.png" style="width:200px;">
      <h2 id="solarity">Currently using: Base solarity</h2>
      <p id="solarity">
        You have {{ formatdiff(player.infinity.solarity.solarenergy) }}
        ({{ formatdiff(calcsolarenergy()) }}/s) solar energy based on the product of solars and lunars
      </p>
      <p id="solarity">S.E (solar energy) boosts points by x{{ formatdiff(solarenergyboost()) }}</p>
    </div>
        <div id="level-box">
    <h2 id="solarity">Currently solarity level {{ player.infinity.solarity.solaritylevel }}</h2>
    <p id="solarity">Solarity levels are used to unlock certain features</p>
    <p id="solarity">They are boosting solars and lunars by x{{ formatNumber(solaritylevelboost()) }}</p>
    <i id="solarity" v-if="player.infinity.solarity.solaritylevel.lt(2)">Unlock calamity tiers at solarity level 2</i>
    <p id="solarity">XP: {{ formatdiff(player.infinity.solarity.solarityxp) }} / {{ formatdiff(solaritylevelrequium()) }}</p>
    <button @click="investAll" id="femboy">Invest All Solar Energy</button>
    </div>
    <div id="level-circle">
      <img src="/images/solaritylevels.png" alt="Level Circle">
      <span class="level-text">
        {{ player.infinity.solarity.solaritylevel }}
      </span>

    </div>
  </div>


  <div id="flexxy">
    <div id="lunar-box">
      <img src="/images/lunars.png" style="width:150px; height:150px;">
      <p id="lunar">
        You have {{ formatdiff(player.infinity.solarity.lunars) }}
        ({{ formatdiff(lunargen()) }}/s) lunars
      </p>
      <button @click="enableLunarGen">Switch to Lunar Generation</button>
    </div>

    <div id="solar-box">
      <img src="/images/solars.png" style="width:150px; height:150px;">
      <p id="solar">
        You have {{ formatdiff(player.infinity.solarity.solars) }}
        ({{ formatdiff(solargen()) }}/s) solars
      </p>
      <button @click="enableSolarGen">Switch to Solar Generation</button>
    </div>
  </div>
</template>

<style>
.xp-fill {
  color: aliceblue;
}
#flexxy {
  display: flex;
  gap: 100px;
  margin: 20px auto;
  width: 100%;
  max-width: 1000px;
}

#solarity-row {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}

#scarysolarity {
  border: 3px solid yellow;
  border-radius: 12px;
  padding: 20px;
  width: 500px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 15px yellow, 0 0 30px orange;
}

#lunar-box {
  border: 3px solid grey;
  border-radius: 12px;
  padding: 15px;
  margin: 20px auto;
  text-align: center;
  width: 400px;
  box-shadow: 0 0 10px grey, 0 0 20px darkgrey;
}

#solar-box {
  border: 3px solid gold;
  border-radius: 12px;
  padding: 15px;
  margin: 20px auto;
  text-align: center;
  width: 400px;
  box-shadow: 0 0 10px gold, 0 0 20px orange;
}

#solarity {
  color: yellow;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
}

#lunar {
  color: grey;
  text-align: center;
}

#solar {
  color: yellow;
  text-align: center;
}

.image-row {
  display: flex;
  gap: 40px;
  margin-top: 20px;
  justify-content: center;
}

#level-circle {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 400px;
}

#level-circle img {
  width: 100%;
  height: auto;
  display: block;
}

.level-text {
  position: absolute;
  top: 55%;
  left: 36%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: bold;
  color: yellow;
  text-shadow: 0 0 10px black;
}

#femboy {
  background: linear-gradient(180deg, gold, orange);
  border: 2px solid yellow;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px yellow, 0 0 20px orange;
}


#femboy:active {
  background: linear-gradient(180deg, darkorange, goldenrod);
  box-shadow: 0 0 5px yellow, 0 0 15px orange;
  transform: scale(0.95);
}

#lunar-box button {
  background: linear-gradient(180deg, grey, darkgrey);
  border: 2px solid silver;
  color: white;
  height: 50px;
  border: 30px;
  box-shadow: 0 0 10px grey, 0 0 20px darkgrey;
}

#lunar-box button:hover {
  background: linear-gradient(180deg, darkgrey, grey);
  box-shadow: 0 0 15px silver, 0 0 30px grey;
}

#solar-box button {
  background: linear-gradient(180deg, gold, orange);
  border: 2px solid gold;
  color: black;
    height: 50px;
  border: 30px;
  box-shadow: 0 0 10px gold, 0 0 20px orange;
}

#solar-box button:hover {
  background: linear-gradient(180deg, orange, gold);
  color: white;
  box-shadow: 0 0 15px gold, 0 0 30px orange;
}

</style>
