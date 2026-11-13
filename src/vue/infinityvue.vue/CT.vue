<script setup lang="ts">
import { computed } from "vue"
import { calamitymilestones, calamityRequirement, calamityReset } from "../../infinity/infinity"
import { player } from "../../player"
import Decimal from "break_eternity.js";
import { formatNumber } from "../../format";

const nextMilestone = computed(() =>
  calamitymilestones.findIndex(m => !m.achieved)
)
</script>

<template>
  <div id="calamity-container">
    <h1 id="title">CALAMITY TIER</h1>
    <h1>You have {{ formatNumber(player.infinity.calamitytier) }} calamity tier(s).</h1>
    <i>"The greatest hell that shall be unleashed upon thee."</i>
    <i>This will do an infinity reset</i>
    <i v-if="player.infinity.calamitytier.gte(1)">Resets matter related feature on reset!</i>
    <button id="calamity" @click="calamityReset()">
      Reset for a Calamity Tier<br />
      Requires {{ formatNumber(calamityRequirement()) }} points
    </button>
  </div>

<div id="milestone-container">
  <h2 class="milestone-heading">Milestones</h2>

  <div class="milestone-grid">
    <div
      v-for="(m, i) in calamitymilestones"
      :key="m.id"
      v-show="m.achieved || i <= player.infinity.calamitytier.toNumber()"
      class="milestone-box"
      :class="{
        achieved: m.achieved,
        available: i === player.infinity.calamitytier.toNumber()
      }"
    >

      <div class="milestone-info">
        <h3 id="title">{{ m.title }}</h3>
        <p>{{ m.description }}</p>
      </div>

      <span v-if="m.achieved" class="milestone-status">✓</span>
      <span v-else-if="i === player.infinity.calamitytier.toNumber()" class="milestone-status">●</span>
    </div>
  </div>
</div>
</template>


<style scoped>
#calamity-container #title {
  font-family: MG;
  background: linear-gradient(90deg, red, rgb(116, 1, 24), red);
    background-size: 300% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-move 3s linear infinite;
  text-shadow: none;
}

@keyframes gradient-move {
  from {
    background-position: 0% 50%;
  }
  to {
    background-position: 100% 0%;
  }
}

h1 {
  color: darkred;
  font-size: 36px;
  text-shadow: 2px 2px 6px black;
}

i {
  color: crimson;
  font-style: italic;
  display: block;
  margin-bottom: 20px;
}

#calamity {
  display: inline-block;
  padding: 15px 25px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #8b0000, #ff0000);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
  transition: all 0.3s ease;
}

#calamity:hover {
  transform: scale(1.03);
}

#milestone-container {
  width: 100%;
  margin-top: 20px;
}


.milestone-heading {
  text-align: center;
  color: white;
  font-size: 25px;
  margin-bottom: 15px;
}

.milestone-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 50%;
  margin: 0 auto;
}

.milestone-box {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 65px;
  padding: 10px 12px;
  box-sizing: border-box;

  background: #1a1a1a;
  border: 1px solid #700000;
  border-radius: 6px;

  color: white;
  transition: 0.2s ease;
}

.milestone-number {
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: #390000;
  border-radius: 50%;
  color: crimson;
  font-weight: bold;
}

.milestone-info {
  flex: 1;
  min-width: 0;
}

.milestone-info h3 {
  margin: 0 0 4px;
  color: crimson;
    font-family: ST;
  font-size: 30px;
}

.milestone-info p {
  margin: 0;
  color: #aaa;
  font-size: 15px;
  line-height: 1.3;
  font-family: ST;
}

.milestone-status {
  color: limegreen;
  font-size: 18px;
  font-weight: bold;
}

.milestone-box.achieved {
  border-color: limegreen;
  box-shadow: 0 0 7px rgba(0, 255, 0, 0.2);
}

.milestone-box.achieved .milestone-number {
  background: #103010;
  color: limegreen;
}

.milestone-box.available {
  border-color: gold;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.25);
}

.milestone-box.available .milestone-number {
  background: #302500;
  color: gold;
}

.milestone-box.available h3 {
  color: gold;
}

@media (max-width: 550px) {
  .milestone-grid {
    grid-template-columns: 1fr;
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>