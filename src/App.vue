<script setup lang="ts">
import ColumnListVue, { ColumnProps } from './components/ColumnList.vue';
import vueSvg from './assets/vue.svg'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1",
    avatar: "/vite.svg",
    description: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
  {
    id: 2,
    title: "test2",
    avatar: vueSvg,
    description: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
  {
    id: 3,
    title: "test3",
    // avatar: "/vite.svg",
    description: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
  {
    id: 4,
    title: "test4",
    avatar: vueSvg,
    description: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
]
</script>

<template>
  <div class="container">
    <ColumnListVue :list="testData" />
  </div>
</template>

<style scoped>

</style>
