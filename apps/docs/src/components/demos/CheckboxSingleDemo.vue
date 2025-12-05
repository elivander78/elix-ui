<template>
  <Checkbox v-model="checked">Accept terms and conditions</Checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@elivander/elix-ui'

const checked = ref(false)
</script>

