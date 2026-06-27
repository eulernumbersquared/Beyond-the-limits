<script setup lang="ts">
import { reactive, computed } from "vue"
import { calamitymilestones, calamityRequirement, calamityReset } from "../../infinity/infinity"

const milestones = reactive(calamitymilestones)

const visibleMilestones = computed(() => {
  const result = []
  for (let i = 0; i < milestones.length; i++) {
    const milestone = milestones[i]
    const prevAchieved = i === 0 ? true : milestones[i - 1].achieved
    if (prevAchieved) result.push(milestone)
  }
  return result
})
</script>

<template>
  <div id="calamity-container">
    <h1>Calamity Tier</h1>
    <i>"The greatest hell that shall be unleashed upon thee."</i>
    <i>However, i haven't added this yet! So, for now, solarity level 2 is endgame. You can try and push for more solarity levels however.</i>
    <button id="calamity" @click="calamityReset()">
      Reset for a Calamity Tier<br/>
      Requires solarity level {{ calamityRequirement() }} 
    </button>
  </div>

  <div id="milestone-container">
    <h2>Milestones</h2>
    <div 
      v-for="m in visibleMilestones" 
      :key="m.id" 
      class="milestone-box"
      :class="{ achieved: m.achieved }"
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
.milestone-box {
  border: 2px solid crimson;
  border-radius: 8px;
  padding: 15px;
  margin: 10px auto;
  width: 300px;
  background: #1a1a1a;
  color: white;
  box-shadow: 0 0 10px rgba(255,0,0,0.6);
}
.milestone-box.achieved {
  border-color: limegreen;
  box-shadow: 0 0 15px rgba(0,255,0,0.8);
}
</style>
