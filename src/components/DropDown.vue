<script setup lang="ts">
import { ref, toRefs } from 'vue';


const props = defineProps<{ title: string }>()
const isOpen = ref(false)
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const { title } = toRefs(props)
</script>

<template>
  <div class="dropdown">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">{{ title }}</a>
    <ul class="dropdown-menu" style="display: block;" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped>

</style>
