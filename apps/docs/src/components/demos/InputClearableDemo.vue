<template>
  <Input v-model="value" placeholder="Type to see clear button" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@elix/ui'

const value = ref('')
</script>

