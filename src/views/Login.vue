<script setup lang="ts">
import ValidateInputVue, { RulesProp } from '@/components/ValidateInput.vue';
import ValidateFormVue from '@/components/ValidateForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores';

const emailVal = ref('ddd@163.com')
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱不能为空' },
  { type: 'email', message: '请输入有效的邮箱' },
]
const passwordVal = ref('1234567')
const passwordRules: RulesProp = [
  { type: 'required', message: '密码不能为空' },
  { type: 'range', length: 7, message: '长度必须大于7' },
]

const router = useRouter()
const store = useMainStore()

const onFormSubmit = (isValid: boolean) => {
  if (isValid) {
    const payload = {
      email: emailVal.value,
      password: passwordVal.value
    }
    store.loginAndFetch(payload)
      .then((value) => {
        console.log(value)
        router.push("/")
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

</script>

<template>
  <div class="login-page">
    <h5 class="my-4 text-center">登录到者也</h5>
    <ValidateFormVue @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInputVue type="text" placeholder="请填入邮箱地址" :rules="emailRules" v-model="emailVal" />
      </div>

      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInputVue type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal" />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-danger">submit</button>
      </template>
    </ValidateFormVue>
  </div>

</template>

<style scoped>

</style>
