<template>
  <h3 class="letter-info">The Eternal Letters.</h3>
  <p class="letter-info">Place letters on the grid for certain effects. Be ware, however, that any letter placed adjacent to another will "nullify" (i.e. ^0.5) its effect.</p>
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
    <p>Total multiplayer: {{ currentEffect }}</p>
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
import { setGrid, boostsolars, boostlunars, boostSE } from "../../infinity/EL"
import { formatNumber } from "../../format"

const grid = player.infinity.eternalLetters.grid
setGrid(grid)

const letters: ("A" | "B" | "C" | "D")[] = ["A","B","C", "D"]
const selectedLetter = ref<"A" | "B" | "C" | "D">("A")

function placeLetter(row: number, col: number): void {
  grid[row][col].letter = selectedLetter.value
}

function clearCell(row: number, col: number): void {
  grid[row][col].letter = null
}

function clearAll(): void {
  grid.forEach(row => row.forEach(cell => cell.letter = null))
}

const letterDescriptions: Record<"A" | "B" | "C" | "D", string> = {
  A: "Boost solars based on amount of A's placed",
  B: "Boosts lunars based on amount of B's placed",
  C: "Anything on the diagonals of C is empowered by ^3 (Effect stacks)",
  D: "Boost solar energy based on amount of D's placed"
}

const currentEffect = computed(() => {
  switch (selectedLetter.value) {
    case "A": return boostsolars().toString()
    case "B": return boostlunars().toString()
    case "C": return "Diagonally boosting pieces by ^3"
    case "D": return formatNumber(boostSE())
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
  background: royalblue;
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
  background: royalblue;
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
  border: 2px solid white;
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
