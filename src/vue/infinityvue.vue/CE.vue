
<script setup lang="ts">
import { player } from "../../player"
import { formatNumber } from "../../format"
import { attackEnemy, buyPlayerRepeat, cegain, playerRepeat } from "../../infinity/ss.ts"
import { ref, watch } from "vue";
import Cos from "./cos.vue";
import SN from "./SN.vue";

type CETab = 'Main' | 'Cosmos' | 'Supernova';

const validCETabs: CETab[] = ['Main', 'Cosmos', 'Supernova'];

const savedCETab = localStorage.getItem('lastCETab');

const CEtabs = ref<CETab>(
  validCETabs.includes(savedCETab as CETab)
    ? (savedCETab as CETab)
    : 'Main'
);

watch(CEtabs, (tab) => {
  localStorage.setItem('lastCETab', tab);
});

</script>

<template>
  <div class="calamity-tabs">
    <button :class="{active: CEtabs === 'Main'}" @click="CEtabs = 'Main'">Main</button>
    <button :class="{active: CEtabs === 'Cosmos'}" @click="CEtabs = 'Cosmos'" v-if="player.infinity.stats.bestStage.gte(30)">Cosmos</button>
    <button :class="{active: CEtabs === 'Supernova'}" @click="CEtabs = 'Supernova'" v-if="player.infinity.stats.bestStage.gte(70)">Supernova</button>
  </div>
  <section v-if="CEtabs === 'Main'">
  <div id="calamity-energy">
    <p class="CE">You have {{ formatNumber(player.infinity.calamen) }} ({{ formatNumber(cegain()) }}/s) calamity energy <br>
      Your base damage is equal to your calamity energy. <br>
      If your defense is greater than the enemy's damage. It will deal 1 damage to you.</p>
      <p class="CE">Reach stage 30 to unlock a sub-reset layer.</p>
    <p class="CE">Boosts: <br>
      x{{ formatNumber(player.infinity.stats.stage.add(1)) }} calamity energy <br>
      ^{{ formatNumber(player.infinity.stats.bestStage.mul(0.1).add(1)) }} points<br>
      x{{ formatNumber(player.infinity.stats.bestStage.add(1).pow(2))}} eternal energy
    </p>
    <div class="stage-info">
      <p>Stage: {{ formatNumber(player.infinity.stats.stage) }}</p>
      <p>Best Stage: {{ formatNumber(player.infinity.stats.bestStage) }}</p>
    </div>

    <div class="battle">
      <div class="player">
        <h3>You</h3>
        <p>HP: {{ formatNumber(player.infinity.stats.HP) }}/{{ formatNumber(player.infinity.stats.maxHP) }}</p>
        <p>Damage: {{ formatNumber(player.infinity.stats.DMG) }}</p>
        <p>Defense: {{ formatNumber(player.infinity.stats.Def) }}</p>
      </div>

      <div class="enemy">
        <h3>Enemy</h3>
        <p>HP: {{ formatNumber(player.infinity.enemy.HP) }}/{{ formatNumber(player.infinity.enemy.maxHP) }}</p>
        <p>Damage: {{ formatNumber(player.infinity.enemy.DMG) }}</p>
      </div>
    </div>

    <button class="attack-button" @click="attackEnemy">
      Attack
    </button>
  </div>
  <div id="playerRepeat">
    <div
  v-for="rupg in playerRepeat"
  :key="rupg.title"
  class="player-repeat"
>
  <h3>{{ rupg.title }}</h3>
  <p>{{ rupg.description }}</p>

  <div class="upgrade-stats">
    <p>Cost: {{ formatNumber(rupg.cost()) }} CE</p>
    <p>{{ rupg.effectDisplay() }}</p>
    <p>Bought: {{ formatNumber(rupg.amountbought) }}</p>
  </div>

  <button
    class="upgrade-button"
    @click="() => {
      buyPlayerRepeat(rupg.id)
    }"
    :disabled="player.infinity.calamen.lt(rupg.cost())"
  >
    Buy
  </button>
</div>
  </div>
  </section>

  <section v-if="CEtabs === 'Cosmos'">
  <Cos />
</section>
  <section v-if="CEtabs === 'Supernova'">
  <SN />
</section>
</template>

<style scoped>

.calamity-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
  font-family: 'Courier New', monospace;
}
.calamity-tabs button {
  background: linear-gradient(270deg, rgb(247, 0, 0), rgb(153, 0, 0));
  color: rgb(253, 253, 253);
  border: 1px solid #00e5ff;
  padding: 10px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}
.calamity-tabs button.active {
  background: linear-gradient(135deg, #ffffff, #000000);
  color: rgb(253, 253, 253);
}
.CE { 
    color: rgb(231, 98, 98);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
#calamity-energy {
  border: 1px solid, rgb(68, 68, 68);
   background-image: linear-gradient(to right, #860202, #1f0404);
  padding: 20px 50px;
    width: fit-content;
  margin: 0 auto;
}
.stage-info {
  color: rgb(231, 98, 98);
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
  color: rgb(2, 2, 2);
}

.battle h3 {
  font-size: 30px;
}
.battle .enemy {
  color: rgb(255, 0, 0);
}

.attack-button {
  display: block;
  margin: 25px auto;
  padding: 14px 45px;

  background: linear-gradient(180deg, #b91c1c, #650000);
  color: white;

  border: 2px solid #ff4a4a;
  border-radius: 8px;

  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;

  cursor: pointer;
  box-shadow: 0 4px 0 #390000;
}
.battle .player,
.battle .enemy {
  text-align: center;
  padding-right: 100px;
  padding-left: 100px;
}

#playerRepeat {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  font-family: monospace;
  text-align: center;
  padding-top: 30px;
}

.player-repeat {
  width: 300px;
  min-height: 150px;
  padding: 10px;
  box-sizing: border-box;
  font-family: monospace;
  text-align: center;
  color: rgb(255, 100, 100);
  background-color: rgba(30, 0, 0, 0.8);
  border: 1px solid rgb(150, 30, 30);
  transition: all 0.3s ease;
  
}

.player-repeat:hover {
  border-color: red;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
}

.player-repeat h3 {
  color: rgb(255, 60, 60);
}

.player-repeat button {
  padding: 6px 20px;
  background-color: rgb(60, 0, 0);
  border: 1px solid rgb(200, 50, 50);
  color: rgb(255, 100, 100);
  font-family: monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.player-repeat button:hover:not(:disabled) {
  background-color: rgb(120, 0, 0);
  box-shadow: 0 0 8px red;
}

.player-repeat button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  #calamity-energy {
    padding: 20px 15px;
  }

  .battle {
    gap: 15px;
  }

  .battle h3 {
    font-size: 23px;
  }

  .stage-info {
    font-size: 22px;
  }

  .player-repeat {
    flex-basis: 220px;
  }
}

@media (max-width: 480px) {
  .calamity-tabs {
    gap: 7px;
  }

  .calamity-tabs button {
    flex: 1 1 auto;
    padding: 10px 12px;
    font-size: 13px;
  }

  #calamity-energy {
    width: 96%;
    padding: 16px 10px;
    border-radius: 8px;
  }

  .CE {
    font-size: 14px;
  }

  .stage-info {
    font-size: 19px;
  }

  .battle {
    gap: 8px;
  }

  .battle .player,
  .battle .enemy {
    padding: 12px 5px;
  }

  .battle h3 {
    font-size: 20px;
  }

  .battle p {
    font-size: 13px;
  }

  .attack-button {
    width: 85%;
    padding: 13px 15px;
    font-size: 19px;
  }

  #playerRepeat {
    padding: 20px 10px;
    gap: 12px;
  }

  .player-repeat {
    flex: 1 1 100%;
    max-width: 100%;
    min-height: auto;
    padding: 15px;
  }
}

@media (max-width: 350px) {
  .battle {
    flex-direction: column;
    align-items: center;
  }

  .battle .player,
  .battle .enemy {
    width: 100%;
    max-width: none;
  }

  .calamity-tabs button {
    font-size: 12px;
    padding: 9px 8px;
  }
}
</style>
