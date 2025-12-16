<template>
  <EuiCheckbox v-model="checked" :indeterminate="indeterminate" @change="handleChange">
    Select all
  </EuiCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox as EuiCheckbox } from '@elivander/elix-ui'

const checked = ref(false)
const indeterminate = ref(true)

const handleChange = (value: boolean) => {
  indeterminate.value = false
}
</script>

