<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <Textarea v-model="value" :rows="3" placeholder="3 rows" />
    <Textarea v-model="value" :rows="5" placeholder="5 rows" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@elivander/elix-ui'

const value = ref('')
</script>

