<script setup lang="ts">
import ValidateInputVue, { RulesProp } from '@/components/ValidateInput.vue';
import ValidateFormVue from '@/components/ValidateForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores';
import { PostProps } from '@/testData';

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
    const { columnId } = store.user
    if (columnId) {
      const newPost: PostProps = {
        id: Date.now(),
        title: titleVal.value,
        content: contentVal.value,
        createdAt: new Date().toLocaleString(),
        columnId,
      }
      store.createPost(newPost)
      router.push({ name: 'ColumnDetail', params: { id: columnId } })
    }
  }
}

</script>

<template>
  <div class="create-post-page">
    <h5 class="my-4 text-center">创建文章</h5>
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
