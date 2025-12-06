<template>
  <div :class="emptyClasses">
    <div v-if="$slots.icon || icon" class="eui-empty__icon">
      <slot name="icon">
        <component :is="icon" v-if="icon" />
      </slot>
    </div>
    <div v-if="description || $slots.description" class="eui-empty__description">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="$slots.default" class="eui-empty__extra">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { emptyProps, type EmptyProps } from './Empty'

defineOptions({
  name: 'EuiEmpty',
})

const props = defineProps(emptyProps)

const emptyClasses = computed(() => {
  return [
    'eui-empty',
    `eui-empty--${props.size}`,
  ]
})
</script>

<style lang="scss" scoped>
.eui-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--eui-spacing-2xl);
  text-align: center;
  color: var(--eui-text-secondary);

  &--sm {
    --eui-empty-icon-size: 48px;
    --eui-empty-icon-margin: var(--eui-spacing-md);
    --eui-empty-description-font-size: var(--eui-font-size-sm);
    padding: var(--eui-spacing-lg);
  }

  &--md {
    --eui-empty-icon-size: 64px;
    --eui-empty-icon-margin: var(--eui-spacing-lg);
    --eui-empty-description-font-size: var(--eui-font-size-base);
    padding: var(--eui-spacing-2xl);
  }

  &--lg {
    --eui-empty-icon-size: 96px;
    --eui-empty-icon-margin: var(--eui-spacing-xl);
    --eui-empty-description-font-size: var(--eui-font-size-lg);
    padding: var(--eui-spacing-3xl);
  }

  &__icon {
    width: var(--eui-empty-icon-size);
    height: var(--eui-empty-icon-size);
    margin-bottom: var(--eui-empty-icon-margin);
    color: var(--eui-text-tertiary);
    opacity: 0.5;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }

  &__description {
    font-size: var(--eui-empty-description-font-size);
    color: var(--eui-text-secondary);
    margin-bottom: var(--eui-spacing-md);
  }

  &__extra {
    margin-top: var(--eui-spacing-md);
  }
}
</style>

