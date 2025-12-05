import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies size prop', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'lg',
      },
    })
    expect(wrapper.classes()).toContain('eui-button--lg')
  })

  it('applies type prop', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'secondary',
      },
    })
    expect(wrapper.classes()).toContain('eui-button--secondary')
  })

  it('handles click events', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('shows loading state', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.classes()).toContain('eui-button--loading')
    expect(wrapper.find('.eui-button__loading').exists()).toBe(true)
  })
})

