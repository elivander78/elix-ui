<template>
  <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
    <Button>
      <template #icon>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </template>
      With Icon Left
    </Button>
    <Button>
      With Icon Right
      <template #suffix>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@elivander/elix-ui'
</script>

