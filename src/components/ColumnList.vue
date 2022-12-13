<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from "vue-router";
import defaultAvatar from '@/assets/column.jpg'
import { ColumnProps } from '@/types';

const props = defineProps<{ list: ColumnProps[] }>()

const columnList = computed(() => {
  return props.list.map((column) => {
    if (!column.avatar) {
      column.avatar = { url: defaultAvatar }
    } else if (!column.avatar.url?.includes('oss')) {
      column.avatar.url = column.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
    }
    return column
  })
})
</script>

<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">

      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img :src="column.avatar?.url" :alt="column.title" class="rounded-circle border border-light my-3">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <RouterLink :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card img {
  width: 50px;
  height: 50px;
}
</style>
