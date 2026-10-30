
<script setup lang="ts">
import { formatNumber } from '../../format';
import { attackBoss, buyHindrepeat, fuckingkillgod2, hindRepeats } from '../../infinity/hind';
import { player } from '../../player';

</script>

<template>
  <h1 class="stage-info" v-if="!player.gods.good2com">Welcome to Ananke's palace. You'll have to defeat her hindrances.</h1>
  <h1 class="stage-info" v-if="player.gods.good2com">Congratulations on defeating Ananke. You have unlocked the delusion.<br>
  However, your hindrance boosts are gone</h1>
  <div v-if="!player.gods.good2com">
    <h1 class="stage-info" v-if="!player.gods.good2com">Welcome to Ananke's palace. You'll have to defeat her hindrances.</h1>
      <div class="stage-info">
      <p>Hindrance: {{ formatNumber(player.infinity.god2.bossStage) }}</p>
    </div>
      <div class="stage-info">
        Your current hindrance boosts IP gain by x{{ formatNumber(player.infinity.god2.bossStage.add(1).pow(2)) }}
      </div>
    <div class="battle">
      <div class="player">
        <h3>You</h3>
        <p>HP: {{ formatNumber(player.infinity.stats.HP) }}/{{ formatNumber(player.infinity.stats.maxHP) }}</p>
        <p>Damage: {{ formatNumber(player.infinity.stats.DMG) }}</p>
        <p>Defense: {{ formatNumber(player.infinity.stats.Def) }}</p>
      </div>

      <div class="enemy">
        <h3>Hindrance</h3>
        <p>HP: {{ formatNumber(player.infinity.god2.HP) }}/{{ formatNumber(player.infinity.god2.maxHP) }}</p>
        <p>Damage: {{ formatNumber(player.infinity.god2.DMG) }}</p>
      </div>
      
    </div>
    
    <button class="attack-button" @click="attackBoss">
      Attack
    </button>
      <div id="hindRepeat">
    <div
  v-for="rupg in hindRepeats"
  :key="rupg.title"
  class="hind-repeat"
>
  <h3>{{ rupg.title }}</h3>
  <p>{{ rupg.description }}</p>

  <div class="hind-stats">
    <p>Requies: Hindrance {{ formatNumber(rupg.cost()) }}</p>
    <p>{{ rupg.effectDisplay() }}</p>
    <p>Bought: {{ formatNumber(rupg.amountbought) }}</p>
      </div>
    <button
    class="hind-button"
    @click="() => {
      buyHindrepeat(rupg.id)
    }"
    :disabled="player.infinity.calamen.lt(rupg.cost())"
  >
    Buy
  </button>
      </div>
  </div>
  <button class="destroy" @click="fuckingkillgod2()">End the reign of suffering at hindrance 500.</button>
  </div>
</template>

<style scoped>
.destroy {
  display: block;
  margin: 25px auto;
  padding: 14px 45px;

  background: linear-gradient(180deg, #fd0000, #f30000);
  color: white;

  border: 2px solid #ff4a4a;
  border-radius: 8px;

  font-family: WR;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;

  cursor: pointer;
}
#hindRepeat {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  font-family: monospace;
  text-align: center;
  padding-top: 30px;
}

.hind-repeat {
  width: 300px;
  min-height: 150px;
  padding: 10px;
  box-sizing: border-box;
  font-family: monospace;
  text-align: center;
  color: rgb(247, 246, 243);
  background: linear-gradient(135deg, rgb(238, 3, 3), rgb(86, 0, 107));
  border: 1px solid rgb(255, 169, 9);
  transition: all 0.3s ease;
  
}

.hind-repeat:hover {
  border-color: rgb(104, 73, 16);
  box-shadow: 0 0 10px rgba(255, 174, 0, 0.4);
}

.hind-repeat h3 {
  color: rgb(19, 1, 44);
}

.hind-repeat button {
  padding: 6px 20px;
  background: linear-gradient(135deg, rgb(255, 187, 0), rgb(255, 145, 0));
  border: 1px solid rgb(252, 252, 252);
  color: rgb(254, 254, 255);
  font-family: monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hind-repeat button:hover:not(:disabled) {
  background-color: rgb(120, 0, 0);
  box-shadow: 0 0 8px rgb(255, 136, 0);
}

.hind-repeat button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.stage-info {
  color: rgb(255, 253, 253);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 30px;
}
.battle {
  display: flex;
  justify-content: center;
  gap: 100px;
  align-items: flex-start;
}

.battle .player {
  color: white;
}

.battle h3 {
  font-size: 30px;
}
.battle .enemy {
  background: linear-gradient(90deg, red, purple);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.attack-button {
  display: block;
  margin: 25px auto;
  padding: 14px 45px;

  background: linear-gradient(180deg, #b003b6, #f30000);
  color: white;

  border: 2px solid #ff4a4a;
  border-radius: 8px;

  font-family: WR;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;

  cursor: pointer;
}
.battle .player,
.battle .enemy {
  text-align: center;
  padding-right: 100px;
  padding-left: 100px;
}

</style>
