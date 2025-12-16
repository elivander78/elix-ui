<template>
  <EuiCheckbox v-model="checked">Accept terms and conditions</EuiCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox as EuiCheckbox } from '@elivander/elix-ui'

const checked = ref(false)
</script>

