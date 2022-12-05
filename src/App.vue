<script setup lang="ts">
import ColumnList, { ColumnProps } from './components/ColumnList.vue';
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue';
import ValidateInputVue, { RulesProp } from './components/ValidateInput.vue';
import vueSvg from './assets/vue.svg'
import { reactive, ref } from 'vue';

const currentUser: UserProps = {
  isLogin: true,
  name: 'hhh',
  id: 123
}

const emailVal = ref('')
const emailRules: RulesProp = [
  { type: 'require', message: '电子邮箱不能为空' },
  { type: 'email', message: '请输入有效的邮箱' },
]
const passwordVal = ref('')
const passwordRules: RulesProp = [
  { type: 'require', message: '密码不能为空' },
  { type: 'range', message: '长度必须大于6' },
]

const testData: ColumnProps[] = [
  {
    id: 1,
    title: "test1",
    avatar: "/vite.svg",
    description: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
  {
    id: 2,
    title: "test2",
    avatar: vueSvg,
    description: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
  {
    id: 3,
    title: "test3",
    // avatar: "/vite.svg",
    description: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
  {
    id: 4,
    title: "test4",
    avatar: vueSvg,
    description: "这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。这是一段描述。"
  },
]
</script>

<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />
    <!-- <ColumnList :list="testData" /> -->
    <form>
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInputVue type="text" placeholder="请填入邮箱地址" :rules="emailRules" v-model="emailVal" />
      </div>

      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInputVue type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal" />
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
