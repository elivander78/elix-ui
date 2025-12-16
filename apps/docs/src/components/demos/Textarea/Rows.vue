<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiTextarea v-model="value" :rows="3" placeholder="3 rows" />
    <EuiTextarea v-model="value" :rows="5" placeholder="5 rows" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea as EuiTextarea } from '@elivander/elix-ui'

const value = ref('')
</script>

