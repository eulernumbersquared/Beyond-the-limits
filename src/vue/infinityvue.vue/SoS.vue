<!-- ok now this is definitely a call for help -->
<script setup lang="ts">
</script>

<template>

<div class="star">
  <div class="node top"></div>
  <div class="node upper-left"></div>
  <div class="node upper-right"></div>
  <div class="node center"></div>
  <div class="node lower-left"></div>
  <div class="node lower-right"></div>
</div>
</template>

<style>
.star {
    position: relative;
    width: 300px;
    height: 300px;
    margin: auto;
}

.node {
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: royalblue; 
    border: 2px solid white;
    transform: translate(-50%, -50%);
}

.top         { left: 75%; top: 25%; }

.upper-left  { left: 20%; top: 35%; }
.upper-right { left: 80%; top: 35%; }

.center      { left: 50%; top: 50%; }

.lower-left  { left: 30%; top: 85%; }
.lower-right { left: 70%; top: 85%; }

</style>