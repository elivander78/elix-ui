<template>
  <div :class="colClasses" :style="colStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Breakpoint } from '../../tokens/breakpoints'

const props = defineProps<{
  span?: number | Partial<Record<Breakpoint, number>>
  offset?: number | Partial<Record<Breakpoint, number>>
  order?: number | Partial<Record<Breakpoint, number>>
}>()

const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

const colClasses = computed(() => {
  const classes: string[] = ['eui-col']
  
  if (typeof props.span === 'number') {
    classes.push(`eui-col--span-${props.span}`)
  } else if (props.span) {
    breakpoints.forEach((bp) => {
      if (props.span[bp] !== undefined) {
        classes.push(`eui-col--${bp}-span-${props.span[bp]}`)
      }
    })
  }
  
  if (typeof props.offset === 'number') {
    classes.push(`eui-col--offset-${props.offset}`)
  } else if (props.offset) {
    breakpoints.forEach((bp) => {
      if (props.offset[bp] !== undefined) {
        classes.push(`eui-col--${bp}-offset-${props.offset[bp]}`)
      }
    })
  }
  
  if (typeof props.order === 'number') {
    classes.push(`eui-col--order-${props.order}`)
  } else if (props.order) {
    breakpoints.forEach((bp) => {
      if (props.order[bp] !== undefined) {
        classes.push(`eui-col--${bp}-order-${props.order[bp]}`)
      }
    })
  }
  
  return classes
})

const colStyle = computed(() => {
  const style: Record<string, string> = {}
  const gutter = 0 // This should come from Row context, simplified for now
  
  if (gutter) {
    style.paddingLeft = `${gutter / 2}px`
    style.paddingRight = `${gutter / 2}px`
  }
  
  return style
})
</script>

<style lang="scss" scoped>
@use 'sass:math';

.eui-col {
  flex: 0 0 auto;
  width: 100%;

  // Span classes
  @for $i from 1 through 24 {
    &--span-#{$i} {
      flex: 0 0 math.percentage(math.div($i, 24));
      max-width: math.percentage(math.div($i, 24));
    }

    &--offset-#{$i} {
      margin-left: math.percentage(math.div($i, 24));
    }

    &--order-#{$i} {
      order: $i;
    }
  }

  // Responsive breakpoints
  @media (min-width: 0px) {
    @for $i from 1 through 24 {
      &--xs-span-#{$i} {
        flex: 0 0 math.percentage(math.div($i, 24));
        max-width: math.percentage(math.div($i, 24));
      }

      &--xs-offset-#{$i} {
        margin-left: math.percentage(math.div($i, 24));
      }

      &--xs-order-#{$i} {
        order: $i;
      }
    }
  }

  @media (min-width: 640px) {
    @for $i from 1 through 24 {
      &--sm-span-#{$i} {
        flex: 0 0 math.percentage(math.div($i, 24));
        max-width: math.percentage(math.div($i, 24));
      }

      &--sm-offset-#{$i} {
        margin-left: math.percentage(math.div($i, 24));
      }

      &--sm-order-#{$i} {
        order: $i;
      }
    }
  }

  @media (min-width: 768px) {
    @for $i from 1 through 24 {
      &--md-span-#{$i} {
        flex: 0 0 math.percentage(math.div($i, 24));
        max-width: math.percentage(math.div($i, 24));
      }

      &--md-offset-#{$i} {
        margin-left: math.percentage(math.div($i, 24));
      }

      &--md-order-#{$i} {
        order: $i;
      }
    }
  }

  @media (min-width: 1024px) {
    @for $i from 1 through 24 {
      &--lg-span-#{$i} {
        flex: 0 0 math.percentage(math.div($i, 24));
        max-width: math.percentage(math.div($i, 24));
      }

      &--lg-offset-#{$i} {
        margin-left: math.percentage(math.div($i, 24));
      }

      &--lg-order-#{$i} {
        order: $i;
      }
    }
  }

  @media (min-width: 1280px) {
    @for $i from 1 through 24 {
      &--xl-span-#{$i} {
        flex: 0 0 math.percentage(math.div($i, 24));
        max-width: math.percentage(math.div($i, 24));
      }

      &--xl-offset-#{$i} {
        margin-left: math.percentage(math.div($i, 24));
      }

      &--xl-order-#{$i} {
        order: $i;
      }
    }
  }

  @media (min-width: 1536px) {
    @for $i from 1 through 24 {
      &--2xl-span-#{$i} {
        flex: 0 0 math.percentage(math.div($i, 24));
        max-width: math.percentage(math.div($i, 24));
      }

      &--2xl-offset-#{$i} {
        margin-left: math.percentage(math.div($i, 24));
      }

      &--2xl-order-#{$i} {
        order: $i;
      }
    }
  }
}
</style>

