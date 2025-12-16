<template>
  <EuiTextarea v-model="value" placeholder="Type to see auto-resize" :rows="3" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea as EuiTextarea } from '@elivander/elix-ui'

const value = ref('')
</script>

