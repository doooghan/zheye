<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { reactive, useAttrs } from 'vue';
import { emitter } from '../mitt'

export interface RuleProp {
  type: 'require' | 'email' | 'range'
  message: string
  length?: number
}
export type RulesProp = RuleProp[]

const props = defineProps<{ rules: RulesProp, modelValue: string }>()
const emits = defineEmits<{ (e: 'update:modelValue', val: string): void }>()

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const inputRef = reactive({
  val: props.modelValue || '',
  error: false,
  message: ''
})
const validateInput = () => {
  if (props.rules) {
    const allPassed = props.rules.every((rule) => {
      let passed = true;
      inputRef.message = rule.message

      switch (rule.type) {
        case "require":
          passed = inputRef.val.trim() !== ''
          break;
        case "email":
          passed = emailReg.test(inputRef.val)
          break;
        case "range":
          passed = inputRef.val.length > (rule.length || 6)
          break
        default:
          break;
      }

      return passed
    })
    inputRef.error = !allPassed
    return allPassed
  }
  return true
}
const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value
  inputRef.val = targetValue
  emits('update:modelValue', targetValue)
}

emitter.emit('form-item-created', inputRef.val)

defineExpose({
  validateInput
})
</script>

<template>
  <div class="validate-input-container pb-3">
    <input class="form-control" :class="{ 'is-invalid': inputRef.error }" :value="inputRef.val" @input="updateValue"
      @blur="validateInput" v-bind="$attrs">
    <div class="invalid-feedback" v-if="inputRef.error">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<style scoped>

</style>
