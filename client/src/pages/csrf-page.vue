<template>
  <Card class="app-content">
    <template #title>Cross Site Request Forgery (CSRF)</template>
    <template #content>
      <h3>Example of how the change password should work:</h3>
      <p>
        This should work always (doesn't depend on the security switch
        position).
        <br />
        (The default values for username and password are already set in the
        inputs)
      </p>
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
      </form>

      <h3>Instructions:</h3>
      <RouterLink
        :to="{ name: 'Reroute', query: { isSecure: String(isSecure) } }"
      >
        Click this link to initiate the password change
      </RouterLink>
      <p>
        You will be redirected to another page which will try and update the
        password.
        <br />
        When the switch is set to <b>no security</b> CSRF is possible and the
        password will be updated to "123".
        <br />
        When the switch is set to <b>secure</b> CSRF should not be possible and
        the password will not change.
        <br />
        You will see the alert stating whether the password has changed on the
        routed page.
      </p>

      <div class="flex align-items-center mt-4">
        <label class="mr-2" for="switch">Enable security</label>
        <InputSwitch v-model="isSecure" inputId="switch" />
      </div>

      <div class="flex flex-column mt-4 gap-2">
        <div class="flex align-items-center gap-2">
          <Button @click="showDialog">Verify password</Button>
          <span>
            (Use the verify password button to check the current password value)
          </span>
        </div>
        <div class="flex align-items-center gap-2">
          <Button @click="handleReset">Reset user</Button>
          <span>
            (Use the reset user button to reset the user password to the default
            values)
          </span>
        </div>
      </div>

      <VerifyPassword v-model:is-dialog-visible="isDialogVisible" />
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import VerifyPassword from '@/components/csrf/verify-password.vue';
import { fetchToken, updatePasswordSecure, resetUser } from '@/api/csrf';

const toast = useToast();

const username = ref('admin');
const newPassword = ref('password');
const isSecure = ref(false);
const isDialogVisible = ref(false);
const token = ref<string | null>(null);

onMounted(async () => {
  token.value = await fetchToken();
});

const showDialog = () => (isDialogVisible.value = true);

const changePassword = async (e: Event) => {
  e.preventDefault();
  try {
    token.value = await updatePasswordSecure({
      username: username.value,
      newPassword: newPassword.value,
      token: token.value,
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
