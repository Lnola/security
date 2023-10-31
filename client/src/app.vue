<template>
  <AppNav />
  <Toast />
  <RouterView />
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import AppNav from '@/components/layout/app-nav.vue';
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
