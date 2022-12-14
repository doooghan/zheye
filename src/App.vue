<script setup lang="ts">
import { RouterView } from 'vue-router';
import GlobalHeader from '@/components/GlobalHeader.vue';
import { useMainStore } from './stores';
import { storeToRefs } from 'pinia';

import LoaderVue from '@/components/Loader.vue';
import { onMounted, watch } from 'vue';
import axios from 'axios';
import createMessage from '@/components/CreateMessage';
import UploaderVue from './components/Uploader.vue';
import { ResponseType, ImageProps } from '@/types'
const store = useMainStore()
const { user: currentUser } = storeToRefs(store)

onMounted(() => {
  if (store.token && !store.user.isLogin) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${store.token}`;
    store.fetchCurrentUser()
  }
})

watch(() => store.error.status, () => {
  const { status, message } = store.error
  if (status && message) {
    createMessage(message, 'error', 2000)

  }
})

const beforeUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  if (!isJPG) {
    createMessage('选择的文件不是jpg类型', 'error')
  }
  return isJPG
}
const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
  createMessage(`上传图片ID ${rawData.data._id}`, 'success')
}
</script>

<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <UploaderVue action="/upload" :before-upload="beforeUpload" @file-uploaded="onFileUploaded">
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500">
      </template>
    </UploaderVue>
    <LoaderVue v-if="store.isLoading" />

    <RouterView></RouterView>

    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2022 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<style scoped>

</style>
