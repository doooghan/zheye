<script setup lang="ts">
import { toRefs } from 'vue';

export interface ColumnProps {
  id: number,
  title: string,
  avater: string,
  descript: string
}

const props = defineProps<{ list: ColumnProps[] }>()

const { list } = toRefs(props)
</script>

<template>
  <div>
    <ul>
      <li v-for="column in list" :key="column.id">
        <img :src="column.avater" :alt="column.title">
        <h5> {{ column.title }}</h5>
        <p>{{ column.descript }}</p>
        <a href="#">进入专栏</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
