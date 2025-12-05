<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Switch v-model="checked1">Enable notifications</Switch>
    <Switch v-model="checked2">Toggle</Switch>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(true)
</script>

