<template>
  <div :class="formItemClasses">
    <label v-if="label" :class="labelClasses" :style="labelStyle">
      <span v-if="required" class="eui-form-item__required">*</span>
      {{ label }}
    </label>
    <div class="eui-form-item__content">
      <slot />
      <div v-if="errorMessage" class="eui-form-item__error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineOptions({

  name: 'EuiFormItem',

})

import { computed, inject } from 'vue'

const props = defineProps<{
  label?: string
  prop?: string
  required?: boolean
}>()

const formContext = inject<{
  model: Record<string, any>
  rules?: any
  errors: { value: Record<string, string> }
  labelWidth?: string
}>('form', {
  model: {},
  errors: { value: {} },
})

const formItemClasses = computed(() => {
  return [
    'eui-form-item',
    {
      'eui-form-item--error': !!errorMessage.value,
    },
  ]
})

const labelClasses = computed(() => {
  return 'eui-form-item__label'
})

const labelStyle = computed(() => {
  if (formContext.labelWidth) {
    return {
      width: formContext.labelWidth,
    }
  }
  return {}
})

const errorMessage = computed(() => {
  if (props.prop && formContext.errors.value[props.prop]) {
    return formContext.errors.value[props.prop]
  }
  return ''
})
</script>

<style lang="scss" scoped>
.eui-form-item {
  &__label {
    font-size: var(--eui-font-size-base);
    color: var(--eui-text-primary);
    font-weight: var(--eui-font-weight-medium);
  }

  &__required {
    color: var(--eui-color-error);
    margin-right: 4px;
  }

  &__content {
    position: relative;
  }

  &__error {
    margin-top: var(--eui-spacing-xs);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-color-error);
    line-height: 1.5;
  }

  &--error {
    .eui-input-wrapper,
    .eui-textarea-wrapper,
    .eui-select-wrapper {
      .eui-input,
      .eui-textarea,
      .eui-select {
        border-color: var(--eui-color-error);
      }
    }
  }
}
</style>

