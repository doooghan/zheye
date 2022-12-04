<script setup lang="ts">
defineProps({
  isOpen: Boolean
})

// emit事件可以校验
// const emit = defineEmits({
//   'close-modal': (payload: any) => {
//     return payload.type === 'close'
//   }
// })

// emit('close-modal', { type: 'ok' })


const emit = defineEmits({
  'close-modal': null
})

const buttonClick = () => {
  emit('close-modal')
}


</script>

<template>
  <Teleport to="#modal">
    <div class="modal" v-if="isOpen">
      <h2 class="title">
        <slot>
          请确认
        </slot>
      </h2>
      <button @click="buttonClick">Close</button>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  width: 200px;
  height: 200px;
  border: 2px solid #000;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -100px;
  margin-top: 100px;
}

.title {
  color: blue;
}
</style>