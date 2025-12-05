<template>
  <div class="eui-card-body">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.eui-card-body {
  padding: var(--eui-spacing-lg);
  color: var(--eui-text-primary);
}
</style>

