
<template>
<div v-if="inDialogue" id="dialogue-overlay">
  <div id="dialogue-container">

<div id="dialogue-name">
  {{ currentSpeakerName }}
</div>

    <div id="dialogue-box">
      <img
        v-if="currentSpeakerImg"
        :src="currentSpeakerImg"
        class="speaker-img"
      />

      <h2>{{ currentMessage }}</h2>
    </div>

  </div>

  <button @click="nextLine" id="continue">
    Continue
  </button>
</div>

  <Transition name="title-card">
    <div
      v-if="inTitleCard"
      id="title-card"
      :style="{ '--title-gradient': titleCardGradient }"
    >
      <div id="title-card-content">
        <div id="title-card-subtitle">
          {{ displayedSubtitle }}
        </div>

        <div
          v-if="titleCardTitle"
          id="title-card-title"
        >
          {{ titleCardTitle }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  inDialogue,
  currentMessage,
  currentSpeakerImg,
  currentSpeakerName,
  nextLine,
  inTitleCard,
  titleCardTitle,
  titleCardGradient,
  displayedSubtitle
} from '../../images/dialogue'
</script>

<style>
#dialogue-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(80, 80, 80, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 25%;
  z-index: 9999;
}

#dialogue-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#dialogue-name {
  background: black;
  border: 2px solid crimson;
  border-bottom: none;
  padding: 8px 20px;
  font-family: ST;
  font-size: 20px;
  color: red;
  text-shadow: 0 0 8px crimson;
}

#dialogue-box {
  background: black;
  border: 2px solid crimson;
  width: 600px;
  height: 180px;
  padding: 20px;
  display: flex;
  align-items: center;
  font-family: ST;
  color: red;
  text-shadow: 0 0 8px red;
  box-sizing: border-box;
}

#dialogue-box h2 {
  flex: 1;
  font-size: 16px;
  line-height: 1.4;
  margin-left: 20px;
  overflow-wrap: break-word;
}
#dialogue-container {
  transform: translateY(-50px);
}
.speaker-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 20px;
  border-right: 2px solid crimson;
  padding-right: 20px;
}
#dialogue-box h2 {
  flex: 1;
  font-size: 16px;
  line-height: 1.4;
  margin-left: 20px;
  overflow-wrap: break-word;
}

#continue {
  color: red;
  width: 100px;
  height: 100px;
  background: black;
  border: 2px solid crimson;
  margin-bottom: 85px;
}

/* Title card */
#title-card {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.35);
}

#title-card-content {
  text-align: center;
  font-family: MG;
  text-transform: uppercase;
}

/* Animated gradient for both text elements */
#title-card-title,
#title-card-subtitle {
  background: var(--title-gradient);
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation:
    gradient-move 3s linear infinite,
    title-appear 0.8s ease-out;
}

#title-card-title {
  font-size: 42px;
  font-weight: bold;
  letter-spacing: 10px;
}

#title-card-subtitle {
  margin-top: 15px;
  font-size: 22px;
  letter-spacing: 4px;
}

@keyframes gradient-move {
  from {
    background-position: 0% 50%;
  }

  to {
    background-position: 200% 50%;
  }
}

/* Fade-in effect */
@keyframes title-appear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
