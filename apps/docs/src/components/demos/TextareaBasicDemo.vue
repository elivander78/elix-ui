<template>
  <Textarea v-model="value" placeholder="Enter text" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@elivander/elix-ui'

const value = ref('')
</script>

