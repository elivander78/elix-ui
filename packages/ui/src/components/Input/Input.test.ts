import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
      },
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.element.value).toBe('test')
  })

  it('applies size prop', () => {
    const wrapper = mount(Input, {
      props: {
        size: 'lg',
      },
    })
    expect(wrapper.classes()).toContain('eui-input-wrapper--lg')
  })

  it('applies state prop', () => {
    const wrapper = mount(Input, {
      props: {
        state: 'error',
      },
    })
    expect(wrapper.classes()).toContain('eui-input-wrapper--error')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('new value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
  })

  it('shows clear button when clearable and has value', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
      },
    })
    expect(wrapper.find('.eui-input__clear').exists()).toBe(true)
  })

  it('clears value when clear button is clicked', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        clearable: true,
      },
    })
    const clearButton = wrapper.find('.eui-input__clear')
    await clearButton.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })
})

