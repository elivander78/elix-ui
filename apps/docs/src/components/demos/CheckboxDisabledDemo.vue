<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Checkbox v-model="checked1">Enabled</Checkbox>
    <Checkbox v-model="checked2" disabled>Disabled</Checkbox>
    <Checkbox v-model="checked3" disabled>Disabled Checked</Checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

const checked1 = ref(false)
const checked2 = ref(false)
const checked3 = ref(true)
</script>

