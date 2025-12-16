<template>
  <EuiInput v-model="value" placeholder="Enter text" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input as EuiInput } from '@elivander/elix-ui'

const value = ref('')
</script>

