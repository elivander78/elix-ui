<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiSwitch v-model="checked1">Enable notifications</EuiSwitch>
    <EuiSwitch v-model="checked2">Toggle</EuiSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch as EuiSwitch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(true)
</script>

