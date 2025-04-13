<template>
  <div class="pattern-link" @mouseenter="animate">
    <img :src="`/images/${name}-sm.png`" class="pattern-link__image" />
    <img :src="`/images/${name}-sm.png`" class="pattern-link__image filtered hue-shift-1" :class="name" />
    <img :src="`/images/${name}-sm.png`" class="pattern-link__image filtered hue-shift-2" :class="name" />

    <span class="pattern-link__name">{{ name }}</span>
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'

const { name } = defineProps(['name'])

function animate() {
  const tl = gsap.timeline()

  tl.to(`.${name}.hue-shift-1`, { left: '12px', top: '8px', opacity: '.3', duration: .3 })
  tl.to(`.${name}.hue-shift-2`, { left: '30px', top: '20px', opacity: '.3', duration: .3 }, '<')

  tl.to(`.${name}.hue-shift-1`, { left: '-8px', top: '-8px', duration: .5 })
  tl.to(`.${name}.hue-shift-2`, { left: '-20px', top: '-20px', duration: .5 }, '<')

  tl.to(`.${name}.hue-shift-1`, { left: '0px', top: '0px', opacity: '0', duration: .3 })
  tl.to(`.${name}.hue-shift-2`, { left: '0px', top: '0px', opacity: '0', duration: .3 }, '<')
}
</script>

<style scoped lang="scss">
.pattern-link {
  width: 100px;
  height: 100px;

  position: relative;

  cursor: pointer;

  &__image {
    width: 100px;
    height: 100px;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;

    &.filtered {
      top: 0px;
      left: 0px;
      z-index: 11;
      opacity: 0;

      &.hue-shift-1 {
        &.flames {
          filter: hue-rotate(90deg) saturate(300%) blur(1px);
        }
        &.aurora {
          filter: hue-rotate(10deg) saturate(300%) blur(1px);
        }
        &.under-water {
          filter: hue-rotate(10deg) saturate(300%) blur(1px);
        }
      }

      &.hue-shift-2 {
        &.flames {
          filter: hue-rotate(180deg) saturate(300%) blur(1px);
        }
        &.aurora {
          filter: hue-rotate(20deg) saturate(300%) blur(1px);
        }
        &.under-water {
          filter: hue-rotate(40deg) saturate(300%) blur(1px);
        }
      }
    }
  }

  &__name {
    position: absolute;
    left: 80%;
    top: 15%;
    z-index: 12;

    color: white;
    font-size: 16px;
    font-weight: 600;

    text-shadow: #000 1px 0 10px;;
  }
}
</style>
