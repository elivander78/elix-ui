<template>
  <div :class="skeletonClasses" :style="skeletonStyle">
    <div v-if="loading" class="eui-skeleton__content">
      <template v-if="type === 'avatar' || avatar">
        <div :class="avatarClasses"></div>
      </template>
      <template v-else-if="type === 'rect'">
        <div class="eui-skeleton__rect"></div>
      </template>
      <template v-else-if="type === 'circle'">
        <div class="eui-skeleton__circle"></div>
      </template>
      <div v-if="type === 'text' || type === 'avatar' || avatar" class="eui-skeleton__body">
        <div v-for="i in rows" :key="i" :class="lineClasses(i)"></div>
      </div>
    </div>
    <div v-else class="eui-skeleton__children">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiSkeleton',

})

import { computed } from 'vue'

const props = defineProps<{
  loading?: boolean
  avatar?: boolean
  rows?: number
  animated?: boolean
  variant?: 'pulse' | 'wave'
  type?: 'text' | 'avatar' | 'rect' | 'circle'
}>()

const skeletonClasses = computed(() => {
  return [
    'eui-skeleton',
    {
      'eui-skeleton--animated': props.animated !== false,
      [`eui-skeleton--${props.variant || 'wave'}`]: props.animated !== false,
    },
  ]
})

const skeletonStyle = computed(() => {
  return {}
})

const avatarClasses = computed(() => {
  return [
    'eui-skeleton__avatar',
    {
      'eui-skeleton__avatar--animated': props.animated !== false,
    },
  ]
})

const lineClasses = (index: number) => {
  return [
    'eui-skeleton__line',
    {
      'eui-skeleton__line--short': index === props.rows && props.rows > 1,
    },
  ]
}
</script>

<style lang="scss" scoped>
.eui-skeleton {
  &__content {
    display: flex;
    gap: var(--eui-spacing-md);
  }

  &__avatar {
    width: 40px;
    height: 40px;
    background-color: var(--eui-skeleton-bg);
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__rect {
    width: 100%;
    height: 200px;
    background-color: var(--eui-skeleton-bg);
    border-radius: var(--eui-radius-md);
  }

  &__circle {
    width: 100px;
    height: 100px;
    background-color: var(--eui-skeleton-bg);
    border-radius: 50%;
    margin: 0 auto;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--eui-spacing-sm);
  }

  &__line {
    height: 16px;
    background-color: var(--eui-skeleton-bg);
    border-radius: var(--eui-radius-sm);

    &--short {
      width: 60%;
    }
  }

  &--animated {
    &.eui-skeleton--wave {
      .eui-skeleton__avatar,
      .eui-skeleton__line,
      .eui-skeleton__rect,
      .eui-skeleton__circle {
        background: linear-gradient(
          90deg,
          var(--eui-skeleton-bg) 25%,
          var(--eui-skeleton-bg-shimmer) 50%,
          var(--eui-skeleton-bg) 75%
        );
        background-size: 200% 100%;
        animation: eui-skeleton-wave 1.5s ease-in-out infinite;
      }
    }

    &.eui-skeleton--pulse {
      .eui-skeleton__avatar,
      .eui-skeleton__line,
      .eui-skeleton__rect,
      .eui-skeleton__circle {
        animation: eui-skeleton-pulse 1.5s ease-in-out infinite;
      }
    }
  }
}

@keyframes eui-skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes eui-skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>

