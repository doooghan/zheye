<script setup lang="ts">
import { ref, toRefs } from 'vue';

// 使用实验性语法，可选的disabled，默认为false，且响应性结构
const { disabled = false } = defineProps<{ disabled?: boolean }>()

</script>

<template>
  <div class="dropdown-option" :class="{
    'is-disabled': disabled
  }">
    <slot></slot>
  </div>
</template>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
