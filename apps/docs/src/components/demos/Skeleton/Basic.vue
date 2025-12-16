<template>
  <div class="skeleton-demo">
    <EuiSkeleton :loading="loading" :rows="3" type="text">
      <div>Content loaded</div>
    </EuiSkeleton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Skeleton as EuiSkeleton } from '@elivander/elix-ui'

const loading = ref(true)
</script>

<style lang="scss" scoped>
.skeleton-demo {
  width: 100%;
}
</style>

