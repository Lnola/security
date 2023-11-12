<template>
  <Card class="app-content">
    <template #title>
      CSRF attack (
      <pre class="surface-100 inline">isSecure: {{ isSecure }}</pre>
      )
    </template>
    <template #content>
      <h3>The attack has been initiated</h3>
      <p class="max-w-30rem">
        This page sends the update password api request which will or will not
        trigger a password change depending on whether the isSecure option is
        set.
        <br />
        <br />
        If the safety is <b>FALSE</b>, the attack should succed and you should see a
        toast stating: <pre>{{ SUCCESS_MESSAGE }}</pre>
        <br />
        If the safety is <b>TRUE</b>, the attack should fail and you should see a toast
        stating: <pre>{{ FAILURE_MESSAGE }}</pre>
      </p>

      <RouterLink :to="{ name: 'Csrf' }">
        <Button >Go back to CSRF page</Button>
      </RouterLink>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import yn from 'yn';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { updatePasswordVulnarable, updatePasswordSecure } from '@/api/csrf';

const USERNAME = 'admin';
const NEW_PASSWORD = '123';
const SUCCESS_MESSAGE = `Password updated to "${NEW_PASSWORD}"!`;
const FAILURE_MESSAGE = 'Update password blocked!';

const toast = useToast();
const { query } = useRoute();
const isSecure = yn(query.isSecure);

onMounted(async () => {
  await changePassword();
});

const changePassword = async () => {
  try {
    const updatePasswordMethod = isSecure
      ? updatePasswordSecure
      : updatePasswordVulnarable;
    await updatePasswordMethod({
      username: USERNAME,
      newPassword: NEW_PASSWORD,
      token: null,
    });
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: SUCCESS_MESSAGE,
      life: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: FAILURE_MESSAGE,
      life: 3000,
    });
  }
};
</script>
