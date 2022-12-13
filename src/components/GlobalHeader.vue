<script setup lang="ts">
import DropDownVue from './DropDown.vue';
import DropDownItemVue from './DropDownItem.vue';
import { RouterLink } from 'vue-router';
import { UserProps } from "@/types";

const { user } = defineProps<{ user: UserProps }>()

</script>

<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <RouterLink to="/" class="navbar-brand">者也专栏</RouterLink>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <RouterLink to="/login" class="btn btn-outline-light my-2" type="submit">登录</RouterLink>
      </li>
      <li class="list-inline-item">
        <RouterLink to="/signup" class="btn btn-outline-light my-2" type="submit">注册</RouterLink>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <DropDownVue :title="`你好 ${user.nickName}`">

          <DropDownItemVue>
            <RouterLink to="/create" class="dropdown-item">新建文章</RouterLink>
          </DropDownItemVue>
          <DropDownItemVue disabled><a href="#" class="dropdown-item">管理</a></DropDownItemVue>
          <DropDownItemVue><a href="#" class="dropdown-item">退出登录</a></DropDownItemVue>

        </DropDownVue>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>
