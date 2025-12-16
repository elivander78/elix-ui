<template>
  <div class="skeleton-demo">
    <div style="display: flex; gap: 10px; margin-bottom: 16px;">
      <EuiButton @click="loading = !loading">Toggle Loading</EuiButton>
    </div>
    <div style="border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); overflow: hidden;">
      <EuiSkeleton :loading="loading" :rows="5" :animated="true">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: var(--eui-bg-secondary);">
              <th style="padding: 12px; text-align: left;">Name</th>
              <th style="padding: 12px; text-align: left;">Email</th>
              <th style="padding: 12px; text-align: left;">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 12px;">John Doe</td><td style="padding: 12px;">john@example.com</td><td style="padding: 12px;">Admin</td></tr>
            <tr><td style="padding: 12px;">Jane Smith</td><td style="padding: 12px;">jane@example.com</td><td style="padding: 12px;">User</td></tr>
            <tr><td style="padding: 12px;">Bob Johnson</td><td style="padding: 12px;">bob@example.com</td><td style="padding: 12px;">User</td></tr>
          </tbody>
        </table>
      </EuiSkeleton>
    </div>
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

