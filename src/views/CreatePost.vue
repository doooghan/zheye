<script setup lang="ts">
import ValidateInputVue, { RulesProp } from '@/components/ValidateInput.vue';
import ValidateFormVue from '@/components/ValidateForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores';
import UploaderVue from '@/components/Uploader.vue';
import createMessage from '@/components/CreateMessage';
import { ResponseType, ImageProps } from '@/types'
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
const store = useMainStore()

const onFormSubmit = (isValid: boolean) => {
  if (isValid) {
    const { column } = store.user
    if (column) {
      // const newPost: PostProps = {
      //   _id: "test",
      //   title: titleVal.value,
      //   content: contentVal.value,
      //   createdAt: new Date().toLocaleString(),
      //   column,
      // }
      // store.createPost(newPost)
      router.push({ name: 'ColumnDetail', params: { id: column } })
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
}
</script>

<template>
  <div class="create-post-page">
    <h5 class="my-4 text-center">创建文章</h5>
    <UploaderVue action="/upload" :before-upload="uploadCheck" @file-uploaded="onFileUploaded">
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
