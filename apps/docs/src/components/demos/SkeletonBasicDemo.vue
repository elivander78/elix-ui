<template>
  <div class="skeleton-demo">
    <Skeleton :loading="loading" :rows="3" type="text">
      <div>Content loaded</div>
    </Skeleton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Skeleton } from '@elix/ui'

const loading = ref(true)
</script>

<style lang="scss" scoped>
.skeleton-demo {
  width: 100%;
}
</style>

