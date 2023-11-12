<template>Is Secure: {{ isSecure }}</template>

<script lang="ts" setup>
import yn from 'yn';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { updatePasswordVulnarable, updatePasswordSecure } from '@/api/csrf';

const toast = useToast();
const { query } = useRoute();
const isSecure = yn(query.isSecure);

onMounted(async () => {
  await changePassword();
});

const changePassword = async () => {
  const username = 'admin';
  const newPassword = '123';
  try {
    const updatePasswordMethod = isSecure
      ? updatePasswordSecure
      : updatePasswordVulnarable;
    await updatePasswordMethod({ username, newPassword });
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Password updated to "1234"!',
      life: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Update password blocked!',
      life: 3000,
    });
  }
};
</script>
