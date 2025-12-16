<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiCheckbox v-model="checked1">Option 1</EuiCheckbox>
    <EuiCheckbox v-model="checked2">Option 2</EuiCheckbox>
    <EuiCheckbox v-model="checked3">Option 3</EuiCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox as EuiCheckbox } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
</script>

