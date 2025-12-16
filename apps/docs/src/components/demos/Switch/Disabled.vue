<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiSwitch v-model="checked1" />
    <EuiSwitch v-model="checked2" disabled />
    <EuiSwitch v-model="checked3" disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch as EuiSwitch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
</script>

