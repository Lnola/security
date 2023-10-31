<template>
  <Toolbar>
    <template #start>
      <RouterLink :to="{ name: 'SqlInjection' }">
        <Button text>Sql Injection</Button>
      </RouterLink>
      <RouterLink :to="{ name: 'Csrf' }">
        <Button text>Cross Site Request Forgery (CSRF)</Button>
      </RouterLink>
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
</script>
