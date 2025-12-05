<template>
  <span :class="avatarClasses" :style="avatarStyle">
    <img v-if="src" :src="src" :alt="alt" @error="handleError" />
    <span v-else-if="$slots.default" class="eui-avatar__text">
      <slot />
    </span>
    <span v-else class="eui-avatar__icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
      </svg>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  src?: string
  alt?: string
  size?: number | 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'square'
}>()

const imageError = ref(false)

const avatarClasses = computed(() => {
  return [
    'eui-avatar',
    {
      'eui-avatar--circle': props.shape === 'circle' || !props.shape,
      'eui-avatar--square': props.shape === 'square',
      [`eui-avatar--${props.size}`]: typeof props.size === 'string',
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
}
</style>

