<template>
  <div class="circled-text" :class="{ hidden: hide || hidden }" data-turn="false" data-active="false">
    <svg viewBox="0 0 100 100">
      <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" fill="transparent"></path>
      <text textLength="300">
        <textPath textLength="310" xlink:href="#circle">
          <tspan data-type="text">{{ text }}</tspan>
          <tspan data-type="dot">・</tspan>
          <tspan data-type="text">{{ text }}</tspan>
          <tspan data-type="dot">・</tspan>
        </textPath>
      </text>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'

const props = defineProps(['hide', 'text'])
const hidden = ref(false)

let circledText: HTMLDivElement

function animateCircledText(event) {
  gsap.to(circledText, {
    top: `${event.clientY - 50}px`,
    left: `${event.clientX - 50}px`,
  })

  gsap.to(circledText, {
    transform: `rotate(${Math.floor(event.clientX)}deg)`,
    duration: 0.01,
  })
}

function hideCircle() {
  hidden.value = true
}

function showCircle() {
  hidden.value = false
}

onMounted(() => {
  circledText = document.querySelector('.circled-text')
  window.addEventListener('mousemove', animateCircledText)

  const buttons = document.querySelectorAll('button, .pattern-link')
  buttons.forEach(b => {
    b.addEventListener('mouseenter', hideCircle)
    b.addEventListener('mouseleave', showCircle)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', animateCircledText)

  const buttons = document.querySelectorAll('button, .pattern-link')
  buttons.forEach(b => {
    b.removeEventListener('mouseenter', hideCircle)
    b.removeEventListener('mouseleave', showCircle)
  })
})
</script>

<style scoped lang="scss">
.circled-text {
    position: fixed;
    top: 100px;
    left: 100px;
    z-index: 99;
    width: 100px;
    height: 100px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    pointer-events: none;
    will-change: transform;
    transition: opacity .5s;

    &.hidden {
      opacity: 0;
    }

    &  svg {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    & tspan {
      fill: white;
    }
}
</style>
