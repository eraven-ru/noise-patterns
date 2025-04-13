<template>
  <div>
    <AnimatedCanvas
      :fragment-shader="fragmentShader"
      :update-mouse="true"
      pass-texture="/noise-patterns/textures/tile.jpg"
      :start-radius="1"
    />
  </div>
</template>

<script lang="ts" setup>
import fragmentShader from './fragmentShader'
</script>

<style></style>
