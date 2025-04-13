<template>
  <canvas id="canvas"></canvas>
  <button class="raw-button" :class="[{ hidden: infoVisible, raw }, route.name]" @click.stop="raw = !raw">
    {{ raw ? 'COLOR' : 'RAW' }}
  </button>
  <div class="raw-filter" :class="{ hidden: !raw }"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { gsap } from 'gsap'
import vertexShader from '~/assets/glsl/vertexShader'

const route = useRoute()
const { sm, md } = useScreenSize()
const { updateMouse, fragmentShader, passTexture, startRadius } = defineProps([
  'updateMouse',
  'fragmentShader',
  'passTexture',
  'startRadius'
])
const emit = defineEmits(['init'])
const infoVisible = useState('info-visible')
const raw = ref(false)

let canvas: HTMLCanvasElement
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let renderer: THREE.WebGLRenderer

let geometry: THREE.PlaneGeometry
let texture: THREE.Texture
let material: THREE.ShaderMaterial
let mesh: THREE.Mesh

let planeSide = 10
let clock = new THREE.Clock()

function animate() {
  material.uniforms.time.value = clock.getElapsedTime()

  renderer.render(scene, camera)
  resizeRendererToDisplaySize(renderer)
  requestAnimationFrame(animate)
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement
  const pixelRatio = window.devicePixelRatio
  const width = Math.floor(canvas.clientWidth * pixelRatio)
  const height = Math.floor(canvas.clientHeight * pixelRatio)
  const needResize = canvas.width !== width || canvas.height !== height

  if (needResize) {
    renderer.setSize(width, height, false)
    material.uniforms.aspect.value = window.innerWidth / window.innerHeight
  }
  return needResize
}

function updateMousePosition(event) {
  const mouseX = event.clientX / window.innerWidth
  const mouseY = 1 - event.clientY / window.innerHeight

  material.uniforms.mouse.value = new THREE.Vector2(mouseX, mouseY)
  material.uniformsNeedUpdate = true
}

onMounted(() => {
  canvas = document.querySelector('#canvas')
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-planeSide / 2, planeSide / 2, planeSide / 2, -planeSide / 2, 1, 100)
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })

  camera.position.set(0, 0, 5)

  geometry = new THREE.PlaneGeometry(planeSide, planeSide)

  if (passTexture) {
    const textureLoader = new THREE.TextureLoader()
    texture = textureLoader.load(passTexture)
  }

  material = new THREE.ShaderMaterial({
    uniforms: {
      mouse: { value: new THREE.Vector2(0, 0) },
      time: { value: clock.getElapsedTime() },
      radius: { value: startRadius || 0 },
      aspect: { value: window.innerWidth / window.innerHeight },
      raw: { value: raw },
      ...(passTexture ? { surfaceTexture: { value: texture } } : {})
    },
    vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
  })

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  gsap.to('.raw-button', {
    left: `random(80, ${window.innerWidth - 200}, 100)px`,
    top: `random(80, ${window.innerHeight - 300}, 100)px`,
    duration: 5,
    repeat: -1,
    repeatRefresh: true,
    ease: 'none'
  })

  if (updateMouse) window.addEventListener('mousemove', updateMousePosition)
  watch(raw, () => { material.uniforms.raw.value = raw.value; material.uniformsNeedUpdate = true; })
  renderer.setPixelRatio(window.devicePixelRatio / (md.value.up ? 2 : sm.value.up ? 2 : 4))
  // renderer.setPixelRatio(window.devicePixelRatio / 10)
  emit('init', { canvas, material })
  animate()
})

onBeforeUnmount(() => {
  if (updateMouse) window.removeEventListener('mousemove', updateMousePosition)
})
</script>

<style scoped lang="scss">
@use '@/assets/css/globals.scss';

canvas {
  height: 100vh;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.raw-button {
  position: absolute;
  top: 100px;
  left: 100px;
  z-index: 12;

  width: 140px;
  height: 140px;
  border-radius: 75px;
  border: 1.5px solid white;
  cursor: pointer;

  background: transparent;
  backdrop-filter: grayscale(1) blur(2px);

  font-size: 20px;
  font-weight: 600;
  color: white;

  opacity: 1;
  transition: opacity 1s;

  &.raw {
    &.flames {
      color: globals.$flames-color;
    }

    &.aurora {
      color: globals.$aurora-color;
    }

    &.under-water {
      color: globals.$water-color;
    }
  }

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
}

.raw-filter {
  height: 100vh;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  backdrop-filter: grayscale(1);
  transition: opacity 1s;

  &.hidden {
    opacity: 0;
  }
}
</style>
