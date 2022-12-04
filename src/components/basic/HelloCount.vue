<script setup lang="ts">
import { ref, computed, reactive, toRefs, ComputedRef } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const double = computed(() => {
  return count.value * 2
})
const pow3 = computed(() => {
  return double.value * 2
})

// 使用 reactive 和 toRefs
interface DataProps {
  count2: number,
  increase: () => void,
  double2: number,
}
const data: DataProps = reactive({
  count2: 0,
  increase: () => { data.count2++ },
  double2: computed(() => data.count2 * 2)
})
const { count2, increase } = toRefs(data)
// 没有响应式
const { double2 } = data
</script>

<template>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="count++">double is {{ double }}</button>
    <button type="button" @click="count++">pow3 is {{ pow3 }}</button>
    <hr>
    <button type="button" @click="data.increase">data.count2 is {{ data.count2 }}</button>
    <button type="button" @click="data.increase">data.double2 is {{ data.double2 }}</button>
    <button type="button" @click="increase">count2 is {{ count2 }}</button>
    <button type="button" @click="increase">double2 is {{ double2 }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>


</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
