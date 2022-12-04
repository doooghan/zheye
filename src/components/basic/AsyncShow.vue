<script setup lang="ts">

const result = await f()
async function f() {
  return new Promise<number>((resolve, reject) => {
    setTimeout(resolve, 3000, 100)
  })
}
</script>

<template>
  <div>
    <h1>async show {{ result }}</h1>
  </div>
</template>
