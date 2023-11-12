<template>Is Secure: {{ isSecure }}</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import yn from 'yn';

const { query } = useRoute();
const isSecure = yn(query.isSecure);
</script>
