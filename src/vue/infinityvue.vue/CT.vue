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
    <h1>Calamity Tier</h1>
    <h1>You have {{ player.infinity.calamitytier }} calamity tier(s).</h1>
    <i>"The greatest hell that shall be unleashed upon thee."</i>

    <button id="calamity" @click="calamityReset()">
      Reset for a Calamity Tier<br />
      Requires {{ formatNumber(calamityRequirement()) }} points
    </button>
  </div>

  <div id="milestone-container">
    <h2>Milestones</h2>

<div
  v-for="(m, i) in calamitymilestones"
  :key="m.id"
  v-show="m.achieved || i === player.infinity.calamitytier.toNumber()"
  class="milestone-box"
  :class="{
    achieved: m.achieved,
    available: i === player.infinity.calamitytier.toNumber()
  }"
>
  <h3>{{ m.title }}</h3>
  <p>{{ m.description }}</p>
</div>

  </div>
</template>


<style scoped>
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
  margin-top: 25px;
}

.milestone-box {
  border: 2px solid crimson;
  border-radius: 8px;
  padding: 15px;
  margin: 10px auto;
  width: 300px;
  background: #1a1a1a;
  color: white;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.6);
  transition: all 0.25s ease;
}

.milestone-box.achieved {
  border-color: limegreen;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
}

.milestone-box.available {
  border-color: gold;
  box-shadow: 0 0 15px gold;
}
</style>