<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <EuiDatePicker v-model="datePicker4" status="error" />
    <EuiDatePicker v-model="datePicker5" status="success" />
    <EuiDatePicker v-model="datePicker6" :disabled="true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const datePicker4 = ref<Date | null>(null)
const datePicker5 = ref<Date | null>(null)
const datePicker6 = ref<Date | null>(new Date())
</script>

