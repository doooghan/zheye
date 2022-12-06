<script setup lang="ts">
import { onUnmounted } from 'vue';
import { emitter } from '../mitt'


const callback = (test: string) => {
  console.log(test)
}
emitter.on('form-item-created', callback)
onUnmounted(() => {
  emitter.off('form-item-created', callback)
})
const emits = defineEmits<{ (e: 'form-submit', isValid: boolean): void }>()
const submitForm = () => {
  emits("form-submit", true)
}
</script>

<template>
  <div class="validate-form-container">
    <slot></slot>
    <div class="submit-area" @click="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">确认</button>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>
