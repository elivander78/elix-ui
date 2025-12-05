<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <DatePicker v-model="datePicker7" appearance="border" />
    <DatePicker v-model="datePicker8" appearance="shadow" />
    <DatePicker v-model="datePicker9" appearance="border-shadow" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@elivander/elix-ui'

const datePicker7 = ref<Date | null>(null)
const datePicker8 = ref<Date | null>(null)
const datePicker9 = ref<Date | null>(null)
</script>

