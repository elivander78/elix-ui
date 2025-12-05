<template>
  <div :class="dividerClasses" :style="dividerStyle">
    <span v-if="vertical" class="eui-divider__vertical"></span>
    <span v-else-if="$slots.default" class="eui-divider__text">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  vertical?: boolean
  dashed?: boolean
}>()

const dividerClasses = computed(() => {
  return [
    'eui-divider',
    {
      'eui-divider--vertical': props.vertical,
      'eui-divider--horizontal': !props.vertical,
      'eui-divider--dashed': props.dashed,
    },
  ]
})

const dividerStyle = computed(() => {
  return {}
})
</script>

<style lang="scss" scoped>
.eui-divider {
  &--horizontal {
    display: block;
    width: 100%;
    margin: var(--eui-spacing-lg) 0;
    border-top: 1px solid var(--eui-border-color);

    &.eui-divider--dashed {
      border-top-style: dashed;
    }
  }

  &--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 var(--eui-spacing-sm);
    vertical-align: middle;
    border-left: 1px solid var(--eui-border-color);

    &.eui-divider--dashed {
      border-left-style: dashed;
    }
  }

  &__text {
    display: inline-block;
    padding: 0 var(--eui-spacing-md);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    background-color: var(--eui-bg-primary);
  }
}
</style>

