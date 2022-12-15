<script setup lang="ts">
import ValidateInputVue, { RulesProp } from '@/components/ValidateInput.vue';
import ValidateFormVue from '@/components/ValidateForm.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/stores';
import UploaderVue from '@/components/Uploader.vue';
import createMessage from '@/components/CreateMessage';
import { ResponseType, ImageProps, PostProps } from '@/types'
import { beforeUploadCheck } from '@/helpers';

const titleVal = ref('')
const titleRules: RulesProp = [
  { type: 'required', message: '文章标题不能为空' }
]
const contentVal = ref('')
const contentRules: RulesProp = [
  { type: 'required', message: '文章详情不能为空' }
]

const router = useRouter()
const route = useRoute()
const store = useMainStore()
const uploadedData = ref()
let imageId = ''
const isEditMode = !!route.query.postId

onMounted(() => {
  if (isEditMode) {
    store.fetchPost(route.query.postId as string).then((rawData: ResponseType<PostProps>) => {
      const currentPost = rawData.data
      if (currentPost.image) {
        uploadedData.value = { data: currentPost.image }
      }
    })
  }
})

const onFormSubmit = (isValid: boolean) => {
  if (isValid) {
    const { column, _id } = store.user
    if (column && _id) {
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id
      }
      if (imageId) {
        newPost.image = imageId
      }
      store.createPost(newPost).then(() => {
        createMessage('创建成功，两秒后跳转', 'success');
        setTimeout(() => {
          router.push({ name: 'ColumnDetail', params: { id: column } })
        }, 2000)
      })
    }
  }
}

const uploadCheck = (file: File) => {
  const { passed, error } = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
  if (error === 'format') {
    createMessage('文件类型仅支持jpeg和png', 'error')
  }
  if (error === 'size') {
    createMessage('文件最大1MB', 'error')
  }
  return passed
}

const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
  createMessage(`上传图片ID ${rawData.data._id}`, 'success')
  if (rawData.data._id) {
    imageId = rawData.data._id
  }
}
</script>

<template>
  <div class="create-post-page">
    <h5 class="my-4 text-center">创建文章</h5>
    <UploaderVue action="/upload" :before-upload="uploadCheck" @file-uploaded="onFileUploaded" :uploaded="uploadedData">
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500">
      </template>
    </UploaderVue>

    <ValidateFormVue @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题</label>
        <ValidateInputVue type="text" placeholder="请填入标题" :rules="titleRules" v-model="titleVal" />
      </div>

      <div class="mb-3">
        <label class="form-label">文章内容</label>
        <ValidateInputVue type="text" tag="textarea" rows="10" placeholder="请输入内容" :rules="contentRules"
          v-model="contentVal" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-danger">创建</button>
      </template>
    </ValidateFormVue>
  </div>

</template>

<style scoped>

</style>
