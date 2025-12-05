<template>
  <Checkbox v-model="checked">I agree</Checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@elix/ui'

const checked = ref(false)
</script>

