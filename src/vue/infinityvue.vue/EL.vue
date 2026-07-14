<template>
  <h3 class="letter-info">The Eternal Letters.</h3>
  <p class="letter-info">
    Place letters on the grid for certain effects. Certain letters synergize with others, but some will nullify.
  </p>

  <div class="letter-strip">
<div class="letters">
  <div v-for="letter in ELs.filter(l => l.unlocked)"
       :key="letter.title"
       class="letter"
       :class="{ active: selectedLetterTitle === letter.title }"
       @click="selectedLetterTitle = letter.title">
    {{ letter.title }}
  </div>
  <div class="letter trash" @click="clearAll">🗑</div>
</div>

  </div>

  <div class="letter-info" v-if="selectedLetter">
    <h3>Letter {{ selectedLetter.title }}</h3>
    <p>{{ selectedLetter.desc }}</p>
    <p>{{ selectedLetter.effectDisplay() }}</p>
  </div>

  <div class="grid-container">
    <div class="grid">
      <div v-for="row in grid" :key="row[0].row" class="row">
        <div v-for="cell in row" 
             :key="cell.col" 
             class="cell"
             :class="cell.letter ? 'placed' : ''"
             @click="placeLetter(cell.row, cell.col, selectedLetterTitle)">
          {{ cell.letter ?? "-" }}
          <button class="delete-btn" @click.stop="removeLetter(cell.row, cell.col)">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { player } from "../../player"
import { clearAll, ELs, placeLetter, removeLetter, setGrid } from "../../infinity/EL"
import Decimal from "break_eternity.js"

const grid = player.infinity.eternalLetters.grid
setGrid(grid)



const selectedLetterTitle = ref<string | null>(null)

const selectedLetter = computed(() =>
  ELs.find(l => l.title === selectedLetterTitle.value) || null
)

const currentEffect = computed(() =>
  selectedLetter.value ? selectedLetter.value.effect().toString() : "—"
)
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
