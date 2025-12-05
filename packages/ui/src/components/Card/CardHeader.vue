<template>
  <div class="eui-card-header">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.eui-card-header {
  padding: var(--eui-spacing-lg);
  border-bottom: 1px solid var(--eui-border-color);
  font-weight: var(--eui-font-weight-semibold);
  font-size: var(--eui-font-size-lg);
  color: var(--eui-text-primary);
}
</style>

