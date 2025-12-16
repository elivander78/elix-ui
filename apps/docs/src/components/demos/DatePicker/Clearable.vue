<template>
  <EuiDatePicker v-model="datePicker3" :clearable="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const datePicker3 = ref<Date | null>(new Date())
</script>

