<template>
  <div class="skeleton-demo">
    <EuiSkeleton :loading="loading" type="avatar" :rows="3">
      <div>Content with avatar loaded</div>
    </EuiSkeleton>
    <EuiButton @click="loading = !loading" style="margin-top: 20px;">Toggle Loading</EuiButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Skeleton as EuiSkeleton, Button as EuiButton } from '@elivander/elix-ui'

const loading = ref(true)
</script>

<style lang="scss" scoped>
.skeleton-demo {
  width: 100%;
}
</style>

