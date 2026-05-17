<template>
  <div v-if="inDialogue" id="dialogue-overlay">
    <div id="dialogue-box">
      <img v-if="currentSpeakerImg" :src="currentSpeakerImg" class="speaker-img" />
      <h2>{{ currentMessage }}</h2>
    </div>
    <button @click="nextLine" id="continue">Continue</button>
  </div>
</template>

<script setup lang="ts">
import { inDialogue, currentMessage, currentSpeakerImg, nextLine } from '../images/dialogue'
</script>

<style>
#dialogue-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(80, 80, 80, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 25%; /* increase from 15% to push box higher */
  z-index: 9999;
}

.speaker-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 20px;
}
#dialogue-box {
  background: black;
  border: 2px solid crimson;
  width: 600px;          /* fixed width */
  height: 180px;         /* fixed height */
  padding: 20px;
  display: flex;
  align-items: center;
  font-family: 'Orbitron', monospace;
  color: rgb(255, 0, 0);
  text-shadow: 0 0 8px red;
  box-sizing: border-box;
  margin-bottom: 50px;
}

.speaker-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 20px;
  border-right: 2px solid crimson; /* barrier line */
  padding-right: 20px;
}

#dialogue-box h2 {
  flex: 1;
  font-size: 16px;       /* smaller text */
  line-height: 1.4;
  margin-left: 20px;
  overflow-wrap: break-word; /* wrap long text */
}
#continue {
  color: red;
  width: 100px;
  height: 100px;
  background: black;
  border: 2px solid crimson;
  margin-bottom: 85px;
}
</style>
