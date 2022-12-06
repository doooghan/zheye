<script setup lang="ts">
// 使用实验性语法，可选的disabled，默认为false，且具有响应性结构
// 也可以用 withDefaults
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
