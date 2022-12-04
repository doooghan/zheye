<script setup lang="ts">
import { ref, computed, reactive, toRefs, watch } from 'vue'
const greetings = ref('')
const updatedGreeting = () => {
  greetings.value += 'hello!'
}
watch(greetings, () => {
  document.title = 'updated ' + greetings.value
})

</script>

<template>

  <div class="card">
    <h1>{{ greetings }}</h1>
    <button @click="updatedGreeting">updated title</button>
  </div>


</template>
