<script setup lang="ts">
import ColumnList, { ColumnProps } from './components/ColumnList.vue';
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue';
import vueSvg from './assets/vue.svg'

const currentUser: UserProps = {
  isLogin: true,
  name: 'hhh',
  id: 123
}


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
    <GlobalHeader :user="currentUser" />
    <ColumnList :list="testData" />
  </div>
</template>

<style scoped>

</style>
