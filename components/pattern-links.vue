<template>
  <div class="pattern-links">
    <div v-for="link in currentLinks" @click="navigateTo(link.path)">
      <PatternLink :name="link.name" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const links = [
  { name: 'flames', path: '/flames' },
  { name: 'aurora', path: '/aurora' },
  { name: 'under-water', path: '/under-water' }
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
