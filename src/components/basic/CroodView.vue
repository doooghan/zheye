<script setup lang="ts">
import useMousePosition from '../hooks/useMousePositon';
const { x, y } = useMousePosition()
</script>

<template>

  <div class="card">
    <h1>X:{{ x }} Y:{{ y }}</h1>
  </div>


</template>
