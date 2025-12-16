<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiRadio v-model="value" value="option1">Enabled</EuiRadio>
    <EuiRadio v-model="value" value="option2" disabled>Disabled</EuiRadio>
    <EuiRadio v-model="value" value="option3" disabled>Disabled Selected</EuiRadio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Radio as EuiRadio } from '@elivander/elix-ui'

const value = ref('option3')
</script>

