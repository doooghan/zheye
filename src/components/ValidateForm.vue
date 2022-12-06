<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { emitter } from '@/mitt'

type ValidateFunc = () => boolean

const emits = defineEmits<{ (e: 'form-submit', isValid: boolean): void }>()

const funcArr: ValidateFunc[] = []
const callback = (func: ValidateFunc) => {
  funcArr.push(func)
}

emitter.on('form-item-created', callback)
onUnmounted(() => {
  emitter.off('form-item-created', callback)
})

const submitForm = () => {
  const result = funcArr.map(func => func()).every(result => result)
  emits("form-submit", result)
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
