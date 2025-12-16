<template>
  <div class="eui-card-footer">
    <slot />
  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: 'EuiCardFooter',
})
</script>

<style lang="scss" scoped>
.eui-card-footer {
  padding: var(--eui-spacing-lg);
  border-top: 1px solid var(--eui-border-color);
  color: var(--eui-text-secondary);
}
</style>

