<template>
  <div :class="listItemClasses" @click="handleClick">
    <div v-if="$slots.icon || icon" class="eui-list-item__icon">
      <slot name="icon">
        <component :is="icon" v-if="icon" />
      </slot>
    </div>
    <div class="eui-list-item__content">
      <div v-if="title || $slots.title" class="eui-list-item__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="eui-list-item__description">
        <slot name="description">{{ description }}</slot>
      </div>
      <div v-if="$slots.default" class="eui-list-item__children">
        <slot />
      </div>
    </div>
    <div v-if="$slots.extra || extra" class="eui-list-item__extra">
      <slot name="extra">
        <component :is="extra" v-if="extra" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { listItemProps, type ListItemProps } from './ListItem'

defineOptions({
  name: 'EuiListItem',
})

const props = defineProps(listItemProps)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

interface ListContext {
  size?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const list = inject<ListContext | undefined>('list', undefined)

const listItemClasses = computed(() => {
  return [
    'eui-list-item',
    {
      'eui-list-item--clickable': props.clickable || list?.hoverable,
      [`eui-list-item--${list?.size || 'md'}`]: true,
    },
  ]
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.eui-list-item {
  display: flex;
  align-items: center;
  gap: var(--eui-spacing-md);
  padding: var(--eui-list-item-padding, var(--eui-spacing-md) var(--eui-spacing-lg));
  font-size: var(--eui-list-item-font-size, var(--eui-font-size-base));
  color: var(--eui-text-primary);
  border-bottom: 1px solid var(--eui-border-color);
  transition: background-color 0.2s ease-in-out;

  &:last-child {
    border-bottom: none;
  }

  &--clickable {
    cursor: pointer;

    &:hover {
      background-color: var(--eui-bg-tertiary);
    }

    &:active {
      background-color: var(--eui-bg-hover-primary);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--eui-text-secondary);
    font-size: 1.2em;
  }

  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--eui-spacing-xs);
  }

  &__title {
    font-weight: var(--eui-font-weight-medium);
    color: var(--eui-text-primary);
    line-height: var(--eui-line-height-normal);
  }

  &__description {
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    line-height: var(--eui-line-height-relaxed);
  }

  &__children {
    margin-top: var(--eui-spacing-xs);
  }

  &__extra {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-left: auto;
  }
}
</style>

