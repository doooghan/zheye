<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs } from 'vue';

const props = defineProps<{ title: string }>()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const handler = (e: MouseEvent) => {
  if (dropdownRef.value) {
    if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
      isOpen.value = false
    }
  }
}
onMounted(() => {
  document.addEventListener('click', handler)
})
onUnmounted(() => {
  document.removeEventListener('click', handler)
})

const { title } = toRefs(props)
</script>

<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
    <ul class="dropdown-menu" style="display: block;" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped>

</style>
