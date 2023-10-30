<template>
  <Toast />
  <RouterView />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
}

#app {
  height: 100%;
}

.app-content {
  height: calc(100% - 72px);
}
</style>
