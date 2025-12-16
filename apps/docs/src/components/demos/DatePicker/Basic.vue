<template>
  <div>
    <EuiDatePicker v-model="datePicker1" />
    <p style="margin-top: 8px;">Selected: {{ datePicker1 ? datePicker1.toLocaleDateString() : 'None' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const datePicker1 = ref<Date | null>(null)
</script>

