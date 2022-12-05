<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue';
import useClickOutside from '../hooks/useClickOutside'

const props = defineProps<{ title: string }>()
const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const dropdownRef = ref<HTMLElement | null>(null)
const isClickOutside = useClickOutside(dropdownRef)
watch(isClickOutside, () => {
  if (isOpen.value && isClickOutside.value) {
    isOpen.value = false
  }
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
