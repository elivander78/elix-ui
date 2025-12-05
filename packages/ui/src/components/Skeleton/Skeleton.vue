<template>
  <div :class="skeletonClasses" :style="skeletonStyle">
    <div v-if="loading" class="eui-skeleton__content">
      <div v-if="avatar" class="eui-skeleton__avatar"></div>
      <div class="eui-skeleton__body">
        <div v-for="i in rows" :key="i" :class="lineClasses(i)"></div>
      </div>
    </div>
    <div v-else class="eui-skeleton__children">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  loading?: boolean
  avatar?: boolean
  rows?: number
  animated?: boolean
}>()

const skeletonClasses = computed(() => {
  return [
    'eui-skeleton',
    {
      'eui-skeleton--animated': props.animated !== false,
    },
  ]
})

const skeletonStyle = computed(() => {
  return {}
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
    background-color: var(--eui-color-neutral-200);
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--eui-spacing-sm);
  }

  &__line {
    height: 16px;
    background-color: var(--eui-color-neutral-200);
    border-radius: var(--eui-radius-sm);

    &--short {
      width: 60%;
    }
  }

  &--animated {
    .eui-skeleton__avatar,
    .eui-skeleton__line {
      background: linear-gradient(
        90deg,
        var(--eui-color-neutral-200) 25%,
        var(--eui-color-neutral-100) 50%,
        var(--eui-color-neutral-200) 75%
      );
      background-size: 200% 100%;
      animation: eui-skeleton-loading 1.5s ease-in-out infinite;
    }
  }
}

@keyframes eui-skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>

