<script setup lang="ts">
import { useRoute } from "vue-router";
import PostListVue from "@/components/PostList.vue";
import { useMainStore } from "@/stores";

const store = useMainStore()
const route = useRoute()

const currentId = route.params.id as string
const column = store.getColumnById(currentId)
const list = store.getPostsById(currentId)
</script>

<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar?.url" :alt="column.title" class="rounded-circle border w-100">
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
