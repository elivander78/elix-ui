<template>
  <div class="spinner-demo" style="display: flex; gap: 20px; align-items: center;">
    <Spinner />
    <Spinner size="sm" />
    <Spinner size="lg" />
    <Spinner :size="48" :thickness="6" label="Loading..." />
  </div>
</template>

<script setup lang="ts">
import { Spinner } from '@elivander/elix-ui'
</script>

<style lang="scss" scoped>
.spinner-demo {
  width: 100%;
}
</style>

