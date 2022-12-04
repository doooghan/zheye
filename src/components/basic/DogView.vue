<script setup lang="ts">
import { watch } from 'vue';
import useURLLoader from '../hooks/useURLLoader';

interface DogResult {
  message: string,
  status: string
}
interface CatResult {
  id: string,
  url: string
  width: number
  height: number

}

const { loading, loaded, result } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
const { loading: ing2, loaded: ed2, result: res2 } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')

watch(result, () => {
  console.log(result.value?.message)
})
</script>

<template>

  <div class="card">
    <h1 v-if="loading">loading! ...</h1>
    <img v-if="loaded" :src="result?.message" alt="">
    <h1 v-if="ing2">loading! ...</h1>
    <img v-if="ed2" :src="res2?.[0].url" alt="">
  </div>


</template>
