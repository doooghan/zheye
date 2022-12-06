<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute()
</script>

<template>
  <div>
    <pre>{{ route }}</pre>
  </div>

</template>

<style scoped>

</style>
