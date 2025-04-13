<template>
  <div>
    <AnimatedCanvas :update-mouse="true" :fragment-shader="fragmentShader" @init="onInit" />
    <CircledCursor text="CLICK TO LIGHT UP" :hide="animated" v-if="sm.up" />
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import fragmentShader from './fragmentShader'

const { sm } = useScreenSize()
const animated = ref(false)

function animateRadius({ material }) {
  if (material.uniforms.radius.value > 0) return

  const tl = gsap.timeline({ onComplete: () => animated.value = false })
  tl.add(gsap.to(material.uniforms.radius, {
    value: 1,
    duration: 1
  }))
  tl.add(gsap.to(material.uniforms.radius, {
    value: 0,
    duration: 2.5,
    delay: 1.5
  }))
  animated.value = true
}

function onInit({ canvas, material }) {
  window.addEventListener('click', () => {
    animateRadius({ material });
  })
}
</script>

<style></style>
