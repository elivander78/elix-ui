<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <EuiSwitch v-model="checked1" size="sm" />
    <EuiSwitch v-model="checked2" size="md" />
    <EuiSwitch v-model="checked3" size="lg" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch as EuiSwitch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
</script>

