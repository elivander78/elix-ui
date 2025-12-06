<template>
  <div :class="timelineClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import { timelineProps, type TimelineProps } from './Timeline'

defineOptions({
  name: 'EuiTimeline',
})

const props = defineProps(timelineProps)
const slots = useSlots()

const timelineClasses = computed(() => {
  return [
    'eui-timeline',
    {
      'eui-timeline--reverse': props.reverse,
    },
  ]
})

const itemCount = computed(() => {
  const children = slots.default?.() || []
  return children.filter((child: any) => child.type?.name === 'EuiTimelineItem').length
})

provide('timeline', {
  reverse: props.reverse,
  itemCount: itemCount.value,
})
</script>

<style lang="scss" scoped>
.eui-timeline {
  position: relative;
  padding-left: var(--eui-spacing-xl);
  list-style: none;

  &--reverse {
    padding-left: 0;
    padding-right: var(--eui-spacing-xl);
  }
}
</style>

