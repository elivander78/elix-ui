<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Switch v-model="checked1" size="sm" />
    <Switch v-model="checked2" size="md" />
    <Switch v-model="checked3" size="lg" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@elivander/elix-ui'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
</script>

