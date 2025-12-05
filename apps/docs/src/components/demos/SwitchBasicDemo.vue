<template>
  <Switch v-model="checked" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from '@elivander/elix-ui'

const checked = ref(false)
</script>

