<script setup lang="ts">
import { useMainStore } from '@/stores';
import { ImageProps, PostProps, UserProps, ResponseType } from '@/types';
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ModalVue from '@/components/Modal.vue';
import createMessage from '@/components/CreateMessage';

const router = useRouter()
const route = useRoute()
const store = useMainStore()
const currentPostId = route.params.id as string
const isVisiableMoal = ref(false)
const currentPost = computed(() => store.getCurrentPost(currentPostId))
onMounted(() => {
  store.fetchPost(currentPostId)
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

const hideAndDelte = () => {
  isVisiableMoal.value = false
  store.deletePost(currentPostId).then((rawData: ResponseType<PostProps>) => {
    createMessage('删除成功, 2s后跳转', 'success', 2000)
    setTimeout(() => {
      router.push({ name: 'ColumnDetail', params: { id: rawData.data.column } })
    }, 2000)
  })

}
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
        <button class="btn btn-danger" @click.prevent="isVisiableMoal = true">删除</button>
      </div>
    </article>
    <ModalVue title="删除文章" :visiable="isVisiableMoal" @modal-on-close="(isVisiableMoal = false)"
      @modal-on-confirm="hideAndDelte">
      <p>确认删除文章？</p>
    </ModalVue>
  </div>

</template>

<style scoped>

</style>
