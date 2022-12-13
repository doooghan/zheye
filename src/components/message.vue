<script setup lang="ts">
import { ref } from 'vue';

export type MessageType = 'success' | 'error' | 'default'

const { type = 'default', message } = defineProps<{ type?: MessageType, message: string }>()
const emits = defineEmits<{ (e: 'close-message', status: boolean): void }>()

const node = document.createElement('div')
node.id = 'message'
document.body.appendChild(node)

const isVisible = ref(true)
const classObject = { 'alert-success': type === 'success', 'alert-danger': type === "error", 'alert-primary': type === 'default' }
const hide = () => {
  isVisible.value = false
  emits('close-message', true)
}
</script>

<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2" :class="classObject"
      v-if="isVisible">
      <span>{{ message }}</span>
      <button type="button" class="close" aria-label="Close" @click.prevent="hide">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </teleport>
</template>

<style scoped>

</style>
