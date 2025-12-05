<template>
  <DatePicker v-model="datePicker3" :clearable="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DatePicker } from '@elix/ui'

const datePicker3 = ref<Date | null>(new Date())
</script>

