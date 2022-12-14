<script setup lang="ts">
import { useMainStore } from '@/stores';
import { ImageProps, PostProps, UserProps } from '@/types';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const store = useMainStore()
const currentPost = computed<PostProps>(() => store.posts[0])
onMounted(() => {
  store.fetchPost(route.params.id as string)
})

const currentImageUrl = computed(() => {
  if (currentPost.value && currentPost.value.image) {
    const { image } = currentPost.value
    return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
  } else {
    return null
  }
})

const currentAuthor = computed(() => {
  if (currentPost.value && currentPost.value.author) {
    const { author } = currentPost.value
    return (author as UserProps)
  } else {
    return null
  }
})

const showEditArea = computed(() => {
  const { isLogin, _id } = store.user
  if (isLogin && currentAuthor.value?._id === _id) {
    return true
  } else {
    return false
  }
})

</script>

<template>
  <div class="post-detail-page w-75 mx-auto">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img v-if="currentImageUrl" :src="currentImageUrl" alt="currentPost.title" class="rounded-lg img-fluid my-4">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          {{ currentAuthor?.nickName }}
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div>{{ currentPost?.content }}</div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <RouterLink :to="{ name: 'CreatePost', query: { postId: currentPost._id } }" class="btn btn-success">修改
        </RouterLink>
        <button class="btn btn-danger">删除</button>
      </div>
    </article>
  </div>

</template>

<style scoped>

</style>
