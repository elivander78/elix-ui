<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <DatePicker v-model="datePicker4" status="error" />
    <DatePicker v-model="datePicker5" status="success" />
    <DatePicker v-model="datePicker6" :disabled="true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@elix/ui'

const datePicker4 = ref<Date | null>(null)
const datePicker5 = ref<Date | null>(null)
const datePicker6 = ref<Date | null>(new Date())
</script>

