<script setup lang="ts">
import { useRoute } from "vue-router";
import { testData, testPosts } from '../testData'
import defaultAvatar from '../assets/column.jpg'
import PostListVue from "../components/PostList.vue";

const route = useRoute()
const currentId = +route.params.id
const column = testData.find((c) => c.id === currentId)
const list = testPosts.filter(p => p.columnId === currentId)
</script>

<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostListVue :list="list" />
  </div>

</template>

<style scoped>

</style>
