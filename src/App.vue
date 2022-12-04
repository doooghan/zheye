<script setup lang="ts">
import ColumnListVue, { ColumnProps } from './components/ColumnList.vue';

const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1",
    avater: "/vite.svg",
    descript: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
  {
    id: 2,
    title: "test2",
    avater: "/vite.svg",
    descript: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  }
]
</script>

<template>
  <div class="container">
    <ColumnListVue :list="testData" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
