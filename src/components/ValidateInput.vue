<script lang="ts">
// 使用普通的 <script> 来声明选项
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { onMounted, reactive, useAttrs } from 'vue';
import { emitter } from '@/mitt'

export interface RuleProp {
  type: 'required' | 'email' | 'range'
  message: string
  length?: number
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'

const props = withDefaults(defineProps<{ rules: RulesProp, modelValue: string, tag?: TagType }>(), {
  tag: 'input'
})

const emits = defineEmits<{ (e: 'update:modelValue', val: string): void }>()

onMounted(() => {
  emitter.emit('form-item-created', validateInput)
})

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
        case "required":
          passed = inputRef.val.trim() !== ''
          break;
        case "email":
          passed = emailReg.test(inputRef.val)
          break;
        case "range":
          passed = inputRef.val.length >= (rule.length || 6)
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

defineExpose({
  validateInput
})
</script>

<template>
  <div class="validate-input-container pb-3">
    <input v-if="props.tag === 'input'" class="form-control" :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val" @input="updateValue" @blur="validateInput" v-bind="$attrs">
    <textarea v-else class="form-control" :class="{ 'is-invalid': inputRef.error }" :value="inputRef.val"
      @input="updateValue" @blur="validateInput" v-bind="$attrs"></textarea>
    <div class="invalid-feedback" v-if="inputRef.error">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<style scoped>

</style>
