<script setup lang="ts">
import { formatdiff, formatNumber } from "../format"
import { boost, gainCM } from "../CM"
import { player } from "../main"
import Decimal from "break_eternity.js"
</script>

<template>
  <div class="CMM">
<h1>
  You have {{ formatNumber(player.CM.CM) }} corrupted matter 
  ({{ formatdiff(gainCM() ?? new Decimal(0)) }}/s).
</h1>

    <p class="boost">Boosting points by x{{ formatNumber(boost()) }}</p>
    <p class="gain">Its gain is based on your current points. It's a very simple feature, but can be powerful against the god of corruption.</p>
  </div>
</template>

<style scoped>
.CMM {
  text-align: center;
}


.CMM h1 {
  font-family: 'Trebuchet MS', Arial, sans-serif;
  background: linear-gradient(180deg, #ff00cc, #000000);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}


.boost {
  font-family: 'Trebuchet MS', Arial, sans-serif;
  color: #ff66cc;
  font-size: 18px;
  text-shadow: 0 0 5px #ff66cc, 0 0 10px #ff33aa, 0 0 20px #ff00cc;
}


.gain {
  font-family: 'Trebuchet MS', Arial, sans-serif;
  color: #66ccff;
  font-style: italic;
  text-shadow: 0 0 3px #3399ff;
}
</style>
