
<script setup lang="ts">
import { ref } from 'vue'
import { player } from '../player'
import PlayerEditorNode from './playerfileeditor.vue'

const showDevTools = ref(false)
</script>

<template>
  <button class="dev-toggle" @click="showDevTools = !showDevTools">
    <span class="dev-icon">⚙</span>
    {{ showDevTools ? 'Close Dev Tools' : 'Dev Tools' }}
  </button>

  <Transition name="dev">
    <div v-if="showDevTools" class="dev-panel">
      <div class="dev-header">
        <div>
          <h2>Player Editor</h2>
          <p>Developer tools / Live player data</p>
        </div>

        <button class="close-button" @click="showDevTools = false">
          ✕
        </button>
      </div>

      <div class="dev-content">
        <PlayerEditorNode
          label="player"
          :value="player"
        />
      </div>

      <div class="dev-footer">
        <span class="status-dot"></span>
        Changes apply directly to player
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dev-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  color: #a5f3fc;
  background: linear-gradient(135deg, #172554, #0f172a);
  border: 1px solid #0891b2;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s ease;
}

.dev-toggle:hover {
  color: white;
  border-color: #67e8f9;
  background: #164e63;
  box-shadow: 0 0 16px #06b6d433;
}

.dev-icon {
  font-size: 17px;
}

.dev-panel {
  width: 100%;
  max-width: 850px;
  max-height: 75vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  overflow: hidden;
  color: #e2e8f0;
  background: #0b1120;
  border: 1px solid #334155;
  border-radius: 12px;
  box-shadow: 0 12px 35px #0005;
  font-family: monospace;
}

.dev-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  background: linear-gradient(110deg, #172554, #111827);
  border-bottom: 1px solid #334155;
}

.dev-header h2 {
  margin: 0;
  color: #67e8f9;
  font-size: 21px;
}

.dev-header p {
  margin: 6px 0 0;
  color: #94a3b8;
  font-size: 11px;
}

.close-button {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  color: #94a3b8;
  background: #1e293b;
  border: 1px solid #475569;
  border-radius: 6px;
  cursor: pointer;
}

.close-button:hover {
  color: white;
  background: #7f1d1d;
  border-color: #ef4444;
}

.dev-content {
  padding: 14px;
  overflow: auto;
  min-height: 0;
}

.dev-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  color: #94a3b8;
  background: #0f172a;
  border-top: 1px solid #334155;
  font-size: 11px;
}

.status-dot {
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  background: #4ade80;
  border-radius: 50%;
  box-shadow: 0 0 8px #4ade8088;
}

.dev-enter-active,
.dev-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dev-enter-from,
.dev-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
