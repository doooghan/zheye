<script setup lang="ts">
import { toRefs } from 'vue';
import DropDownVue from './DropDown.vue';
import DropDownItemVue from './DropDownItem.vue';

export interface UserProps {
  isLogin: boolean
  name: string
  id: number
}
const props = defineProps<{ user: UserProps }>()

const { user } = toRefs(props)
</script>

<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">着也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2" type="submit">登录</a></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2" type="submit">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropDownVue :title="`你好 ${user.name}`">

          <DropDownItemVue><a href="#" class="dropdown-item">新建文章</a></DropDownItemVue>
          <DropDownItemVue disabled><a href="#" class="dropdown-item">管理</a></DropDownItemVue>
          <DropDownItemVue><a href="#" class="dropdown-item">退出登录</a></DropDownItemVue>

        </DropDownVue>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
