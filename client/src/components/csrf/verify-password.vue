<template>
  <Dialog
    :visible="isDialogVisible"
    @update:visible="setIsDialogVisible"
    :style="{ width: '30rem' }"
    modal
    header="Verify password"
    :draggable="false"
  >
    <form @submit="onSubmit" class="mt-4">
      <div class="flex flex-column gap-1">
        <label for="username">Username</label>
        <InputText
          class="w-full"
          v-model="username"
          id="username"
          :disabled="true"
        />
      </div>
      <div class="flex flex-column mt-3 gap-1">
        <label for="password">Password</label>
        <Password
          class="w-full"
          v-model="password"
          :inputStyle="{ width: '100%' }"
          :feedback="false"
          inputId="password"
          toggleMask
        />
      </div>
      <Button class="mt-3" type="submit">Submit</Button>
    </form>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { verifyPassword } from '@/api/csrf';

const emits = defineEmits(['update:is-dialog-visible']);
defineProps({
  isDialogVisible: { type: Boolean, required: true },
});

const toast = useToast();

const username = ref('admin');
const password = ref('');

const setIsDialogVisible = (value: boolean) => {
  emits('update:is-dialog-visible', value);
};

const onSubmit = async (e: Event) => {
  e.preventDefault();
  try {
    await verifyPassword({
      username: username.value,
      password: password.value,
    });
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Password correct!',
      life: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Password incorrect!',
      life: 3000,
    });
  }
};
</script>
