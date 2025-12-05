import { h, computed, ref, reactive } from 'vue'
import { Button, Input, Select, Checkbox, Radio, Textarea, Switch, Form, FormItem, Notification } from '@elivander/elix-ui'
import type { PreviewState, RenderFunction, NotificationItem } from './types'

export function renderFormComponents(
  code: string,
  codeKey: string,
  state: PreviewState,
  onlyComponent?: string
): RenderFunction {
  const codeLower = code.toLowerCase()

  // Form examples - проверяем ПЕРЕД button, т.к. form может содержать button
  // Проверяем наличие <Form или Form в коде
  const hasFormTag = codeLower.includes('<form') || (codeLower.includes('form') && (codeLower.includes('model') || codeLower.includes('rules')))
  if (hasFormTag && !codeLower.includes('formitem') && (!onlyComponent || onlyComponent === 'form')) {
    // Check for email+password form example
    if (codeLower.includes('email') && codeLower.includes('password') && !codeLower.includes('validation')) {
      const formKey = `${codeKey}-form-email-password`
      const notificationKey = `${formKey}-notifications`
      
      // Initialize form data in state if not exists
      if (!state.formData.value[formKey]) {
        state.formData.value[formKey] = reactive({
          email: '',
          password: '',
        })
        state.formData.value = { ...state.formData.value }
      }
      
      // Initialize notifications in state if not exists
      if (!state.notifications.value[notificationKey]) {
        state.notifications.value[notificationKey] = []
        state.notifications.value = { ...state.notifications.value }
      }
      if (!state.notificationCounters.value[notificationKey]) {
        state.notificationCounters.value[notificationKey] = 0
        state.notificationCounters.value = { ...state.notificationCounters.value }
      }
      
      const addNotification = (options: { title: string; message?: string; type?: 'success' | 'error' | 'warning' | 'info'; duration?: number }) => {
        const id = `notification-${++state.notificationCounters.value[notificationKey]}`
        const notification: NotificationItem = { ...options, id }
        state.notifications.value[notificationKey] = [...(state.notifications.value[notificationKey] || []), notification]
        state.notifications.value = { ...state.notifications.value }
        
        if (options.duration !== 0) {
          const duration = options.duration || 4500
          setTimeout(() => {
            removeNotification(id)
          }, duration)
        }
        
        return id
      }
      
      const removeNotification = (id: string) => {
        state.notifications.value[notificationKey] = (state.notifications.value[notificationKey] || []).filter((n) => n.id !== id)
        state.notifications.value = { ...state.notifications.value }
      }
      
      return () => {
        const formData = state.formData.value[formKey] as Record<string, any>
        const rules = {
          email: [
            { required: true, message: 'Email is required' },
            { validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Invalid email format' },
          ],
          password: [
            { required: true, message: 'Password is required' },
            { validator: (value: string) => value.length >= 6, message: 'Password must be at least 6 characters' },
          ],
        }
        
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__example' }, [
            h(Form, {
              model: formData,
              rules,
              onSubmit: (values: any) => {
                console.log('Form submitted:', values)
                addNotification({
                  title: 'Success',
                  message: 'Form submitted successfully!',
                  type: 'success',
                })
              },
            }, {
              default: () => [
                h(FormItem, { label: 'Email', prop: 'email', required: true }, {
                  default: () => h(Input, {
                    type: 'email',
                    placeholder: 'Enter your email',
                    modelValue: formData.email,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formData.email = String(v)
                    },
                  })
                }),
                h(FormItem, { label: 'Password', prop: 'password', required: true }, {
                  default: () => h(Input, {
                    type: 'password',
                    placeholder: 'Enter your password',
                    modelValue: formData.password,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formData.password = String(v)
                    },
                  })
                }),
                h(FormItem, {}, {
                  default: () => h(Button, { type: 'primary', nativeType: 'submit' }, () => 'Submit')
                }),
              ]
            }),
            h(Notification, {
              notifications: state.notifications.value[notificationKey] || [],
              onRemove: (id: string) => removeNotification(id),
            }),
          ]),
        ])
      }
    }
    
    // Check for validation example - look for specific patterns
    if (codeLower.includes('validation') || codeLower.includes('handlesubmit') || 
        (codeLower.includes('required field') && codeLower.includes('min length') && codeLower.includes('max length'))) {
      const formKey = `${codeKey}-form-validation`
      
      // Initialize form data in state if not exists (use reactive for proper reactivity)
      if (!state.formData.value[formKey]) {
        state.formData.value[formKey] = reactive({
          required: '',
          email: '',
          minLength: '',
          maxLength: '',
          custom: '',
        })
        state.formData.value = { ...state.formData.value }
      }
      
      return () => {
        const formData = state.formData.value[formKey] as Record<string, any>
        const rules = {
          required: [{ required: true, message: 'This field is required' }],
          email: [
            { required: true, message: 'Email is required' },
            { validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Invalid email format' },
          ],
          minLength: [
            { required: true, message: 'This field is required' },
            { validator: (value: string) => value.length >= 5, message: 'Must be at least 5 characters' },
          ],
          maxLength: [
            { required: true, message: 'This field is required' },
            { validator: (value: string) => value.length <= 10, message: 'Must be at most 10 characters' },
          ],
          custom: [
            { required: true, message: 'This field is required' },
            { validator: (value: string) => value.includes('test'), message: 'Must contain the word "test"' },
          ],
        }
        
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__example' }, [
            h(Form, {
              model: formData,
              rules,
              onSubmit: (values: any) => {
                console.log('Form submitted:', values)
                alert('Form submitted successfully!')
              },
            }, {
              default: () => [
                h(FormItem, { label: 'Required Field', prop: 'required', required: true }, {
                  default: () => h(Input, {
                    placeholder: 'This field is required',
                    modelValue: formData.required,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formData.required = String(v)
                    },
                  })
                }),
                h(FormItem, { label: 'Email', prop: 'email', required: true }, {
                  default: () => h(Input, {
                    type: 'email',
                    placeholder: 'Enter email',
                    modelValue: formData.email,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formData.email = String(v)
                    },
                  })
                }),
                h(FormItem, { label: 'Min Length', prop: 'minLength', required: true }, {
                  default: () => h(Input, {
                    placeholder: 'Min 5 characters',
                    modelValue: formData.minLength,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formData.minLength = String(v)
                    },
                  })
                }),
                h(FormItem, { label: 'Max Length', prop: 'maxLength', required: true }, {
                  default: () => h(Input, {
                    placeholder: 'Max 10 characters',
                    modelValue: formData.maxLength,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formData.maxLength = String(v)
                    },
                  })
                }),
                h(FormItem, { label: 'Custom Validator', prop: 'custom', required: true }, {
                  default: () => h(Input, {
                    placeholder: "Must contain 'test'",
                    modelValue: formData.custom,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formData.custom = String(v)
                    },
                  })
                }),
                h(FormItem, {}, {
                  default: () => [
                    h(Button, { type: 'primary', nativeType: 'submit' }, () => 'Submit'),
                    h(Button, { type: 'outline', onClick: () => {
                      formData.required = ''
                      formData.email = ''
                      formData.minLength = ''
                      formData.maxLength = ''
                      formData.custom = ''
                    } }, () => 'Reset'),
                  ]
                }),
              ]
            }),
          ]),
        ])
      }
    }
    
    // Basic form
    const formKey = `${codeKey}-form-basic`
    
    // Initialize form data in state if not exists (use reactive for proper reactivity)
    if (!state.formData.value[formKey]) {
      state.formData.value[formKey] = reactive({
        username: '',
        email: '',
      })
      state.formData.value = { ...state.formData.value }
    }
    
    return () => {
      const formData = state.formData.value[formKey] as Record<string, any>
      
      return h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Form, {
            model: formData,
            onSubmit: (values: any) => {
              console.log('Form submitted:', values)
              alert('Form submitted successfully!')
            },
          }, {
            default: () => [
              h(FormItem, { label: 'Username', prop: 'username', required: true }, {
                default: () => h(Input, {
                  modelValue: formData.username,
                  'onUpdate:modelValue': (v: string | number) => { 
                    formData.username = String(v)
                  },
                })
              }),
              h(FormItem, { label: 'Email', prop: 'email', required: true }, {
                default: () => h(Input, {
                  type: 'email',
                  modelValue: formData.email,
                  'onUpdate:modelValue': (v: string | number) => { 
                    formData.email = String(v)
                  },
                })
              }),
              h(FormItem, {}, {
                default: () => h(Button, { type: 'primary', nativeType: 'submit' }, () => 'Submit')
              }),
            ]
          }),
        ]),
      ])
    }
  }

  // Если запрошен только form, проверяем только form
  if (onlyComponent === 'form') {
    const hasFormTag = codeLower.includes('<form') || (codeLower.includes('form') && (codeLower.includes('model') || codeLower.includes('rules')))
    if (!hasFormTag || codeLower.includes('formitem')) {
      return null
    }
  }
  
  // Если запрошен только form, не проверяем другие компоненты
  if (onlyComponent && onlyComponent !== 'form') {
    return null
  }

  // Button examples - НЕ проверяем если есть Header, т.к. Header может содержать Button
  // Header проверяется раньше в PreviewRenderer, но на всякий случай проверяем здесь тоже
  if ((codeLower.includes('<button') || (codeLower.includes('button') && !codeLower.includes('input') && !codeLower.includes('form'))) 
      && !codeLower.includes('<header') && !codeLower.includes('</header>') 
      && !(codeLower.includes('header') && (codeLower.includes('bordered') || codeLower.includes('template #')))) {
    // Check for specific examples first
    if (codeLower.includes('shape=') || codeLower.includes('shape="')) {
      return () => h('div', { class: 'preview-buttons' }, [
        h(Button, { shape: 'rounded' }, () => 'Rounded'),
        h(Button, { shape: 'pill' }, () => 'Pill'),
        h(Button, { shape: 'square' }, () => 'Square'),
      ])
    }
    if (codeLower.includes('appearance=') || codeLower.includes('appearance="')) {
      return () => h('div', { class: 'preview-buttons' }, [
        h(Button, { appearance: 'border' }, () => 'Border'),
        h(Button, { appearance: 'shadow' }, () => 'Shadow'),
        h(Button, { appearance: 'border-shadow' }, () => 'Border + Shadow'),
      ])
    }
    if (codeLower.includes('#icon') || codeLower.includes('#suffix') || codeLower.includes('template #')) {
      return () => h('div', { class: 'preview-buttons' }, [
        h(Button, {}, {
          icon: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
            h('path', { d: 'M8 3v10M3 8h10', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' })
          ]),
          default: () => 'With Icon Left'
        }),
        h(Button, {}, {
          default: () => 'With Icon Right',
          suffix: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
            h('path', { d: 'M6 4l4 4-4 4', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' })
          ])
        }),
      ])
    }
    if (codeLower.includes('block')) {
      return () => h('div', { class: 'preview-buttons', style: 'width: 100%;' }, [
        h(Button, { block: true }, () => 'Block Button'),
      ])
    }
    if (codeLower.includes('size="xs"') || (codeLower.includes('size=') && codeLower.includes('xs'))) {
      return () => h('div', { class: 'preview-buttons' }, [
        h(Button, { size: 'xs' }, () => 'Extra Small'),
        h(Button, { size: 'sm' }, () => 'Small'),
        h(Button, { size: 'md' }, () => 'Medium'),
        h(Button, { size: 'lg' }, () => 'Large'),
      ])
    }
    if (codeLower.includes('type="primary"') || codeLower.includes('type="secondary"') || codeLower.includes('type="outline"')) {
      return () => h('div', { class: 'preview-buttons' }, [
        h(Button, { type: 'primary' }, () => 'Primary'),
        h(Button, { type: 'secondary' }, () => 'Secondary'),
        h(Button, { type: 'outline' }, () => 'Outline'),
        h(Button, { type: 'ghost' }, () => 'Ghost'),
        h(Button, { type: 'text' }, () => 'Text'),
      ])
    }
    if (codeLower.includes('disabled') || codeLower.includes('loading')) {
      return () => h('div', { class: 'preview-buttons' }, [
        h(Button, {}, () => 'Normal'),
        h(Button, { disabled: true }, () => 'Disabled'),
        h(Button, { loading: true }, () => 'Loading'),
      ])
    }
    return () => h(Button, {}, () => 'Click me')
  }

  // Input examples
  if (codeLower.includes('<input') || codeLower.includes('input')) {
    if (codeLower.includes('#prefix') || codeLower.includes('#suffix') || (codeLower.includes('template #') && codeLower.includes('prefix'))) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Input, { 
          placeholder: 'With prefix icon',
          modelValue: state.inputValues.value[`${codeKey}-prefix`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-prefix`] = String(v) }
        }, {
          prefix: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
            h('path', { d: 'M7.333 2.667a4.667 4.667 0 1 0 0 9.333 4.667 4.667 0 0 0 0-9.333ZM14 14l-2.9-2.9', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' })
          ])
        }),
        h(Input, { 
          placeholder: 'With suffix icon',
          modelValue: state.inputValues.value[`${codeKey}-suffix`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-suffix`] = String(v) }
        }, {
          suffix: () => h('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none' }, [
            h('path', { d: 'M8 3v10M3 8h10', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' })
          ])
        }),
      ])
    }
    if (codeLower.includes('clearable')) {
      return () => h(Input, { 
        placeholder: 'Type to see clear button', 
        clearable: true,
        modelValue: state.inputValues.value[codeKey] || '', 
        'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[codeKey] = String(v) } 
      })
    }
    if (codeLower.includes('appearance=') || codeLower.includes('appearance="')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Input, { 
          appearance: 'border',
          placeholder: 'Border',
          modelValue: state.inputValues.value[`${codeKey}-border`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-border`] = String(v) } 
        }),
        h(Input, { 
          appearance: 'shadow',
          placeholder: 'Shadow',
          modelValue: state.inputValues.value[`${codeKey}-shadow`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-shadow`] = String(v) } 
        }),
        h(Input, { 
          appearance: 'border-shadow',
          placeholder: 'Border + Shadow',
          modelValue: state.inputValues.value[`${codeKey}-both`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-both`] = String(v) } 
        }),
      ])
    }
    if (codeLower.includes('size="xs"') || (codeLower.includes('size=') && codeLower.includes('xs'))) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Input, { 
          size: 'xs', 
          placeholder: 'Extra Small', 
          modelValue: state.inputValues.value[`${codeKey}-xs`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-xs`] = String(v) } 
        }),
        h(Input, { 
          size: 'sm', 
          placeholder: 'Small', 
          modelValue: state.inputValues.value[`${codeKey}-sm`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-sm`] = String(v) } 
        }),
        h(Input, { 
          size: 'md', 
          placeholder: 'Medium', 
          modelValue: state.inputValues.value[`${codeKey}-md`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-md`] = String(v) } 
        }),
        h(Input, { 
          size: 'lg', 
          placeholder: 'Large', 
          modelValue: state.inputValues.value[`${codeKey}-lg`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-lg`] = String(v) } 
        }),
      ])
    }
    if (codeLower.includes('state="error"') || codeLower.includes('state="success"') || codeLower.includes('placeholder="error"')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Input, { 
          placeholder: 'Normal', 
          modelValue: state.inputValues.value[`${codeKey}-normal`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-normal`] = String(v) } 
        }),
        h(Input, { 
          placeholder: 'Error', 
          state: 'error', 
          modelValue: state.inputValues.value[`${codeKey}-error`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-error`] = String(v) } 
        }),
        h(Input, { 
          placeholder: 'Success', 
          state: 'success', 
          modelValue: state.inputValues.value[`${codeKey}-success`] || '', 
          'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[`${codeKey}-success`] = String(v) } 
        }),
        h(Input, { placeholder: 'Disabled', disabled: true }),
      ])
    }
    return () => h(Input, { 
      placeholder: 'Enter text', 
      modelValue: state.inputValues.value[codeKey] || '', 
      'onUpdate:modelValue': (v: string | number) => { state.inputValues.value[codeKey] = String(v) } 
    })
  }

  // Select examples
  if (codeLower.includes('select') && !codeLower.includes('table')) {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ]
    
    if (codeLower.includes('size=') || codeLower.includes('size="')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Select, {
          size: 'xs',
          options,
          placeholder: 'Extra Small',
          modelValue: state.selectValues.value[`${codeKey}-xs`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-xs`] = v },
        }),
        h(Select, {
          size: 'sm',
          options,
          placeholder: 'Small',
          modelValue: state.selectValues.value[`${codeKey}-sm`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-sm`] = v },
        }),
        h(Select, {
          size: 'md',
          options,
          placeholder: 'Medium',
          modelValue: state.selectValues.value[`${codeKey}-md`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-md`] = v },
        }),
        h(Select, {
          size: 'lg',
          options,
          placeholder: 'Large',
          modelValue: state.selectValues.value[`${codeKey}-lg`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-lg`] = v },
        }),
      ])
    }
    
    if (codeLower.includes('state=') || codeLower.includes('state="')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Select, {
          options,
          placeholder: 'Normal',
          modelValue: state.selectValues.value[`${codeKey}-normal`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-normal`] = v },
        }),
        h(Select, {
          options,
          placeholder: 'Error',
          state: 'error',
          modelValue: state.selectValues.value[`${codeKey}-error`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-error`] = v },
        }),
        h(Select, {
          options,
          placeholder: 'Success',
          state: 'success',
          modelValue: state.selectValues.value[`${codeKey}-success`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-success`] = v },
        }),
        h(Select, {
          options,
          placeholder: 'Disabled',
          disabled: true,
        }),
      ])
    }
    
    if (codeLower.includes('clearable')) {
      return () => h(Select, {
        options,
        placeholder: 'Select an option',
        clearable: true,
        modelValue: state.selectValues.value[codeKey],
        'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[codeKey] = v },
      })
    }
    
    if (codeLower.includes('filterable') || codeLower.includes('searchable')) {
      const searchOptions = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
        { label: 'Date', value: 'date' },
        { label: 'Elderberry', value: 'elderberry' },
      ]
      return () => h(Select, {
        options: searchOptions,
        placeholder: 'Type to search...',
        filterable: true,
        modelValue: state.selectValues.value[codeKey],
        'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[codeKey] = v },
      })
    }
    
    if (codeLower.includes('appearance=') || codeLower.includes('appearance="')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Select, {
          options,
          appearance: 'border',
          placeholder: 'Border',
          modelValue: state.selectValues.value[`${codeKey}-border`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-border`] = v },
        }),
        h(Select, {
          options,
          appearance: 'shadow',
          placeholder: 'Shadow',
          modelValue: state.selectValues.value[`${codeKey}-shadow`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-shadow`] = v },
        }),
        h(Select, {
          options,
          appearance: 'border-shadow',
          placeholder: 'Border + Shadow',
          modelValue: state.selectValues.value[`${codeKey}-both`],
          'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[`${codeKey}-both`] = v },
        }),
      ])
    }
    
    return () => h(Select, {
      options,
      placeholder: 'Select an option',
      modelValue: state.selectValues.value[codeKey],
      'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[codeKey] = v },
    })
  }

  // Switch examples
  if (codeLower.includes('switch')) {
    if (codeLower.includes('size=') || codeLower.includes('size="')) {
      return () => h('div', { class: 'preview-radios' }, [
        h(Switch, {
          size: 'sm',
          modelValue: state.switchValues.value[`${codeKey}-sm`] || false,
          'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[`${codeKey}-sm`] = v },
        }),
        h(Switch, {
          size: 'md',
          modelValue: state.switchValues.value[`${codeKey}-md`] || false,
          'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[`${codeKey}-md`] = v },
        }),
        h(Switch, {
          size: 'lg',
          modelValue: state.switchValues.value[`${codeKey}-lg`] || false,
          'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[`${codeKey}-lg`] = v },
        }),
      ])
    }
    if (codeLower.includes('loading')) {
      return () => h(Switch, {
        modelValue: state.switchValues.value[codeKey] || false,
        loading: true,
        'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[codeKey] = v },
      })
    }
    if (codeLower.includes('checked-label') || codeLower.includes('unchecked-label')) {
      return () => h('div', { class: 'preview-radios' }, [
        h(Switch, {
          modelValue: state.switchValues.value[`${codeKey}-1`] || false,
          checkedLabel: 'On',
          uncheckedLabel: 'Off',
          'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[`${codeKey}-1`] = v },
        }),
        h(Switch, {
          modelValue: state.switchValues.value[`${codeKey}-2`] || true,
          checkedLabel: 'On',
          uncheckedLabel: 'Off',
          'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[`${codeKey}-2`] = v },
        }),
      ])
    }
    if (codeLower.includes('disabled')) {
      return () => h('div', { class: 'preview-radios' }, [
        h(Switch, {
          modelValue: state.switchValues.value[`${codeKey}-1`] || false,
          'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[`${codeKey}-1`] = v },
        }),
        h(Switch, {
          modelValue: state.switchValues.value[`${codeKey}-2`] || false,
          disabled: true,
          'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[`${codeKey}-2`] = v },
        }),
        h(Switch, {
          modelValue: state.switchValues.value[`${codeKey}-3`] || true,
          disabled: true,
          'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[`${codeKey}-3`] = v },
        }),
      ])
    }
    return () => h(Switch, {
      modelValue: state.switchValues.value[codeKey] || false,
      'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[codeKey] = v },
    })
  }

  // Checkbox examples
  if (codeLower.includes('checkbox')) {
    if (codeLower.includes('indeterminate')) {
      return () => h(Checkbox, {
        modelValue: state.checkboxValues.value[codeKey] || false,
        indeterminate: true,
        'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[codeKey] = v },
      }, () => 'Select all')
    }
    if (codeLower.includes('disabled')) {
      return () => h('div', { class: 'preview-radios' }, [
        h(Checkbox, {
          modelValue: state.checkboxValues.value[`${codeKey}-1`] || false,
          'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[`${codeKey}-1`] = v },
        }, () => 'Enabled'),
        h(Checkbox, {
          modelValue: state.checkboxValues.value[`${codeKey}-2`] || false,
          disabled: true,
          'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[`${codeKey}-2`] = v },
        }, () => 'Disabled'),
        h(Checkbox, {
          modelValue: state.checkboxValues.value[`${codeKey}-3`] || true,
          disabled: true,
          'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[`${codeKey}-3`] = v },
        }, () => 'Disabled Checked'),
      ])
    }
    if (codeLower.includes('group') || codeLower.includes('option 1') || codeLower.includes('option 2')) {
      return () => h('div', { class: 'preview-radios' }, [
        h(Checkbox, {
          modelValue: state.checkboxValues.value[`${codeKey}-1`] || false,
          'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[`${codeKey}-1`] = v },
        }, () => 'Option 1'),
        h(Checkbox, {
          modelValue: state.checkboxValues.value[`${codeKey}-2`] || true,
          'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[`${codeKey}-2`] = v },
        }, () => 'Option 2'),
        h(Checkbox, {
          modelValue: state.checkboxValues.value[`${codeKey}-3`] || false,
          'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[`${codeKey}-3`] = v },
        }, () => 'Option 3'),
      ])
    }
    return () => h(Checkbox, {
      modelValue: state.checkboxValues.value[codeKey] || false,
      'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[codeKey] = v },
    }, () => 'I agree')
  }

  // Radio examples
  if (codeLower.includes('radio')) {
    if (codeLower.includes('disabled')) {
      return () => h('div', { class: 'preview-radios' }, [
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option1',
          value: 'option1',
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Enabled'),
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option1',
          value: 'option2',
          disabled: true,
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Disabled'),
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option3',
          value: 'option3',
          disabled: true,
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Disabled Selected'),
      ])
    }
    if (codeLower.includes('vertical') || codeLower.includes('flex-direction')) {
      return () => h('div', { class: 'preview-radios', style: 'display: flex; flex-direction: column; gap: 12px;' }, [
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option1',
          value: 'option1',
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Option 1'),
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option1',
          value: 'option2',
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Option 2'),
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option1',
          value: 'option3',
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Option 3'),
      ])
    }
    if (codeLower.includes('horizontal') || codeLower.includes('gap: 16px')) {
      return () => h('div', { class: 'preview-radios', style: 'display: flex; gap: 16px;' }, [
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option1',
          value: 'option1',
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Option 1'),
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option1',
          value: 'option2',
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Option 2'),
        h(Radio, {
          modelValue: state.radioValues.value[codeKey] || 'option1',
          value: 'option3',
          'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
        }, () => 'Option 3'),
      ])
    }
    return () => h('div', { class: 'preview-radios' }, [
      h(Radio, {
        modelValue: state.radioValues.value[codeKey] || 'option1',
        value: 'option1',
        'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
      }, () => 'Option 1'),
      h(Radio, {
        modelValue: state.radioValues.value[codeKey] || 'option1',
        value: 'option2',
        'onUpdate:modelValue': (v: string | number) => { state.radioValues.value[codeKey] = v },
      }, () => 'Option 2'),
    ])
  }

  // Textarea examples
  if (codeLower.includes('textarea')) {
    if (codeLower.includes('size=') || codeLower.includes('size="')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Textarea, {
          size: 'xs',
          modelValue: state.textareaValues.value[`${codeKey}-xs`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-xs`] = v },
          placeholder: 'Extra Small',
        }),
        h(Textarea, {
          size: 'sm',
          modelValue: state.textareaValues.value[`${codeKey}-sm`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-sm`] = v },
          placeholder: 'Small',
        }),
        h(Textarea, {
          size: 'md',
          modelValue: state.textareaValues.value[`${codeKey}-md`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-md`] = v },
          placeholder: 'Medium',
        }),
        h(Textarea, {
          size: 'lg',
          modelValue: state.textareaValues.value[`${codeKey}-lg`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-lg`] = v },
          placeholder: 'Large',
        }),
      ])
    }
    if (codeLower.includes('rows=') || codeLower.includes('rows="')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Textarea, {
          rows: 3,
          modelValue: state.textareaValues.value[`${codeKey}-3`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-3`] = v },
          placeholder: '3 rows',
        }),
        h(Textarea, {
          rows: 5,
          modelValue: state.textareaValues.value[`${codeKey}-5`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-5`] = v },
          placeholder: '5 rows',
        }),
      ])
    }
    if (codeLower.includes('autosize')) {
      return () => h(Textarea, {
        modelValue: state.textareaValues.value[codeKey] || '',
        'onUpdate:modelValue': (v: string) => { state.textareaValues.value[codeKey] = v },
        placeholder: 'Type to see auto-resize',
        rows: 3,
      })
    }
    if (codeLower.includes('show-count') || codeLower.includes('maxlength')) {
      return () => h(Textarea, {
        modelValue: state.textareaValues.value[codeKey] || '',
        'onUpdate:modelValue': (v: string) => { state.textareaValues.value[codeKey] = v },
        placeholder: 'Type to see character count',
        rows: 3,
      })
    }
    if (codeLower.includes('state=') || codeLower.includes('state="')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Textarea, {
          modelValue: state.textareaValues.value[`${codeKey}-normal`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-normal`] = v },
          placeholder: 'Normal',
        }),
        h(Textarea, {
          state: 'error',
          modelValue: state.textareaValues.value[`${codeKey}-error`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-error`] = v },
          placeholder: 'Error',
        }),
        h(Textarea, {
          state: 'success',
          modelValue: state.textareaValues.value[`${codeKey}-success`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-success`] = v },
          placeholder: 'Success',
        }),
        h(Textarea, {
          disabled: true,
          placeholder: 'Disabled',
        }),
      ])
    }
    if (codeLower.includes('appearance=') || codeLower.includes('appearance="')) {
      return () => h('div', { class: 'preview-inputs' }, [
        h(Textarea, {
          appearance: 'border',
          modelValue: state.textareaValues.value[`${codeKey}-border`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-border`] = v },
          placeholder: 'Border',
        }),
        h(Textarea, {
          appearance: 'shadow',
          modelValue: state.textareaValues.value[`${codeKey}-shadow`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-shadow`] = v },
          placeholder: 'Shadow',
        }),
        h(Textarea, {
          appearance: 'border-shadow',
          modelValue: state.textareaValues.value[`${codeKey}-both`] || '',
          'onUpdate:modelValue': (v: string) => { state.textareaValues.value[`${codeKey}-both`] = v },
          placeholder: 'Border + Shadow',
        }),
      ])
    }
    return () => h(Textarea, {
      modelValue: state.textareaValues.value[codeKey] || '',
      'onUpdate:modelValue': (v: string) => { state.textareaValues.value[codeKey] = v },
      placeholder: 'Enter text',
    })
  }

  return null
}
