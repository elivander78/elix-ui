<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Checkbox v-model="checked1">Option 1</Checkbox>
    <Checkbox v-model="checked2">Option 2</Checkbox>
    <Checkbox v-model="checked3">Option 3</Checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

const checked1 = ref(false)
const checked2 = ref(true)
const checked3 = ref(false)
</script>

