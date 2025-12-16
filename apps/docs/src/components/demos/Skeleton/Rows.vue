<template>
  <div class="skeleton-demo" style="display: flex; flex-direction: column; gap: 20px;">
    <EuiSkeleton :loading="true" :rows="1" type="text" />
    <EuiSkeleton :loading="true" :rows="3" type="text" />
    <EuiSkeleton :loading="true" :rows="5" type="text" />
  </div>
</template>

<script setup lang="ts">
import { Skeleton as EuiSkeleton } from '@elivander/elix-ui'
</script>

<style lang="scss" scoped>
.skeleton-demo {
  width: 100%;
}
</style>

