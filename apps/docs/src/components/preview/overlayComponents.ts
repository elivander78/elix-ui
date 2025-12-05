import { h, computed, type Ref } from 'vue'
import { Button, Modal, Drawer, Popover, Tooltip } from '@elix/ui'
import type { PreviewState, RenderFunction } from './types'

export function renderOverlayComponents(
  code: string,
  codeKey: string,
  state: PreviewState
): RenderFunction {
  const codeLower = code.toLowerCase()

  // Modal examples - проверяем ПЕРЕД button, т.к. modal может содержать button
  if (codeLower.includes('modal')) {
    const modalKey = `${codeKey}-modal`
    const modalVisibleRef = computed({
      get: () => state.modalVisible.value[modalKey] || false,
      set: (v: boolean) => {
        state.modalVisible.value[modalKey] = v
        state.modalVisible.value = { ...state.modalVisible.value }
      },
    })
    return () => h('div', { class: 'preview-modal-wrapper' }, [
      h(Button, {
        onClick: (e: MouseEvent) => {
          state.modalOriginPoints.value[modalKey] = {
            x: e.clientX,
            y: e.clientY,
          }
          state.modalVisible.value[modalKey] = true
          state.modalVisible.value = { ...state.modalVisible.value }
        }
      }, () => 'Open Modal'),
      h(Modal, {
        modelValue: modalVisibleRef.value,
        'onUpdate:modelValue': (v: boolean) => {
          state.modalVisible.value[modalKey] = v
          state.modalVisible.value = { ...state.modalVisible.value }
        },
        title: 'Modal Title',
        closable: true,
        maskClosable: true,
        originPoint: state.modalOriginPoints.value[modalKey],
      }, () => h('p', {}, 'Modal content goes here')),
    ])
  }

  // Drawer examples
  if (codeLower.includes('drawer')) {
    const drawerKey = `${codeKey}-drawer`
    const drawerVisibleRef = computed({
      get: () => state.drawerVisible.value[drawerKey] || false,
      set: (v: boolean) => {
        state.drawerVisible.value[drawerKey] = v
      },
    })
    return () => h('div', { class: 'preview-drawer-wrapper' }, [
      h(Button, {
        onClick: (e: MouseEvent) => {
          state.drawerOriginPoints.value[drawerKey] = {
            x: e.clientX,
            y: e.clientY,
          }
          state.drawerVisible.value[drawerKey] = true
        }
      }, () => 'Open Drawer'),
      h(Drawer, {
        modelValue: drawerVisibleRef.value,
        'onUpdate:modelValue': (v: boolean) => {
          state.drawerVisible.value[drawerKey] = v
        },
        title: 'Drawer Title',
        placement: 'right',
        originPoint: state.drawerOriginPoints.value[drawerKey],
      }, () => h('p', {}, 'Drawer content goes here')),
    ])
  }

  // Popover examples
  if (codeLower.includes('popover')) {
    return () => h(Popover, {
      title: 'Popover Title',
      trigger: 'click',
      placement: 'bottom'
    }, {
      trigger: () => h(Button, {}, () => 'Click me'),
      default: () => h('p', {}, 'Popover content goes here'),
    })
  }

  // Tooltip examples
  if (codeLower.includes('tooltip')) {
    return () => h(Tooltip, {
      content: 'This is a tooltip',
      trigger: 'hover',
      placement: 'top'
    }, () => h(Button, {}, () => 'Hover me'))
  }

  return null
}
