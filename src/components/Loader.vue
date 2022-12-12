<script setup lang="ts">

const { text, background } = defineProps<{ text: string, background: string }>()
</script>

<template>
  <div :style="{ backgroundColor: background, }"
    class="loading-container d-flex justify-content-center align-items-center h-100">
    <div class="loading-content">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ (text || 'loading') }}</span>
      </div>
      <p v-if="text" class="text-primary">{{ text }}</p>
    </div>
  </div>

</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.5);
}

.loading-content {
  text-align: center;
}
</style>
