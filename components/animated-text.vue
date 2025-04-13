<template>
  <div class="container" :style="{ height: `${fontSize}px` }">
    <div class="chars" :class="text" v-for="char in text">
      <span :style="{ fontSize: `${fontSize}px` }">{{ char }}</span>
      <span :style="{ fontSize: `${fontSize}px` }">{{ char }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {gsap} from 'gsap'

const { text, fontSize } = defineProps(['text', 'fontSize'])
const reverse = ref(false)

function runAnimation() {
  gsap.to(`.${text}`, {
    y: reverse.value ? `-${fontSize}px` : `0px`,
    duration: 0.5,
    delay: 'random(0, 0.8, 0.2)',
    ease: 'power1.out'
  })

  reverse.value = !reverse.value
}

onMounted(() => {
  setTimeout(runAnimation, 1000)
  window.addEventListener('click', runAnimation)
})
</script>

<style scoped lang="scss">
.container {
  display: flex;
  overflow: hidden;
}

.chars {
  display: flex;
  flex-direction: column;

  position: relative;
  transform: translateY(0);

  & span {
    min-width: 18px;
    font-weight: 700;
    line-height: 100%;
  }
}
</style>
