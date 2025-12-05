<template>
  <div class="skeleton-demo">
    <Skeleton :loading="loading" type="avatar" :rows="3" :animated="true">
      <div>Animated skeleton content</div>
    </Skeleton>
    <Button @click="loading = !loading" style="margin-top: 20px;">Toggle Loading</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Skeleton, Button } from '@elix/ui'

const loading = ref(true)
</script>

<style lang="scss" scoped>
.skeleton-demo {
  width: 100%;
}
</style>

