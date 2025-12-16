<template>
  <EuiTextarea v-model="value" placeholder="Enter text" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea as EuiTextarea } from '@elivander/elix-ui'

const value = ref('')
</script>

