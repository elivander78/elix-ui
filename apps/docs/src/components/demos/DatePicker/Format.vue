<template>
  <EuiDatePicker v-model="datePicker2" format="DD.MM.YYYY" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker as EuiDatePicker } from '@elivander/elix-ui'

const datePicker2 = ref<Date | null>(null)
</script>

