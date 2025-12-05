<template>
  <Input v-model="value" placeholder="Enter text" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@elivander/elix-ui'

const value = ref('')
</script>

