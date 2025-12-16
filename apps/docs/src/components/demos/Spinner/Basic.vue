<template>
  <div class="spinner-demo" style="display: flex; gap: 20px; align-items: center;">
    <EuiSpinner />
    <EuiSpinner size="sm" />
    <EuiSpinner size="lg" />
    <EuiSpinner :size="48" :thickness="6" label="Loading..." />
  </div>
</template>

<script setup lang="ts">
import { Spinner as EuiSpinner } from '@elivander/elix-ui'
</script>

<style lang="scss" scoped>
.spinner-demo {
  width: 100%;
}
</style>

