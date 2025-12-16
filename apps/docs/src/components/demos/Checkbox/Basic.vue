<template>
  <EuiCheckbox v-model="checked">I agree</EuiCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox as EuiCheckbox } from '@elivander/elix-ui'

const checked = ref(false)
</script>

