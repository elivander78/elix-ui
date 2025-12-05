<template>
  <span :class="avatarClasses" :style="avatarStyle">
    <img v-if="src && !imageError" :src="src" :alt="alt" @error="handleError" />
    <span v-else-if="$slots.default" class="eui-avatar__text">
      <slot />
    </span>
    <span v-else class="eui-avatar__icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
      </svg>
    </span>
    <span v-if="status" :class="statusClasses"></span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  src?: string
  alt?: string
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  status?: 'online' | 'offline' | 'away' | 'busy'
  statusPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}>()

const imageError = ref(false)

const avatarClasses = computed(() => {
  return [
    'eui-avatar',
    {
      'eui-avatar--circle': props.shape === 'circle' || !props.shape,
      'eui-avatar--square': props.shape === 'square',
      [`eui-avatar--${props.size}`]: typeof props.size === 'string',
      'eui-avatar--with-status': !!props.status,
    },
  ]
})

const avatarStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${props.size * 0.4}px`,
    }
  }
  return {}
})

const statusClasses = computed(() => {
  return [
    'eui-avatar__status',
    `eui-avatar__status--${props.status}`,
    `eui-avatar__status--${props.statusPosition || 'bottom-right'}`,
  ]
})

const handleError = () => {
  imageError.value = true
}
</script>

<style lang="scss" scoped>
.eui-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  background-color: var(--eui-color-neutral-300);
  color: var(--eui-text-primary);

  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: var(--eui-radius-md);
  }

  &--xs {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }

  &--sm {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  &--md {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }

  &--lg {
    width: 56px;
    height: 56px;
    font-size: 20px;
  }

  &--xl {
    width: 80px;
    height: 80px;
    font-size: 28px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }

  &__text {
    font-weight: var(--eui-font-weight-semibold);
    line-height: 1;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--eui-text-secondary);
  }

  &__status {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 2px solid var(--eui-bg-primary);
    border-radius: 50%;

    &--top-right {
      top: 0;
      right: 0;
      transform: translate(25%, -25%);
    }

    &--top-left {
      top: 0;
      left: 0;
      transform: translate(-25%, -25%);
    }

    &--bottom-right {
      bottom: 0;
      right: 0;
      transform: translate(25%, 25%);
    }

    &--bottom-left {
      bottom: 0;
      left: 0;
      transform: translate(-25%, 25%);
    }

    &--online {
      background-color: var(--eui-color-success);
    }

    &--offline {
      background-color: var(--eui-color-neutral-400);
    }

    &--away {
      background-color: var(--eui-color-warning);
    }

    &--busy {
      background-color: var(--eui-color-error);
    }
  }

  &--xs &__status {
    width: 8px;
    height: 8px;
    border-width: 1.5px;
  }

  &--sm &__status {
    width: 10px;
    height: 10px;
  }

  &--lg &__status,
  &--xl &__status {
    width: 14px;
    height: 14px;
    border-width: 3px;
  }
}
</style>

