<script setup lang="ts">
import { ref, computed, reactive, toRefs } from 'vue'

interface DataProps {
  numbers: number[]
  person: { name?: string }
}
const data: DataProps = reactive({
  numbers: [1, 2, 3],
  person: {}
})
const { numbers, person } = toRefs(data)
data.numbers.push(5)
numbers.value[0] = -1
data.person.name = 'hhh' 
</script>

<template>

  <div class="card">
    <ul>
      <li v-for="number in numbers" :key="number">{{ number }}</li>
    </ul>
    <p>{{ person.name }}</p>
  </div>


</template>
