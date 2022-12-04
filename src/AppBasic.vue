<script setup lang="ts">
import { ref } from "vue";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// import HelloCount from './components/basic/HelloCount.vue'
// import ProxyView from './components/basic/ProxyView.vue'
// import GreetingWatch from './components/basic/GreetingWatch.vue'
import CroodView from "./components/basic/CroodView.vue";
// import DogView from "./components/basic/DogView.vue";
import AsyncShow from "./components/basic/AsyncShow.vue";
import AsyncDogShow from "./components/basic/AsyncDogShow.vue";

import Modal from "./components/basic/Modal.vue";
const modalIsOpen = ref(false)
const openModal = () => {
  modalIsOpen.value = true
}
const onModalClose = () => {
  modalIsOpen.value = false
}

</script>

<template>
  <div>
    <img src="/vite.svg" class="logo" alt="Vite logo" />
    <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  </div>
  <!-- <HelloCount msg="Vite + Vue" /> -->
  <!-- <ProxyView /> -->
  <!-- <GreetingWatch /> -->
  <CroodView />
  <!-- <DogView /> -->
  <button @click="openModal">open</button>
  <Modal :is-open="modalIsOpen" @close-modal="onModalClose">
    My Modal !!!
  </Modal>

  <Suspense>
    <template #default>
      <div>
        <AsyncShow />
        <AsyncDogShow />
      </div>
    </template>
    <template #fallback>
      loading ...
    </template>
  </Suspense>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
