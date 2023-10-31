<template>
  <span class="flex align-items-center p-card-subtitle my-0">
    <pre
      class="ml-2 mr-1 my-0 text-overflow-ellipsis overflow-hidden surface-100 border-round"
      >{{ text }}</pre
    >
    <Button
      class="h-auto"
      @click="emits('click', text)"
      icon="pi pi-check-square"
      severity="secondary"
      rounded
      text
    />
  </span>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';

const emits = defineEmits(['click']);
defineProps({
  text: { type: String, required: true },
});
</script>
