import { h, computed } from 'vue'
import { Button, Input, Select, Checkbox, Radio, Textarea, Switch, Form, FormItem } from '@elix/ui'
import type { PreviewState, RenderFunction } from './types'

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
    // Check for validation example - look for specific patterns
    if (codeLower.includes('validation') || codeLower.includes('handlesubmit') || 
        (codeLower.includes('required field') && codeLower.includes('min length') && codeLower.includes('max length'))) {
      const formKey = `${codeKey}-form-validation`
      
      if (!state.formData.value[formKey]) {
        state.formData.value[formKey] = {
          required: '',
          email: '',
          minLength: '',
          maxLength: '',
          custom: '',
        }
        state.formData.value = { ...state.formData.value }
      }
      
      return () => {
        const formDataRef = computed({
          get: () => state.formData.value[formKey],
          set: (v: Record<string, any>) => {
            state.formData.value[formKey] = v
            state.formData.value = { ...state.formData.value }
          }
        })
        
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
        
        const formData = formDataRef.value
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__example' }, [
            h(Form, {
              model: formData,
              rules,
              onSubmit: (values: any) => console.log('Form submitted:', values),
            }, {
              default: () => [
                h(FormItem, { label: 'Required Field', prop: 'required', required: true }, {
                  default: () => h(Input, {
                    placeholder: 'This field is required',
                    modelValue: formData.required,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formDataRef.value = { ...formDataRef.value, required: String(v) }
                    },
                  })
                }),
                h(FormItem, { label: 'Email', prop: 'email', required: true }, {
                  default: () => h(Input, {
                    type: 'email',
                    placeholder: 'Enter email',
                    modelValue: formData.email,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formDataRef.value = { ...formDataRef.value, email: String(v) }
                    },
                  })
                }),
                h(FormItem, { label: 'Min Length', prop: 'minLength', required: true }, {
                  default: () => h(Input, {
                    placeholder: 'Min 5 characters',
                    modelValue: formData.minLength,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formDataRef.value = { ...formDataRef.value, minLength: String(v) }
                    },
                  })
                }),
                h(FormItem, { label: 'Max Length', prop: 'maxLength', required: true }, {
                  default: () => h(Input, {
                    placeholder: 'Max 10 characters',
                    modelValue: formData.maxLength,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formDataRef.value = { ...formDataRef.value, maxLength: String(v) }
                    },
                  })
                }),
                h(FormItem, { label: 'Custom Validator', prop: 'custom', required: true }, {
                  default: () => h(Input, {
                    placeholder: "Must contain 'test'",
                    modelValue: formData.custom,
                    'onUpdate:modelValue': (v: string | number) => { 
                      formDataRef.value = { ...formDataRef.value, custom: String(v) }
                    },
                  })
                }),
                h(FormItem, {}, {
                  default: () => [
                    h(Button, { type: 'primary', nativeType: 'submit' }, () => 'Submit'),
                    h(Button, { type: 'outline', onClick: () => {
                      formDataRef.value = {
                        required: '',
                        email: '',
                        minLength: '',
                        maxLength: '',
                        custom: '',
                      }
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
    
    if (!state.formData.value[formKey]) {
      state.formData.value[formKey] = {
        username: '',
        email: '',
      }
      state.formData.value = { ...state.formData.value }
    }
    
    return () => {
      const formDataRef = computed({
        get: () => state.formData.value[formKey],
        set: (v: Record<string, any>) => {
          state.formData.value[formKey] = v
          state.formData.value = { ...state.formData.value }
        }
      })
      const formData = formDataRef.value
      
      return h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example' }, [
          h(Form, {
            model: formData,
            onSubmit: (values: any) => console.log('Form submitted:', values),
          }, {
            default: () => [
              h(FormItem, { label: 'Username', prop: 'username', required: true }, {
                default: () => h(Input, {
                  modelValue: formData.username,
                  'onUpdate:modelValue': (v: string | number) => { 
                    formDataRef.value = { ...formDataRef.value, username: String(v) }
                  },
                })
              }),
              h(FormItem, { label: 'Email', prop: 'email', required: true }, {
                default: () => h(Input, {
                  type: 'email',
                  modelValue: formData.email,
                  'onUpdate:modelValue': (v: string | number) => { 
                    formDataRef.value = { ...formDataRef.value, email: String(v) }
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
    if (codeLower.includes('size="xs"') || codeLower.includes('size=')) {
      return () => h('div', { class: 'preview-buttons' }, [
        h(Button, { size: 'xs' }, () => 'Extra Small'),
        h(Button, { size: 'sm' }, () => 'Small'),
        h(Button, { size: 'md' }, () => 'Medium'),
        h(Button, { size: 'lg' }, () => 'Large'),
      ])
    }
    if (codeLower.includes('type="primary"') || codeLower.includes('type="secondary"')) {
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
    if (codeLower.includes('size="xs"') || codeLower.includes('size=')) {
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
    if (codeLower.includes('state="error"') || codeLower.includes('state="success"')) {
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
    return () => h(Select, {
      options,
      placeholder: 'Select an option',
      modelValue: state.selectValues.value[codeKey],
      'onUpdate:modelValue': (v: string | number | undefined) => { state.selectValues.value[codeKey] = v },
    })
  }

  // Switch examples
  if (codeLower.includes('switch')) {
    return () => h(Switch, {
      modelValue: state.switchValues.value[codeKey] || false,
      'onUpdate:modelValue': (v: boolean) => { state.switchValues.value[codeKey] = v },
    })
  }

  // Checkbox examples
  if (codeLower.includes('checkbox')) {
    return () => h(Checkbox, {
      modelValue: state.checkboxValues.value[codeKey] || false,
      'onUpdate:modelValue': (v: boolean) => { state.checkboxValues.value[codeKey] = v },
    }, () => 'I agree')
  }

  // Radio examples
  if (codeLower.includes('radio')) {
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
    return () => h(Textarea, {
      modelValue: state.textareaValues.value[codeKey] || '',
      'onUpdate:modelValue': (v: string) => { state.textareaValues.value[codeKey] = v },
      placeholder: 'Enter text',
    })
  }

  return null
}
