<script setup lang="ts">
import { RouterView } from 'vue-router';
import GlobalHeader from '@/components/GlobalHeader.vue';
import { useMainStore } from './stores';
import { storeToRefs } from 'pinia';

import LoaderVue from '@/components/Loader.vue';

const store = useMainStore()
const { user: currentUser } = storeToRefs(store)

</script>

<template>
  <div class="container">
    <GlobalHeader :user="currentUser" />

    <LoaderVue v-if="store.isLoading" />

    <RouterView></RouterView>

    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2022 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<style scoped>

</style>
