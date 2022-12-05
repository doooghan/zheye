<script setup lang="ts">
import ColumnList, { ColumnProps } from './components/ColumnList.vue';
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue';
import vueSvg from './assets/vue.svg'
import { reactive } from 'vue';

const currentUser: UserProps = {
  isLogin: true,
  name: 'hhh',
  id: 123
}

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const emailRef = reactive({
  val: '',
  error: false,
  message: ''
})
const validateEmail = () => {
  if (emailRef.val.trim() === '') {
    emailRef.error = true
    emailRef.message = '请输入邮箱'
  } else if (!emailReg.test(emailRef.val)) {
    emailRef.error = true
    emailRef.message = '请输入有效的邮箱'
  }
}
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
        <label for="exampleInputEmail1" class="form-label">邮箱</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          @blur="validateEmail" v-model="emailRef.val">
        <div id="emailHelp" class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped>

</style>
