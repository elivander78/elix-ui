<template>
  <div :class="listClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { listProps, type ListProps } from './List'

defineOptions({
  name: 'EuiList',
})

const props = defineProps(listProps)

const listClasses = computed(() => {
  return [
    'eui-list',
    {
      'eui-list--bordered': props.bordered,
      'eui-list--hoverable': props.hoverable,
      [`eui-list--${props.size}`]: props.size,
      [`eui-list--appearance-${props.appearance}`]: props.appearance,
    },
  ]
})

interface ListContext {
  size: ListProps['size']
  hoverable: ListProps['hoverable']
}

provide('list', {
  size: props.size,
  hoverable: props.hoverable,
})
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--eui-bg-primary);
  border-radius: var(--eui-radius-md);

  &--bordered {
    @include border-shadow(var(--eui-border-color), 1px);
  }

  &--appearance-shadow {
    box-shadow: var(--eui-shadow-sm);
  }

  &--appearance-border-shadow {
    @include border-shadow(var(--eui-border-color), 1px);
    box-shadow: var(--eui-shadow-sm);
  }

  &--sm {
    --eui-list-item-padding: var(--eui-spacing-sm) var(--eui-spacing-md);
    --eui-list-item-font-size: var(--eui-font-size-sm);
  }

  &--md {
    --eui-list-item-padding: var(--eui-spacing-md) var(--eui-spacing-lg);
    --eui-list-item-font-size: var(--eui-font-size-base);
  }

  &--lg {
    --eui-list-item-padding: var(--eui-spacing-lg) var(--eui-spacing-xl);
    --eui-list-item-font-size: var(--eui-font-size-lg);
  }
}
</style>

