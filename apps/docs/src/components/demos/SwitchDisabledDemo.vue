<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Switch v-model="checked1" />
    <Switch v-model="checked2" disabled />
    <Switch v-model="checked3" disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
</script>

