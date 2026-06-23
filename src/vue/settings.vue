<script setup lang="ts">
import { ref } from "vue"
import { loadGame, saveGame, hardReset } from "../save"
import { matterionAutomationEnabled, pointupgrepenabled } from "../settings"
import { player } from "../main"
const showLoadPopup = ref(false)
const saveInput = ref("")
const errorMessage = ref("")

function tryLoadSave() {
  try {
    localStorage.setItem("incrementalSave", saveInput.value.trim())
    loadGame()
    showLoadPopup.value = false
    errorMessage.value = ""
  } catch {
    errorMessage.value = "Invalid save!"
  }
}

function toggleMatterionAutomation() {
  matterionAutomationEnabled.value = !matterionAutomationEnabled.value
}

function togglePointUpgradeAutomation() {
  pointupgrepenabled.value = !pointupgrepenabled.value
}
</script>

<template>
  <div class="settings-container">
    <h2 class="settings-title">Settings</h2>
    <button @click="saveGame" class="settings-btn">💾 Save Game</button>
    <button @click="showLoadPopup = true" class="settings-btn">📂 Load Save</button>
    <button @click="hardReset" class="settings-btn danger">🗑 Hard Reset</button>

<div class="automation-section">
  <h3 class="automation-title">Automation</h3>

  <div v-if="player.fupgrades[1].bought">
    <p class="automation-title">Matterion Automation:
      <span v-if="matterionAutomationEnabled" class="enabled">Enabled</span>
      <span v-else class="disabled">Disabled</span>
    </p>
    <button @click="toggleMatterionAutomation" class="settings-btn">
      {{ matterionAutomationEnabled ? "Disable" : "Enable" }} Matterion Automation
    </button>
  </div>

  <div v-if="player.gods.god1com">
    <p class="automation-title">Point + Repeatable Autobuy:
      <span v-if="pointupgrepenabled" class="enabled">Enabled</span>
      <span v-else class="disabled">Disabled</span>
    </p>
    <button @click="togglePointUpgradeAutomation" class="settings-btn">
      {{ pointupgrepenabled ? "Disable" : "Enable" }} Point + Repeatable Autobuy
    </button>
  </div>
</div>


    <!-- Popup -->
    <div v-if="showLoadPopup" class="popup-overlay">
      <div class="popup">
        <h3 id="loadingsave">Load Save</h3>
        <textarea v-model="saveInput" placeholder="Paste your save code here"></textarea>
        <p v-if="errorMessage" class="error" id="stylizing">{{ errorMessage }}</p>
        <div class="popup-buttons">
          <button @click="tryLoadSave" class="settings-btn">Load</button>
          <button @click="showLoadPopup = false" class="settings-btn danger">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.automation-section {
  margin-top: 20px;
  padding: 15px;
  border: 2px solid gold;
  border-radius: 8px;
  background: #111;
}

.automation-title {
  font-family: 'Orbitron', monospace;
  color: gold;
  text-shadow: 0 0 10px gold;
  margin-bottom: 10px;
}

.enabled {
  color: lime;
  text-shadow: 0 0 8px lime;
  font-family: retro, monospace;
  text-align: center;
}
.automation-section {
  text-align: center;
}

.disabled {
  color: crimson;
  text-shadow: 0 0 8px crimson;
  font-family: retro, monospace;
  text-align: center;
}
.enabled,
.disabled {
  display: block;       /* makes them full-width */
  text-align: center;   /* centers the text */
}

#stylizing {
  font-family: retro, monospace;
  color: crimson;
  text-shadow: 0 0 10px crimson;
}
#loadingsave {
  font-family: retro, monospace;
  color: gold;
  text-shadow: 0 0 10px gold;
}
.settings-container {
  text-align: center;
  margin: 30px auto;
  max-width: 400px;
}

.settings-title {
  font-family: 'Orbitron', monospace;
  color: gold;
  text-shadow: 0 0 10px gold;
  margin-bottom: 20px;
}

/* Base button style */
.settings-btn {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 12px 20px;
  font-family: 'Orbitron', monospace;
  font-size: 16px;
  background: linear-gradient(90deg, #111, #333);
  color: gold;
  border: 2px solid gold;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  text-shadow: 0 0 8px gold;
}

.settings-btn:hover {
  background: gold;
  color: black;
  box-shadow: 0 0 15px gold;
  text-shadow: none;
}

/* Danger button (Hard Reset) */
.settings-btn.danger {
  border-color: crimson;
  color: crimson;
  text-shadow: 0 0 8px crimson;
}

.settings-btn.danger:hover {
  background: crimson;
  color: white;
  box-shadow: 0 0 15px crimson;
  text-shadow: none;
}

/* Popup styling */
.popup-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: #111;
  border: 2px solid gold;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
}

.popup textarea {
  width: 100%;
  height: 100px;
  margin: 10px 0;
  background: #222;
  color: gold;
  border: 1px solid gold;
  font-family: monospace;
}

.error {
  color: crimson;
  font-weight: bold;
  margin: 5px 0;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
}
/* Popup buttons inherit the same retro style */
.popup-buttons .settings-btn {
  flex: 1;
  margin: 0 5px;
  background: linear-gradient(90deg, #111, #333);
  color: gold;              /* <-- force visible text */
  border: 2px solid gold;
  text-shadow: 0 0 8px gold;
}

.popup-buttons .settings-btn:hover {
  background: gold;
  color: black;
  box-shadow: 0 0 15px gold;
  text-shadow: none;
}

/* Danger button inside popup */
.popup-buttons .settings-btn.danger {
  border-color: crimson;
  color: crimson;           /* <-- force visible text */
  text-shadow: 0 0 8px crimson;
}

.popup-buttons .settings-btn.danger:hover {
  background: crimson;
  color: white;
  box-shadow: 0 0 15px crimson;
  text-shadow: none;
}

</style>
