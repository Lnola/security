<template>
  <Dialog
    :visible="isDialogVisible"
    @update:visible="setIsDialogVisible"
    :style="{ width: '30rem' }"
    modal
    header="Verify password"
    :draggable="false"
  >
  </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog';

const emits = defineEmits(['update:is-dialog-visible']);
defineProps({
  isDialogVisible: { type: Boolean, required: true },
});

const setIsDialogVisible = (value: boolean) => {
  emits('update:is-dialog-visible', value);
};
</script>
