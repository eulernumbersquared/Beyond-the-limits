<script setup lang="ts">
import { DCboost } from '../Decorr';
import { player } from '../main';
import { formatdiff, formatNumber } from '../format';
</script>

<template>
<div class="decorrupt">
    <h1>THE DECORRUPTIONIZER</h1>
    <h2>Welcome to the final stretch of the final corruption! If you want to escape, you'll have to gain more corrupted matter to eventually defeat the god of corruption.</h2>
    <h2>It is currently boosting corrupted matter by x{{ formatNumber(DCboost()) }}</h2>
    <h2><i>Now all we do is wait....</i> </h2>
    <p>Current progress: {{ formatdiff(player.DCs.DCprecent) }}%</p>
</div>
</template>

<style scoped>
.decorrupt {
  background: radial-gradient(circle at center, #0a0a0a 0%, #1a001a 100%);
  font-family: Arial, Helvetica, sans-serif;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 0 20px #660066 inset;
}

.decorrupt h1 {
  font-size: 32px;
  background: linear-gradient(90deg, #ff00cc, #660066);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px #ff00cc, 0 0 20px #660066;
  margin-bottom: 15px;
}

.decorrupt h2 {
  font-size: 18px;
  color: #ccccff;
  text-shadow: 0 0 5px #660066;
  margin-bottom: 20px;
}

.decorrupt p {
  font-size: 30px;
  color: #66ffcc;
  text-shadow: 0 0 5px #00ffcc, 0 0 10px #009999;
}
</style>
