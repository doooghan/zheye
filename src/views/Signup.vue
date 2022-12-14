<script setup lang="ts">
import ValidateInputVue, { RulesProp } from '@/components/ValidateInput.vue';
import ValidateFormVue from '@/components/ValidateForm.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import createMessage from '@/components/CreateMessage';

const formData = reactive({
  email: 'araes@test.com',
  nickName: 'wer',
  password: '123',
  repeatPassword: '123',
})
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]
const nameRules: RulesProp = [
  { type: 'required', message: '昵称不能为空' }
]
const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空' }
]
const repeatPasswordRules: RulesProp = [
  { type: 'required', message: '重复密码不能为空' },
  {
    type: 'custom', message: '密码不一致', validator: () => {
      return formData.password === formData.repeatPassword
    }
  }
]

const router = useRouter()
const onFormSubmit = (isValid: boolean) => {
  if (isValid) {
    createMessage('验证成功, 2秒后跳转', 'success', 2000)
    setTimeout(() => router.push({ name: 'Login' }), 2000)
  }
}

</script>

<template>
  <div class="singup">
    <h5 class="my-4 text-center">注册</h5>
    <ValidateFormVue @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInputVue type="text" placeholder="请填入邮箱地址" :rules="emailRules" v-model="formData.email" />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <ValidateInputVue type="text" placeholder="请输入昵称" :rules="nameRules" v-model="formData.nickName" />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInputVue type="password" placeholder="请输入密码" :rules="passwordRules" v-model="formData.password" />
      </div>
      <div class="mb-3">
        <label class="form-label">重复</label>
        <ValidateInputVue type="password" placeholder="请输入密码" :rules="repeatPasswordRules"
          v-model="formData.repeatPassword" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-danger">注册</button>
      </template>
    </ValidateFormVue>
  </div>

</template>

<style scoped>

</style>
