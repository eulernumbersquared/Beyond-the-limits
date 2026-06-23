<script setup lang="ts">
</script>

<template>
  <div id="calamity-container">
    <h1>Calamity Tier</h1>
    <i>"The greatest hell that shall be unleashed upon thee."</i>
    <i>However, i haven't added this yet! So, for now, solarity level 2 is endgame. You can try and push for more solarity levels however.</i>
    <button id="calamity">
      Reset for a Calamity Tier<br/>
      (Does nothing..... for now.)
    </button>
  </div>
  <div id="milestone-container">

  </div>
</template>

<style scoped>
h1 {
  color: darkred;
  font-size: 36px;
  text-shadow: 2px 2px 6px black;
}

i {
  color: crimson;
  font-style: italic;
  display: block;
  margin-bottom: 20px;
}

#calamity {
  display: inline-block;
  padding: 15px 25px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #8b0000, #ff0000);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.7);
  transition: all 0.3s ease;
}

</style>
