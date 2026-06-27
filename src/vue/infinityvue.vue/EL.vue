<template>
  <div class="letter-strip">
    <div class="letters">
      <div v-for="letter in letters"
           :key="letter"
           class="letter"
           :class="{ active: selectedLetter === letter }"
           @click="selectedLetter = letter">
        {{ letter }}
      </div>
      <div class="letter trash" @click="clearAll">🗑</div>
    </div>
  </div>

  <div class="letter-info">
    <h3>Letter {{ selectedLetter }}</h3>
    <p>{{ letterDescriptions[selectedLetter] }}</p>
    <p>Total Effective Multiplier: {{ currentEffect }}</p>
  </div>

  <div class="grid-container">
    <div class="grid">
      <div v-for="row in grid" :key="row[0].row" class="row">
        <div v-for="cell in row" 
             :key="cell.col" 
             class="cell"
             :class="cell.letter ? 'placed' : ''"
             @click="placeLetter(cell.row, cell.col)">
          {{ cell.letter ?? "-" }}
          <button class="delete-btn" @click.stop="clearCell(cell.row, cell.col)">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { player } from "../../player"
import type { Letter } from "../../infinity/EL"
import { setGrid, boostPoints, boostFP } from "../../infinity/EL"

const grid = player.infinity.eternalLetters.grid
setGrid(grid)

const letters: ("A" | "B" | "C")[] = ["A","B","C"]
const selectedLetter = ref<"A" | "B" | "C">("A")

function placeLetter(row: number, col: number): void {
  grid[row][col].letter = selectedLetter.value
}

function clearCell(row: number, col: number): void {
  grid[row][col].letter = null
}

function clearAll(): void {
  grid.forEach(row => row.forEach(cell => cell.letter = null))
}

const letterDescriptions: Record<"A" | "B" | "C", string> = {
  A: "Boosts Points exponentially (10^count).",
  B: "Boosts FP exponentially (2^count).",
  C: "Boosts diagonally adjacent A/B pieces ×2."
}

const currentEffect = computed(() => {
  switch (selectedLetter.value) {
    case "A": return boostPoints().toString()
    case "B": return boostFP().toString()
    case "C": return "Boosts diagonally adjacent A/B pieces"
  }
})
</script>

<style scoped>
.letter-info {
    color: white;
}
.letter-strip {
  background: #333;
  padding: 8px;
  overflow-x: auto;
  border-radius: 6px;
}
.letters {
  display: flex;
}
.letter {
  flex: 0 0 auto;
  min-width: 40px;
  text-align: center;
  padding: 10px;
  margin-right: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
  background: royalblue; /* all letters blue */
}
.letter.active {
  outline: 2px solid white;
}
.letter.trash {
  background: darkred;
}
.letter.trash:hover {
  background: red;
}

.cell.placed {
  background: royalblue; /* all placed letters blue */
}

.grid-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.grid {
  display: grid;
  grid-template-rows: repeat(4, 60px);
  gap: 8px;
}
.row {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  gap: 8px;
}
.cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid white; /* white outline for each box */
}
.delete-btn {
  position: absolute;
  top: 2px;
  right: 4px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
