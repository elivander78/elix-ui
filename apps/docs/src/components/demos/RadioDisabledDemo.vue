<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Radio v-model="value" value="option1">Enabled</Radio>
    <Radio v-model="value" value="option2" disabled>Disabled</Radio>
    <Radio v-model="value" value="option3" disabled>Disabled Selected</Radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Radio } from '@elivander/elix-ui'

const value = ref('option3')
</script>

