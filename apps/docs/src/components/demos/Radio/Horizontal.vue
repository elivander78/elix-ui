<template>
  <div style="display: flex; gap: 16px;">
    <EuiRadio v-model="value" value="option1">Option 1</EuiRadio>
    <EuiRadio v-model="value" value="option2">Option 2</EuiRadio>
    <EuiRadio v-model="value" value="option3">Option 3</EuiRadio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Radio as EuiRadio } from '@elivander/elix-ui'

const value = ref('option1')
</script>

