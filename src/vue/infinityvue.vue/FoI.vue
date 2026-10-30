<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue"
import { crops, plantCrop, harvestCrop, isCropReady, getGrowthProgress, getRemainingTime, removeCrop } from "../../infinity/FoI"
import { formatNumber, formatTime } from "../../format"
import { farm } from "../../infinity/thisfileisheretomakeFoIwork"
const selectedCrop = ref(0)
const tick = ref(0)
let intervalId: number

function handleClick(row: number, col: number, e?: MouseEvent) {
  const plot = farm[row][col]

  if (e?.shiftKey && plot.cropIndex !== null) {
    removeCrop(row, col)
    return
  }

  if (plot.cropIndex == null) {
    plantCrop(row, col, selectedCrop.value)
    return
  }
  if (isCropReady(row, col)) {
    harvestCrop(row, col)
  }
}


onMounted(() => {
  intervalId = window.setInterval(() => {
    tick.value++
  }, 10)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const unlockedCrops = computed(() =>
  crops
    .map((crop, index) => ({ crop, index }))
    .filter(c => c.crop.unlocked())
)
</script>

<template>
  <div class="game">
    <aside class="cropSelector">
      <button
        v-for="{ crop, index } in unlockedCrops"
        :key="index"
        class="selectorButton"
        :class="{ active: selectedCrop === index }"
        @click="selectedCrop = index"
      >
        {{ crop.crop }}
      </button>
    </aside>

<section
  class="cropInfo"
  v-if="selectedCrop === 0 && crops[0].unlocked()"
>
  <div class="imgBox">
    <img src="/images/FS.png" alt="Fundamental structions" />
  </div>
  <h3 class="title">{{ crops[0].crop }}</h3>
  <p class="desc">{{ crops[0].description }}</p>
  <div class="stats">
    <p>Growtime: {{ formatNumber(crops[0].growtime().div(1000)) }}s</p>
    <p>Yield: {{ formatNumber(crops[0].yield()) }}</p>
    <p>Amount: {{ formatNumber(crops[0].amount) }}</p>
    <p>Effect: {{ formatNumber(crops[0].effect()) }}</p>
  </div>
</section>

<section
  class="cropInfo"
  v-if="selectedCrop === 1 && crops[1].unlocked()"
>
  <div class="imgBox">
    <img src="/images/tt.png" alt="The Triplets" />
  </div>
  <h3 class="title">{{ crops[1].crop }}</h3>
  <p class="desc">{{ crops[1].description }}</p>
  <div class="stats">
    <p>Growtime: {{ formatNumber(crops[1].growtime().div(1000)) }}s</p>
    <p>Yield: {{ formatNumber(crops[1].yield()) }}</p>
    <p>Amount: {{ formatNumber(crops[1].amount) }}</p>
    <p>Effect: {{ formatNumber(crops[1].effect()) }}</p>
  </div>
</section>

<section
  class="cropInfo"
  v-if="selectedCrop === 2 && crops[2].unlocked()"
>
  <div class="imgBox">
    <img src="/images/SE.png" alt="Solarity essence" />
  </div>
  <h3 class="title">{{ crops[2].crop }}</h3>
  <p class="desc">{{ crops[2].description }}</p>
  <div class="stats">
    <p>Growtime: {{ formatNumber(crops[2].growtime().div(1000)) }}s</p>
    <p>Yield: {{ formatNumber(crops[2].yield()) }}</p>
    <p>Amount: {{ formatNumber(crops[2].amount) }}</p>
    <p>Effect: {{ formatNumber(crops[2].effect()) }}</p>
  </div>
</section>



    <section class="field">
      <div v-for="(row, rowIndex) in farm" :key="rowIndex" class="row">
        <button
          v-for="(plot, colIndex) in row"
          :key="colIndex"
          class="cell"
          :class="{ ready: isCropReady(rowIndex, colIndex) }"
          @click="handleClick(rowIndex, colIndex, $event)"
        >
          <template v-if="plot.cropIndex !== null">
            <span class="name">{{ crops[plot.cropIndex].crop }}</span>
            <span v-if="isCropReady(rowIndex, colIndex)" class="readyText">Harvest</span>
            <div v-else class="progress">
              <div class="bar" :style="{ width: `${getGrowthProgress(rowIndex, colIndex) * 100}%` }" {{ tick  }}></div>
              <span class="timeLeft">{{ formatTime(getRemainingTime(rowIndex, colIndex)), tick}}</span>
            </div>
          </template>
          <span v-else>Empty Plot</span>
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.game {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
}
.cropSelector {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  width: 120px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: .5rem;
}
.selectorButton {
  width: 100%;
  padding: .75rem;
  border: 2px solid #666;
  background: #1e1e1e;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  text-align: center;
  transition: background .2s, border-color .2s;
}
.selectorButton.active {
  border-color: #4c7cff;
  background: #2a3f70;
}
.cropInfo {
  flex: 0 0 250px;
  border: 2px solid #666;
  border-radius: 12px;
  background: #1e1e1e;
  color: white;
  padding: 1rem;
}
.imgBox {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: .5rem;
}
.imgBox img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.title {
  font-size: 1rem;
  margin-bottom: .25rem;
}
.desc {
  font-size: .9rem;
  margin-bottom: .5rem;
}
.stats {
  font-size: .85rem;
  line-height: 1.4;
  background: #2a2a2a;
  padding: .5rem;
  border-radius: 8px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: .4rem;
  align-items: center;
}
.row {
  display: flex;
  gap: .4rem;
}
.cell {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  background: #bd530d;
  color: white;
  cursor: pointer;
  transition: background .2s, transform .15s;
}
.cell:hover {
  transform: scale(1.03);
}
.cell.ready {
  background: #2b8f45;
}
.name {
  font-size: 12px;
  margin-bottom: 8px;
  text-align: center;
}
.readyText {
  font-weight: bold;
  color: #ffd94a;
}
.progress {
  width: 80%;
  height: 8px;
  background: #555;
  border-radius: 999px;
  overflow: visible;
  margin-top: 4px;
}
.bar {
  height: 100%;
  background: #4cc2ff;
  transition: width .15s linear;
}
.work {
  font-size: 10px;
  margin-top: 2px;
  color: #ccc;
}
.timeLeft {
  font-size: 10px;
  color: #ffd94a;
  margin-top: 2px;
}
</style>
