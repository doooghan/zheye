<script setup lang="ts">
import uesDomCreate from '@/hooks/useDomCreate';
// 1. teleport
// 2. 动态创建节点，删除节点

const { text = '拼命加载中', background = '' } = defineProps<{ text?: string, background?: string }>()
uesDomCreate('back')
</script>

<template>
  <teleport to="#back">
    <div :style="{ backgroundColor: background, }"
      class="loading-container d-flex justify-content-center align-items-center h-100">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ (text || 'loading') }}</span>
        </div>
        <p v-if="text" class="text-primary">{{ text }}</p>
      </div>
    </div>
  </teleport>
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
