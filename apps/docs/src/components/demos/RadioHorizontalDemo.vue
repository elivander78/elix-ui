<template>
  <div style="display: flex; gap: 16px;">
    <Radio v-model="value" value="option1">Option 1</Radio>
    <Radio v-model="value" value="option2">Option 2</Radio>
    <Radio v-model="value" value="option3">Option 3</Radio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Radio } from '@elivander/elix-ui'

const value = ref('option1')
</script>

