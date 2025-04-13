<template>
  <slot />

  <div class="info" :class="{ hidden: !infoVisible, dark: route.path.includes('under-water') }">
    <div class="info__container">
      <div>
        <AnimatedText text="Perlin" :font-size="lg.up ? 88 : 64" />
        <AnimatedText text="noise" :font-size="lg.up ? 88 : 64" style="margin-left: 88px;" />
      </div>

      <div class="info__content">
        <div class="info__paragraphs">
          <p>
            On&nbsp;the&nbsp;background there&nbsp;are patterns generated with&nbsp;the&nbsp;help of&nbsp;Perlin noise
            function&nbsp;-&nbsp;algorithm developed by&nbsp;Ken Perlin in&nbsp;the&nbsp;early 1980s while trying
            to&nbsp;find a&nbsp;way to&nbsp;generate realistic textures for&nbsp;the&nbsp;movie "Tron".
            The&nbsp;discovered algorithm ended&nbsp;up winning an&nbsp;Oscar, and&nbsp;later got enhanced
            by&nbsp;Perlin himself - the&nbsp;new solution is&nbsp;commonly known as&nbsp;"Simplex&nbsp;Noise".
          </p>

          <button class="expand" :class="{ expanded }" @click.stop="toggleParagraph" v-if="sm.down">
            <img src="/icons/chevron-down.svg" class="expand__icon" />
          </button>

          <p v-if="expanded || sm.up">
            Simplex noise implemented in&nbsp;"glsl-noise" library that is&nbsp;used here returns a&nbsp;value
            between&nbsp;-1&nbsp;and&nbsp;1 for each 2D&nbsp;or&nbsp;3D point given to&nbsp;it. The&nbsp;values are
            smoothly interpolated between points. By providing plane UV coordinates as&nbsp;input and&nbsp;using noise
            values to&nbsp;calculate colors or&nbsp;texture coordinates we can visualize noise. And by&nbsp;skewing
            original point vectors we get patterns of&nbsp;different sizes and&nbsp;forms.
          </p>
        </div>

        <PatternLinks class="pattern-links" />
      </div>
    </div>
  </div>

  <button
    class="info-visibility-button"
    :class="{ dark: route.path.includes('under-water') }"
    @click.stop="infoVisible = !infoVisible"
  >
    {{ infoVisible ? 'hide text' : 'show text' }}
  </button>

  <div
    class="repo-link"
    @click.stop="navigateTo('https://github.com/eraven-ru/noise-patterns', { external: true, open: { target: '_blank' } })"
  >
    <p>repo</p>
    <img src="/icons/repo.svg" class="repo-link__icon" />
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'

const route = useRoute()
const { sm, lg } = useScreenSize()

const infoVisible = useState('info-visible', () => true)
const expanded = ref(sm.value.up ? true : false)

function toggleParagraph() {
  expanded.value = !expanded.value
}
</script>

<style lang="scss">
@use '@/assets/css/globals.scss';

.info {
  position: relative;
  z-index: 10;

  width: 100%;
  height: 100vh;
  padding: 200px 120px 48px;
  box-sizing: border-box;

  overflow: auto;
  transition: 1s;

  &.hidden {
    opacity: 0;
  }

  &__container {
    display: flex;
    flex-direction: column;

    color: white;
  }

  &__content {
    margin-top: 40px;

    display: flex;
    gap: 32px;
  }

  &__paragraphs {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &.dark {
    & .chars {
      & span {
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
      }
    }

    & .info__content {
      position: relative;
      z-index: 11 ;
      padding: 16px;
      background-color: rgba(0, 0, 0, 0.6);
      border: 1px solid white;
    }
  }

  & button {
    pointer-events: all;
  }
}

.expand {
  width: 48px;
  height: 48px;
  background: transparent;
  border: 1px solid white;

  display: flex;
  align-items: center;
  justify-content: center;

  &__icon {
    width: 32px;
    height: 32px;
    filter: invert(1);
    transition: 0.5s;
  }

  &.expanded {
    & .expand__icon {
      transform: rotate(180deg);
    }
  }
}

.info-visibility-button {
  height: 52px;
  padding: 16px 52px;
  background: transparent;
  border: 1px solid white;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 600;
  color: white;

  &.dark {
    background: rgba(0, 0, 0, 0.6);
  }
}

.repo-link {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 15;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;

  & p {
    font-size: 16px;
    font-weight: 600;
    text-decoration: underline;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}

@media (min-width: 0px) {
  .info {
    padding: 112px 52px 52px;

    mask-image: linear-gradient(
      rgba(0, 0, 0, 0) 40px,
      rgba(0, 0, 0, 1) 90px,
      rgba(0, 0, 0, 1) calc(100% - 200px),
      rgba(0, 0, 0, 0) calc(100% - 180px));

    &__content {
      margin-top: 52px;
      padding-bottom: 180px !important;

      flex-direction: column;
    }
  }

  .info-visibility-button {
    position: fixed;
    bottom: 40px;
    z-index: 10;

    width: calc(100% - 104px);
    margin: 0 52px;
  }
}

@media (min-width: globals.$sm) {
  .info {
    padding: 80px 104px 104px;

    &__content {
      margin-top: 60px;
    }
  }

  .info-visibility-button {
    width: calc(100% - 208px);
    margin: 0 104px;
  }
}

@media (min-width: globals.$md) {
  .info {
    padding: 80px 104px 104px;

    display: flex;
    justify-content: center;

    mask-image: none;

    &__container {
      width: 720px;
    }

    &__content {
      flex-direction: row;
      align-items: center;
      gap: 60px;

      padding-bottom: 16px !important;
    }

    &__paragraphs {
      gap: 40px;
    }
  }

  .info-visibility-button {
    bottom: 60px;
    right: 60px;

    width: auto;
    margin: 0;
  }

  .pattern-links {
    flex-direction: column;
    gap: 40px;

    &>div:nth-child(even) {
      position: relative;
      left: 24px;
    }
  }
}
</style>

<style lang="scss">
.info {
  &.dark {
    & .chars {
      & span {
        text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
