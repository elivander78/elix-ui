<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiCheckbox v-model="checked1">Enabled</EuiCheckbox>
    <EuiCheckbox v-model="checked2" disabled>Disabled</EuiCheckbox>
    <EuiCheckbox v-model="checked3" disabled>Disabled Checked</EuiCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox as EuiCheckbox } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
</script>

