
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
  width: fit-content;
  max-width: 92%;
  margin: 25px auto;
  padding: 14px 25px;

  background: linear-gradient(135deg, #fd0000, #8b00a5);
  color: white;

  border: 2px solid #ff4a4a;
  border-radius: 8px;

  font-family: WR;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;

  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.2);
}

.destroy:hover {
  background: linear-gradient(135deg, #ff3333, #b000d0);
  box-shadow: 0 0 18px rgba(255, 0, 100, 0.5);
  transform: translateY(-2px);
}

#hindRepeat {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  font-family: monospace;
  text-align: center;
  padding: 30px 15px;
}

.hind-repeat {
  flex: 1 1 260px;
  max-width: 340px;
  min-width: 0;
  min-height: 160px;
  padding: 16px;
  box-sizing: border-box;
  font-family: monospace;
  text-align: center;
  color: rgb(247, 246, 243);
  background: linear-gradient(135deg, rgb(238, 3, 3), rgb(86, 0, 107));
  border: 1px solid rgb(255, 169, 9);
  border-radius: 10px;
  transition: all 0.3s ease;
}



.hind-repeat h3 {
  color: rgb(35, 0, 55);
  overflow-wrap: anywhere;
}

.hind-repeat p {
  overflow-wrap: anywhere;
}

.hind-stats {
  font-size: 13px;
  color: #fff0d0;
}

.hind-repeat button {
  padding: 8px 25px;
  background: linear-gradient(135deg, rgb(255, 187, 0), rgb(255, 100, 0));
  border: 1px solid white;
  border-radius: 5px;
  color: white;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}



.stage-info {
  color: rgb(255, 253, 253);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif;
  font-size: 30px;
  text-align: center;
  padding: 0 15px;
  overflow-wrap: anywhere;
}

.battle {
  display: flex;
  justify-content: center;
  gap: 35px;
  align-items: stretch;
  margin: 25px auto;
}

.battle .player,
.battle .enemy {
  flex: 1;
  min-width: 0;
  max-width: 300px;
  box-sizing: border-box;
  text-align: center;
  padding: 18px 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-family: 'Gill Sans', sans-serif;
}

.battle .player {
  color: white;
  border-color: rgba(255, 255, 255, 0.25);
}

.battle h3 {
  font-size: 27px;
  margin-top: 5px;
  margin-bottom: 15px;
}

.battle p {
  margin: 10px 0;
  overflow-wrap: anywhere;
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
  padding: 14px 50px;

  background: linear-gradient(135deg, #b003b6, #f30000);
  color: white;

  border: 2px solid #ff4a4a;
  border-radius: 8px;

  font-family: WR;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;

  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 0 #550044;
}



/* Tablets */
@media (max-width: 768px) {
  .stage-info {
    font-size: 24px;
  }

  .battle {
    gap: 15px;
  }

  .battle h3 {
    font-size: 23px;
  }

  .hind-repeat {
    flex-basis: 220px;
  }
}

/* Mobile phones */
@media (max-width: 480px) {
  .stage-info {
    font-size: 19px;
    line-height: 1.5;
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

  #hindRepeat {
    padding: 20px 10px;
    gap: 12px;
  }

  .hind-repeat {
    flex: 1 1 100%;
    max-width: 100%;
    min-height: auto;
    padding: 15px;
  }

  .destroy {
    width: 90%;
    padding: 13px 12px;
    font-size: 16px;
    letter-spacing: 1px;
  }
}

/* Very narrow screens */
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

  .stage-info {
    font-size: 17px;
  }
}

</style>
