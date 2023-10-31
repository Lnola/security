<template>
  <Card class="app-content">
    <template #title>Cross Site Request Forgery (CSRF)</template>
    <template #content>
      <h3>Instructions:</h3>
      <span>
        This is a simple user password change form for the currently signed in
        user. The default values are:
        <pre class="my-0">username: admin</pre>
        <pre class="my-0">password: password</pre>
        <br />
        When the switch is set to <b>secure</b> CSRF should not be possible.
        <br />
        When the switch is set to <b>no security</b> CSRF is possible.
      </span>

      <form @submit="changePassword" class="mt-4">
        <div class="flex flex-column gap-1">
          <label for="username">Username</label>
          <InputText
            class="w-18rem"
            v-model="username"
            id="username"
            :disabled="true"
          />
        </div>
        <div class="flex flex-column mt-3 gap-1">
          <label for="new_password">New Password</label>
          <Password
            class="w-18rem"
            v-model="newPassword"
            :inputStyle="{ width: '100%' }"
            :feedback="false"
            inputId="new_password"
            toggleMask
          />
        </div>
        <Button class="mt-3" type="submit">Submit</Button>

        <div class="flex align-items-center mt-4">
          <label class="mr-2" for="switch">Enable security</label>
          <InputSwitch v-model="isSecure" inputId="switch" />
        </div>
      </form>

      <div class="flex gap-2 mt-4">
        <Button @click="showDialog">Verify password</Button>
        <Button @click="handleReset">Reset user</Button>
      </div>

      <VerifyPassword v-model:is-dialog-visible="isDialogVisible" />
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import Password from 'primevue/password';
import VerifyPassword from '@/components/csrf/verify-password.vue';
import {
  updatePasswordVulnarable,
  updatePasswordSecure,
  resetUser,
} from '@/api/csrf';

const toast = useToast();

const username = ref('admin');
const newPassword = ref('password');
const isSecure = ref(false);
const isDialogVisible = ref(false);

const showDialog = () => (isDialogVisible.value = true);

const changePassword = async (e: Event) => {
  e.preventDefault();
  try {
    const updatePasswordMethod = isSecure.value
      ? updatePasswordSecure
      : updatePasswordVulnarable;
    await updatePasswordMethod({
      username: username.value,
      newPassword: newPassword.value,
    });
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Password updated!',
      life: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to update password!',
      life: 3000,
    });
  }
};

const handleReset = async () => {
  try {
    await resetUser();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User data reset!',
      life: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'User data reset failed!',
      life: 3000,
    });
  }
};
</script>
