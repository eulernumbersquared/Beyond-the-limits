<script lang="ts">
import { player } from "../main.ts"
import { startFC } from "../finalcorruption.ts"

export default {
  setup() {
    return { player, startFC }
  }
}
</script>

<template>
  <div class="CoC">
    <div v-if="player.gods.god1com" class="congrats-message">
      <h1><i>Congratulations....</i></h1>
      <h2>Since you've finished the 1st god, here are the rewards!</h2>
      <p>Unlock the next reset layer.</p>
      <p>Outside of corruption, BPiC updates automatiaclly without you having to enter corruption at a greater rate</p>
      <p>Autobuy repeatable upgrades and point upgrades</p>
      <p>^1.5 and x10 points</p>
      <p>Good luck with the new era! It will be very, very long</p>
    </div>

    <div v-else>
      <h1>Citadel of Corruption</h1>

      <div v-if="!player.FCo.inFinalCorruption">
        <p>
          The main resting point for the God of corruption. When entering, it will
          cause a finity reset AND reset your repeatables, as well as do the
          following:
        </p>
        <dbf>You're permanently stuck in the corruption</dbf>
        <dbf>Further more, your points are divided by x10</dbf>
        <dbf>Corruption's boost to points is disabled</dbf>
        <dbf>
          However, repeatable upgrades are unlocked immediately AND their costs are decreased as compensation BUT only the 1st one is actived.
        </dbf>
        <goal>Goal: Defeat the god of corruptions.</goal>
        <button @click="startFC">ENTER THE FINAL CORRUPTION</button>
      </div>

      <div v-else class="final-message">
        <h2>YOU CANT TURN BACK</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.CoC {
  margin: 20px auto;
  padding: 20px;
  border: 3px solid #800080;
  background: radial-gradient(circle at center, #0a000a 60%, #1a001a 100%);
  color: #c77dff;
  font-family: 'Orbitron', monospace;
  text-align: center;
  box-shadow: 0 0 25px #800080, 0 0 40px black;
  border-radius: 12px;
  width: 1000px;

}

.CoC h1 {
  color: #e0b3ff;
  text-shadow: 0 0 15px #800080, 0 0 25px black;
  margin-bottom: 12px;
}

.CoC p {
  color: #c77dff;
  text-shadow: 0 0 8px #800080;
  margin-bottom: 10px;
}

.CoC dbf {
  display: block;
  margin: 6px 0;
  color: #ff66ff;
  font-weight: bold;
  text-shadow: 0 0 10px #ff33ff, 0 0 20px black;
}

.CoC goal {
  display: block;
  margin-top: 15px;
  padding: 8px;
  border: 2px dashed #800080;
  color: #ffd700;
  font-weight: bold;
  text-shadow: 0 0 12px #ffcc00, 0 0 25px black;
  background: rgba(20, 0, 20, 0.6);
}
.CoC button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #800080;
  color: #fff;
  font-family: 'Orbitron', monospace;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 0 0 8px #ff33ff;
  box-shadow: 0 0 15px #800080;
  transition: transform 0.2s ease;
}
.CoC button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px #ff33ff;
}

.final-message {
  color: #ff0000;
  text-shadow: 0 0 15px #ff0000, 0 0 30px black;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 40px;
  animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
  from { opacity: 1; text-shadow: 0 0 15px #ff0000, 0 0 30px black; }
  to   { opacity: 0.6; text-shadow: 0 0 5px #ff0000, 0 0 15px black; }
}
</style>