<script setup lang="ts">
import { ref } from 'vue';


interface DogResult {
  message: string,
  status: string
}
const result = ref<DogResult | null>(null)
const response = await fetch('https://dog.ceo/api/breeds/image/random')
result.value = await response.json()
</script>

<template>

  <div class="card">
    <img :src="result?.message" alt="">
  </div>


</template>
