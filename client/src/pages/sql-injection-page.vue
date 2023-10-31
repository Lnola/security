<template>
  <Card class="h-full">
    <template #title>Sql injection</template>
    <template #content>
      <h3>Instructions:</h3>
      <p>
        This is a simple user search designed to search for a specific user
        defined by their <b>username</b>.
        <br />
        When the switch is set to <b>secure</b> SQL injection should not be
        possible.
        <br />
        When the switch is set to <b>no security</b> SQL injection is possible.
      </p>

      <form @submit="onSubmit">
        <h3>Examples:</h3>
        <span>
          <p class="m-0">Correct usage - search for with username user1</p>
          <SyApply @click="apply" text="user1" />
        </span>
        <span>
          <p class="m-0">To see the list of all users:</p>
          <SyApply @click="apply" text="' OR 1=1 OR '1" />
        </span>
        <span>
          <p class="m-0">To delete all users in the database:</p>
          <SyApply @click="apply" text="';TRUNCATE TABLE users; SELECT '" />
        </span>

        <label for="username" class="mr-2">Search by username:</label>
        <InputText class="mt-4 w-18rem" v-model="input" id="username" />
        <Button class="h-auto" type="submit" icon="pi pi-search" />

        <div class="flex align-items-center mt-4">
          <label class="mr-2" for="switch">Enable security</label>
          <InputSwitch v-model="isSecure" inputId="switch" />
        </div>
      </form>

      <div class="mt-4">
        <Button @click="handleReset">Reset users table</Button>
        <br />
        <small>
          To reset the table after truncation and
          <br />
          other table modification use this button
        </small>
      </div>

      <pre class="surface-100 border-round">{{ response }}</pre>
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
import SyApply from '@/components/sy-apply.vue';
import {
  searchSecure,
  searchVulnarable,
  resetUsersTable,
} from '@/api/sql-injection';

const toast = useToast();

const input = ref('');
const isSecure = ref(false);
const response = ref<unknown>(null);

const apply = (text: string) => {
  input.value = text;
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Example applied!',
    life: 3000,
  });
};

const onSubmit = async (e: Event) => {
  e.preventDefault();
  if (!input.value.length) return;
  const searchMethod = isSecure.value ? searchSecure : searchVulnarable;
  response.value = await searchMethod(input.value);
};

const handleReset = async () => {
  try {
    await resetUsersTable();
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Database reset!',
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Database reset failed!',
      life: 3000,
    });
  }
};
</script>
