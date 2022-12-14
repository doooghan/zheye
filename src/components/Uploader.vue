<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type checkFunction = (e: File) => boolean

const { action, beforeUpload } = defineProps<{ action: string, beforeUpload?: checkFunction }>()
const emits = defineEmits(['file-uploaded', 'file-uploaded-error'])

const fileInput = ref<null | HTMLInputElement>(null)
const fileStatus = ref<UploadStatus>('ready')
const uploadedData = ref()


const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    fileStatus.value = 'loading'

    const uploadedFile = files[0]

    if (beforeUpload) {
      const result = beforeUpload(uploadedFile)
      if (!result) {
        return;
      }
    }

    const formData = new FormData()
    formData.append(uploadedFile.name, uploadedFile)

    axios.post(action, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((resp) => {
      uploadedData.value = resp.data
      emits('file-uploaded', resp.data)
      fileStatus.value = 'success'
    }).catch((error) => {
      emits('file-uploaded-error', { error })
      fileStatus.value = 'error'
    }).finally(() => {
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    })

  }
}
</script>

<template>
  <div class="uploader">
    <div class="file-upload-container" @click="triggerUpload">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else-if="fileStatus === 'error'" name="error">
        <button class="btn btn-primary">上传失败</button>
      </slot>
      <slot v-else>
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange">
  </div>
</template>

<style scoped>

</style>
