<template>
  <div class="pattern-links">
    <div v-for="link in currentLinks" @click="navigateTo(link.path)">
      <PatternLink :name="link.name" :image="link.image" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const links = [
  { name: 'flames', path: '/flames', image: '/images/flames-sm.png' },
  { name: 'aurora', path: '/aurora', image: '/images/aurora-sm.png' },
  { name: 'under-water', path: '/under-water', image: '/images/under-water-sm.png' }
]

let currentLinks = ref(links.filter(el => !route.path.startsWith(el.path)))

watch(route, () => {
  currentLinks.value = links.filter(el => !route.path.startsWith(el.path))
})
</script>

<style scoped lang="scss">
.pattern-links {
  display: flex;
  gap: 52px;
}
</style>
