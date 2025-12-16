<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiDatePicker v-model="datePicker7" appearance="border" />
    <EuiDatePicker v-model="datePicker8" appearance="shadow" />
    <EuiDatePicker v-model="datePicker9" appearance="border-shadow" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const datePicker7 = ref<Date | null>(null)
const datePicker8 = ref<Date | null>(null)
const datePicker9 = ref<Date | null>(null)
</script>

