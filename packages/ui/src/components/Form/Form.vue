<template>
  <form :class="formClasses" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'

export interface FormRules {
  [key: string]: Array<{
    required?: boolean
    message?: string
    validator?: (value: any) => boolean | Promise<boolean>
    trigger?: 'blur' | 'change'
  }>
}

const props = defineProps<{
  model: Record<string, any>
  rules?: FormRules
  labelWidth?: string
  labelPosition?: 'left' | 'right' | 'top'
}>()

const emit = defineEmits<{
  submit: [values: Record<string, any>]
  validate: [errors: Record<string, string>]
}>()

const formClasses = computed(() => {
  return [
    'eui-form',
    {
      [`eui-form--label-${props.labelPosition || 'left'}`]: true,
    },
  ]
})

const errors = ref<Record<string, string>>({})

const validate = async (): Promise<boolean> => {
  errors.value = {}
  if (!props.rules) return true

  const validationPromises: Promise<void>[] = []

  Object.entries(props.rules).forEach(([field, fieldRules]) => {
    fieldRules.forEach((rule) => {
      const value = props.model[field]
      
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors.value[field] = rule.message || `${field} is required`
        return
      }

      if (rule.validator) {
        validationPromises.push(
          Promise.resolve(rule.validator(value)).then((isValid) => {
            if (!isValid) {
              errors.value[field] = rule.message || `${field} is invalid`
            }
          })
        )
      }
    })
  })

  await Promise.all(validationPromises)
  emit('validate', errors.value)
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  const isValid = await validate()
  if (isValid) {
    emit('submit', props.model)
  }
}

provide('form', {
  model: props.model,
  rules: props.rules,
  errors,
  labelWidth: props.labelWidth,
})
</script>

<style lang="scss" scoped>
.eui-form {
  &--label-left {
    .eui-form-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: var(--eui-spacing-lg);

      .eui-form-item__label {
        width: var(--eui-form-label-width, 100px);
        padding-right: var(--eui-spacing-md);
        text-align: right;
      }

      .eui-form-item__content {
        flex: 1;
      }
    }
  }

  &--label-top {
    .eui-form-item {
      margin-bottom: var(--eui-spacing-lg);

      .eui-form-item__label {
        display: block;
        margin-bottom: var(--eui-spacing-xs);
      }
    }
  }

  &--label-right {
    .eui-form-item {
      display: flex;
      align-items: flex-start;
      flex-direction: row-reverse;
      margin-bottom: var(--eui-spacing-lg);

      .eui-form-item__label {
        width: var(--eui-form-label-width, 100px);
        padding-left: var(--eui-spacing-md);
        text-align: left;
      }

      .eui-form-item__content {
        flex: 1;
      }
    }
  }
}
</style>

