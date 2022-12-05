<script setup lang="ts">
import { reactive } from 'vue';

export interface RuleProp {
  type: 'require' | 'email'
  message: string
}
export type RulesProp = RuleProp[]


const props = defineProps<{ rules: RulesProp }>()

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const inputRef = reactive({
  val: '',
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
        default:
          break;
      }

      return passed
    })
    inputRef.error = !allPassed
  }
}
</script>

<template>
  <div class="validate-input-container pb-3">
    <input type="text" class="form-control" :class="{ 'is-invalid': inputRef.error }" v-model="inputRef.val"
      @blur="validateInput">
    <div class="invalid-feedback" v-if="inputRef.error">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<style scoped>

</style>
