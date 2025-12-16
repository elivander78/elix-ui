<template>
  <div class="skeleton-demo" style="max-width: 400px;">
    <EuiCard>
      <EuiSkeleton :loading="loading" type="avatar" :rows="3" :animated="true">
        <div style="display: flex; gap: 16px;">
          <EuiAvatar>JD</EuiAvatar>
          <div>
            <h3 style="margin: 0 0 8px 0;">John Doe</h3>
            <p style="margin: 0; color: var(--eui-text-secondary);">Software Developer</p>
            <p style="margin: 8px 0 0 0;">This is some content that appears when loading is false.</p>
          </div>
        </div>
      </EuiSkeleton>
      <EuiButton @click="loading = !loading" style="margin-top: 16px;">Toggle Loading</EuiButton>
    </EuiCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Skeleton as EuiSkeleton, Card as EuiCard, Avatar as EuiAvatar, Button as EuiButton } from '@elivander/elix-ui'

const loading = ref(true)
</script>

<style lang="scss" scoped>
.skeleton-demo {
  width: 100%;
}
</style>

