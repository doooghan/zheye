<script setup lang="ts">
import { ImageProps, PostProps } from "@/types";
import { RouterLink } from "vue-router";
import { computed } from "vue";
const { list } = defineProps<{ list: PostProps[] }>()
const posts = computed(() => {
  return list.map(post => {
    post.image as ImageProps
    return post
  })
})

</script>

<template>
  <div class="post-list">
    <article v-for="post in list" :key="post._id" class="card mb-3 shadow-sm">

      <div class="card-body">
        <h4>
          <RouterLink :to="`/post/${post._id}`">{{ post.title }} </RouterLink>
        </h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img :src="post.image.url" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>

  </div>

</template>

<style scoped>

</style>
