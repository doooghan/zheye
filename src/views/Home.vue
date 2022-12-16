<script setup lang="ts">
import ColumnListVue from "@/components/ColumnList.vue";
import { useMainStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import useLoadMore from '@/hooks/useLoadMore'
const store = useMainStore()
onMounted(() => {
  store.fetchColumns({ currentPage: 1, pageSize: 3 })
})

const total = computed(() =>
  store.columns.total
)

const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, { currentPage: 2, pageSize: 3 })

</script>

<template>
  <div>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <p>
            <RouterLink to="/create" class="btn btn-primary my-2">开始写文章</RouterLink>
          </p>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>

    <ColumnListVue :list="store.getColumns" />
    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block" @click="loadMorePage"
      v-if="!isLastPage">
      加载更多
    </button>
  </div>
</template>

<style scoped>

</style>
