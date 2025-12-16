<template>
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 300px;">
    <EuiInput placeholder="With prefix icon">
      <template #prefix>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M7.333 2.667a4.667 4.667 0 1 0 0 9.333 4.667 4.667 0 0 0 0-9.333ZM14 14l-2.9-2.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </template>
    </EuiInput>
    <EuiInput placeholder="With suffix icon">
      <template #suffix>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </template>
    </EuiInput>
  </div>
</template>

<script setup lang="ts">
import { Input as EuiInput } from '@elivander/elix-ui'
</script>

