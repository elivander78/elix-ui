<template>
  <Transition name="eui-alert">
    <div v-if="visible" :class="alertClasses">
      <div v-if="showIcon" class="eui-alert__icon">
        <slot name="icon">
          <component :is="defaultIcon" v-if="typeof icon === 'boolean' && icon" />
          <component :is="icon" v-else-if="icon" />
        </slot>
      </div>
      <div class="eui-alert__content">
        <div v-if="title" class="eui-alert__title">{{ title }}</div>
        <div v-if="description" class="eui-alert__description">{{ description }}</div>
        <div v-if="$slots.default && !description" class="eui-alert__description">
          <slot />
        </div>
      </div>
      <button
        v-if="closable"
        class="eui-alert__close"
        @click="handleClose"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, h, defineComponent } from 'vue'
import { alertProps, type AlertProps } from './Alert'

defineOptions({
  name: 'EuiAlert',
})

const props = defineProps(alertProps)

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)

const showIcon = computed(() => {
  return props.icon !== false && (props.icon !== undefined || props.icon === true)
})

const alertClasses = computed(() => {
  return [
    'eui-alert',
    `eui-alert--${props.type}`,
    `eui-alert--${props.variant}`,
    `eui-alert--appearance-${props.appearance}`,
    {
      'eui-alert--with-icon': showIcon.value,
      'eui-alert--closable': props.closable,
    },
  ]
})

const defaultIcon = computed(() => {
  const icons = {
    success: () => h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('path', {
        d: 'M16.667 5L7.5 14.167 3.333 10',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    ]),
    info: () => h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('circle', { cx: '10', cy: '10', r: '8', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', { d: 'M10 6v4M10 14h.01', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }),
    ]),
    warning: () => h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('path', {
        d: 'M10 6v4m0 4h.01M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0z',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      }),
    ]),
    error: () => h('svg', {
      width: '20',
      height: '20',
      viewBox: '0 0 20 20',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }, [
      h('circle', { cx: '10', cy: '10', r: '8', stroke: 'currentColor', 'stroke-width': '2' }),
      h('path', { d: 'M10 6v8M10 14h.01', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }),
    ]),
  }
  return icons[props.type] || icons.info
})

const handleClose = () => {
  visible.value = false
  emit('close')
}
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-alert {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--eui-spacing-sm);
  padding: var(--eui-spacing-md) var(--eui-spacing-lg);
  border-radius: var(--eui-radius-md);
  transition: all 0.2s ease-in-out;

  &--with-icon {
    padding-left: var(--eui-spacing-md);
  }

  &--closable {
    padding-right: var(--eui-spacing-md);
  }

  // Variants
  &--soft {
    &.eui-alert--success {
      background-color: var(--eui-color-success-50);
      color: var(--eui-color-success-700);
    }

    &.eui-alert--info {
      background-color: var(--eui-color-info-50);
      color: var(--eui-color-info-700);
    }

    &.eui-alert--warning {
      background-color: var(--eui-color-warning-50);
      color: var(--eui-color-warning-700);
    }

    &.eui-alert--error {
      background-color: var(--eui-color-error-50);
      color: var(--eui-color-error-700);
    }
  }

  &--solid {
    &.eui-alert--success {
      background-color: var(--eui-color-success);
      color: var(--eui-text-inverse);
    }

    &.eui-alert--info {
      background-color: var(--eui-color-info);
      color: var(--eui-text-inverse);
    }

    &.eui-alert--warning {
      background-color: var(--eui-color-warning);
      color: var(--eui-text-inverse);
    }

    &.eui-alert--error {
      background-color: var(--eui-color-error);
      color: var(--eui-text-inverse);
    }
  }

  &--outlined {
    background-color: transparent;

    &.eui-alert--success {
      color: var(--eui-color-success-700);
      @include border-shadow(var(--eui-color-success), 1px);
    }

    &.eui-alert--info {
      color: var(--eui-color-info-700);
      @include border-shadow(var(--eui-color-info), 1px);
    }

    &.eui-alert--warning {
      color: var(--eui-color-warning-700);
      @include border-shadow(var(--eui-color-warning), 1px);
    }

    &.eui-alert--error {
      color: var(--eui-color-error-700);
      @include border-shadow(var(--eui-color-error), 1px);
    }
  }

  // Appearance
  &--appearance-shadow {
    border: none !important;

    &.eui-alert--outlined {
      &.eui-alert--success {
        box-shadow: 0 0 0 1px var(--eui-color-success) !important;
      }

      &.eui-alert--info {
        box-shadow: 0 0 0 1px var(--eui-color-info) !important;
      }

      &.eui-alert--warning {
        box-shadow: 0 0 0 1px var(--eui-color-warning) !important;
      }

      &.eui-alert--error {
        box-shadow: 0 0 0 1px var(--eui-color-error) !important;
      }
    }
  }

  &--appearance-border-shadow {
    &.eui-alert--outlined {
      &.eui-alert--success {
        box-shadow: 0 0 0 1px var(--eui-color-success) !important;
      }

      &.eui-alert--info {
        box-shadow: 0 0 0 1px var(--eui-color-info) !important;
      }

      &.eui-alert--warning {
        box-shadow: 0 0 0 1px var(--eui-color-warning) !important;
      }

      &.eui-alert--error {
        box-shadow: 0 0 0 1px var(--eui-color-error) !important;
      }
    }
  }

  &--appearance-none {
    border: none !important;
    box-shadow: none !important;
  }
}

.eui-alert__icon {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  margin-top: 2px;
  color: inherit;

  svg {
    width: 20px;
    height: 20px;
  }
}

.eui-alert__content {
  flex: 1;
  min-width: 0;
}

.eui-alert__title {
  font-size: var(--eui-font-size-base);
  font-weight: var(--eui-font-weight-semibold);
  line-height: var(--eui-line-height-normal);
  color: inherit;
  margin-bottom: var(--eui-spacing-xs);
}

.eui-alert__description {
  font-size: var(--eui-font-size-sm);
  line-height: var(--eui-line-height-relaxed);
  color: inherit;
  opacity: 0.9;
}

.eui-alert__close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  margin-top: 2px;
  color: inherit;
  background: transparent;
  border: none;
  border-radius: var(--eui-radius-sm);
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

// Transitions
.eui-alert-enter-active,
.eui-alert-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.eui-alert-enter-from,
.eui-alert-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

