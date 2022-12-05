<script setup lang="ts">
const emits = defineEmits<{ (e: 'form-submit', result: boolean): void }>()
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
