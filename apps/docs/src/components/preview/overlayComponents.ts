import { h, computed, type Ref } from 'vue'
import { Button, Modal, Drawer, Popover, Tooltip } from '@elivander/elix-ui'
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
    
    // Parse props from code
    const parsePlacement = (): 'left' | 'right' | 'top' | 'bottom' => {
      if (codeLower.includes('placement="left"') || codeLower.includes("placement='left'")) return 'left'
      if (codeLower.includes('placement="right"') || codeLower.includes("placement='right'")) return 'right'
      if (codeLower.includes('placement="top"') || codeLower.includes("placement='top'")) return 'top'
      if (codeLower.includes('placement="bottom"') || codeLower.includes("placement='bottom'")) return 'bottom'
      return 'right' // default
    }
    
    const parseBoolean = (prop: string, defaultValue: boolean = true): boolean => {
      // Check for :prop="false" or :prop="true"
      const falsePattern = new RegExp(`:${prop}="false"|:${prop}='false'|:${prop}=\\{false\\}`)
      const truePattern = new RegExp(`:${prop}="true"|:${prop}='true'|:${prop}=\\{true\\}`)
      // Check for prop="false" or prop="true" (without colon)
      const falsePattern2 = new RegExp(`${prop}="false"|${prop}='false'`)
      const truePattern2 = new RegExp(`${prop}="true"|${prop}='true'`)
      
      if (falsePattern.test(code) || falsePattern2.test(code)) return false
      if (truePattern.test(code) || truePattern2.test(code)) return true
      // If prop is mentioned but no value, assume true
      if (codeLower.includes(prop.toLowerCase())) return defaultValue
      return defaultValue
    }
    
    const parsedPlacement = parsePlacement()
    const parsedMaskClosable = parseBoolean('maskClosable', true)
    const parsedClosable = parseBoolean('closable', true)
    const parsedScrollable = parseBoolean('scrollable', true)
    
    // Check if this is a simple example (just basic usage) or advanced (with controls)
    const isSimpleExample = !codeLower.includes('open') && !codeLower.includes('placement=') && !codeLower.includes('maskclosable')
    
    const drawerVisibleRef = computed({
      get: () => state.drawerVisible.value[drawerKey] || false,
      set: (v: boolean) => {
        state.drawerVisible.value[drawerKey] = v
        state.drawerVisible.value = { ...state.drawerVisible.value }
      },
    })
    
    if (isSimpleExample) {
      // Simple example - just show the drawer with parsed props
      return () => h('div', { class: 'preview-drawer-wrapper' }, [
        h(Button, {
          onClick: (e: MouseEvent) => {
            state.drawerOriginPoints.value[drawerKey] = {
              x: e.clientX,
              y: e.clientY,
            }
            state.drawerVisible.value[drawerKey] = true
            state.drawerVisible.value = { ...state.drawerVisible.value }
          }
        }, () => 'Open Drawer'),
        h(Drawer, {
          modelValue: drawerVisibleRef.value,
          'onUpdate:modelValue': (v: boolean) => {
            state.drawerVisible.value[drawerKey] = v
            state.drawerVisible.value = { ...state.drawerVisible.value }
          },
          title: 'Drawer Title',
          placement: parsedPlacement,
          maskClosable: parsedMaskClosable,
          closable: parsedClosable,
          scrollable: parsedScrollable,
          originPoint: state.drawerOriginPoints.value[drawerKey],
        }, () => h('p', {}, 'Drawer content goes here')),
      ])
    }
    
    // Advanced example with controls
    const placementKey = `${codeKey}-drawer-placement`
    const maskClosableKey = `${codeKey}-drawer-maskclosable`
    
    // Initialize from parsed values
    if (!state.drawerVisible.value[placementKey]) {
      state.drawerVisible.value[placementKey] = parsedPlacement
    }
    if (state.switchValues.value[maskClosableKey] === undefined) {
      state.switchValues.value[maskClosableKey] = parsedMaskClosable
    }
    
    const drawerPlacement = computed(() => 
      (state.drawerVisible.value[placementKey] as 'left' | 'right' | 'top' | 'bottom') || parsedPlacement
    )
    const maskClosableRef = computed({
      get: () => state.switchValues.value[maskClosableKey] !== false,
      set: (v: boolean) => {
        state.switchValues.value[maskClosableKey] = v
        state.switchValues.value = { ...state.switchValues.value }
      },
    })
    
    const openDrawer = (placement: 'left' | 'right' | 'top' | 'bottom', e: MouseEvent) => {
      state.drawerVisible.value[placementKey] = placement
      state.drawerOriginPoints.value[drawerKey] = {
        x: e.clientX,
        y: e.clientY,
      }
      state.drawerVisible.value[drawerKey] = true
      state.drawerVisible.value = { ...state.drawerVisible.value }
    }
    
    return () => h('div', { class: 'preview-drawer-wrapper', style: 'display: flex; flex-direction: column; gap: 12px;' }, [
      h('div', { style: 'display: flex; gap: 8px; flex-wrap: wrap;' }, [
        h(Button, {
          onClick: (e: MouseEvent) => openDrawer('left', e)
        }, () => 'Open Left'),
        h(Button, {
          onClick: (e: MouseEvent) => openDrawer('right', e)
        }, () => 'Open Right'),
        h(Button, {
          onClick: (e: MouseEvent) => openDrawer('top', e)
        }, () => 'Open Top'),
        h(Button, {
          onClick: (e: MouseEvent) => openDrawer('bottom', e)
        }, () => 'Open Bottom'),
      ]),
      h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
        h('label', { style: 'font-size: 14px;' }, 'Mask Closable:'),
        h('input', {
          type: 'checkbox',
          checked: maskClosableRef.value,
          onChange: (e: Event) => {
            maskClosableRef.value = (e.target as HTMLInputElement).checked
          },
          style: 'cursor: pointer;'
        }),
      ]),
      h(Drawer, {
        modelValue: drawerVisibleRef.value,
        'onUpdate:modelValue': (v: boolean) => {
          state.drawerVisible.value[drawerKey] = v
          state.drawerVisible.value = { ...state.drawerVisible.value }
        },
        title: 'Drawer Title',
        placement: drawerPlacement.value,
        maskClosable: maskClosableRef.value,
        closable: parsedClosable,
        scrollable: parsedScrollable,
        originPoint: state.drawerOriginPoints.value[drawerKey],
      }, () => h('div', { style: 'padding: 16px;' }, [
        h('p', {}, 'Drawer content goes here'),
        h('p', { style: 'margin-top: 12px;' }, 'You can close this drawer by clicking the X button, clicking outside (if maskClosable is enabled), or pressing ESC.'),
      ])),
    ])
  }

  // Popover examples
  if (codeLower.includes('popover')) {
    // Parse props from code
    const parseTrigger = (): 'click' | 'hover' | 'focus' => {
      if (codeLower.includes('trigger="click"') || codeLower.includes("trigger='click'")) return 'click'
      if (codeLower.includes('trigger="hover"') || codeLower.includes("trigger='hover'")) return 'hover'
      if (codeLower.includes('trigger="focus"') || codeLower.includes("trigger='focus'")) return 'focus'
      return 'click' // default
    }
    
    const parsePlacement = (): 'top' | 'bottom' | 'left' | 'right' => {
      if (codeLower.includes('placement="top"') || codeLower.includes("placement='top'")) return 'top'
      if (codeLower.includes('placement="bottom"') || codeLower.includes("placement='bottom'")) return 'bottom'
      if (codeLower.includes('placement="left"') || codeLower.includes("placement='left'")) return 'left'
      if (codeLower.includes('placement="right"') || codeLower.includes("placement='right'")) return 'right'
      return 'bottom' // default
    }
    
    const parseBoolean = (prop: string, defaultValue: boolean = true): boolean => {
      const falsePattern = new RegExp(`:${prop}="false"|:${prop}='false'|:${prop}=\\{false\\}|${prop}="false"|${prop}='false'`)
      const truePattern = new RegExp(`:${prop}="true"|:${prop}='true'|:${prop}=\\{true\\}|${prop}="true"|${prop}='true'`)
      
      if (falsePattern.test(code)) return false
      if (truePattern.test(code)) return true
      if (codeLower.includes(prop.toLowerCase())) return defaultValue
      return defaultValue
    }
    
    const parseTitle = (): string | undefined => {
      const titleMatch = code.match(/title="([^"]+)"|title='([^']+)'/)
      return titleMatch ? (titleMatch[1] || titleMatch[2]) : undefined
    }
    
    const parsedTrigger = parseTrigger()
    const parsedPlacement = parsePlacement()
    const parsedShowArrow = parseBoolean('showArrow', true)
    const parsedDisabled = parseBoolean('disabled', false)
    const parsedTitle = parseTitle()
    
    // Check if this is a simple example or advanced (with multiple examples)
    const isSimpleExample = !codeLower.includes('trigger=') && !codeLower.includes('placement=') && !codeLower.includes('showarrow')
    
    if (isSimpleExample) {
      // Simple example - show one popover with parsed props
      return () => h(Popover, {
        title: parsedTitle || 'Popover Title',
        trigger: parsedTrigger,
        placement: parsedPlacement,
        showArrow: parsedShowArrow,
        disabled: parsedDisabled,
      }, {
        trigger: () => h(Button, {}, () => 'Click me'),
        default: () => h('p', { style: 'margin: 0;' }, 'Popover content goes here'),
      })
    }
    
    // Advanced example with controls
    const triggerKey = `${codeKey}-popover-trigger`
    
    // Initialize from parsed values
    if (!state.drawerVisible.value[triggerKey]) {
      state.drawerVisible.value[triggerKey] = parsedTrigger
    }
    
    const popoverTrigger = computed(() => 
      (state.drawerVisible.value[triggerKey] as 'click' | 'hover' | 'focus') || parsedTrigger
    )
    
    return () => h('div', { class: 'preview-popover-wrapper', style: 'display: flex; flex-direction: column; gap: 16px;' }, [
      h('div', { style: 'display: flex; gap: 8px; flex-wrap: wrap; align-items: center;' }, [
        h('span', { style: 'font-size: 14px; margin-right: 8px;' }, 'Trigger:'),
        h(Button, {
          size: 'sm',
          variant: popoverTrigger.value === 'click' ? 'primary' : 'default',
          onClick: () => {
            state.drawerVisible.value[triggerKey] = 'click'
            state.drawerVisible.value = { ...state.drawerVisible.value }
          }
        }, () => 'Click'),
        h(Button, {
          size: 'sm',
          variant: popoverTrigger.value === 'hover' ? 'primary' : 'default',
          onClick: () => {
            state.drawerVisible.value[triggerKey] = 'hover'
            state.drawerVisible.value = { ...state.drawerVisible.value }
          }
        }, () => 'Hover'),
        h(Button, {
          size: 'sm',
          variant: popoverTrigger.value === 'focus' ? 'primary' : 'default',
          onClick: () => {
            state.drawerVisible.value[triggerKey] = 'focus'
            state.drawerVisible.value = { ...state.drawerVisible.value }
          }
        }, () => 'Focus'),
      ]),
      h('div', { style: 'display: flex; gap: 8px; flex-wrap: wrap;' }, [
        h(Popover, {
          title: parsedTitle || 'Popover Title',
          trigger: popoverTrigger.value,
          placement: parsedPlacement,
          showArrow: parsedShowArrow,
        }, {
          trigger: () => h(Button, {}, () => 'Click me'),
          default: () => h('p', { style: 'margin: 0;' }, 'Popover content goes here'),
        }),
        h(Popover, {
          trigger: popoverTrigger.value,
          placement: 'right',
          showArrow: false,
        }, {
          trigger: () => h(Button, { variant: 'outline' }, () => 'No Arrow'),
          default: () => h('p', { style: 'margin: 0;' }, 'This popover has no arrow'),
        }),
        h(Popover, {
          title: 'Disabled Popover',
          trigger: popoverTrigger.value,
          placement: 'top',
          disabled: true,
        }, {
          trigger: () => h(Button, { disabled: true }, () => 'Disabled'),
          default: () => h('p', { style: 'margin: 0;' }, 'This popover is disabled'),
        }),
      ]),
    ])
  }

  // Tooltip examples
  if (codeLower.includes('tooltip')) {
    // Parse props from code
    const parseTrigger = (): 'hover' | 'click' | 'focus' => {
      if (codeLower.includes('trigger="click"') || codeLower.includes("trigger='click'")) return 'click'
      if (codeLower.includes('trigger="hover"') || codeLower.includes("trigger='hover'")) return 'hover'
      if (codeLower.includes('trigger="focus"') || codeLower.includes("trigger='focus'")) return 'focus'
      return 'hover' // default
    }
    
    const parsePlacement = (): 'top' | 'bottom' | 'left' | 'right' => {
      if (codeLower.includes('placement="top"') || codeLower.includes("placement='top'")) return 'top'
      if (codeLower.includes('placement="bottom"') || codeLower.includes("placement='bottom'")) return 'bottom'
      if (codeLower.includes('placement="left"') || codeLower.includes("placement='left'")) return 'left'
      if (codeLower.includes('placement="right"') || codeLower.includes("placement='right'")) return 'right'
      return 'top' // default
    }
    
    const parseContent = (): string => {
      const contentMatch = code.match(/content="([^"]+)"|content='([^']+)'/)
      return contentMatch ? (contentMatch[1] || contentMatch[2]) : 'This is a tooltip'
    }
    
    const parseBoolean = (prop: string, defaultValue: boolean = false): boolean => {
      const falsePattern = new RegExp(`:${prop}="false"|:${prop}='false'|:${prop}=\\{false\\}|${prop}="false"|${prop}='false'`)
      const truePattern = new RegExp(`:${prop}="true"|:${prop}='true'|:${prop}=\\{true\\}|${prop}="true"|${prop}='true'`)
      
      if (falsePattern.test(code)) return false
      if (truePattern.test(code)) return true
      if (codeLower.includes(prop.toLowerCase())) return defaultValue
      return defaultValue
    }
    
    const parsedTrigger = parseTrigger()
    const parsedPlacement = parsePlacement()
    const parsedContent = parseContent()
    const parsedDisabled = parseBoolean('disabled', false)
    
    // Check if this is a simple example or advanced (with multiple examples)
    const isSimpleExample = !codeLower.includes('trigger=') && !codeLower.includes('placement=') && !codeLower.includes('disabled')
    
    if (isSimpleExample) {
      // Simple example - show one tooltip with parsed props
      return () => h(Tooltip, {
        content: parsedContent,
        trigger: parsedTrigger,
        placement: parsedPlacement,
        disabled: parsedDisabled,
      }, () => h(Button, {}, () => 'Hover me'))
    }
    
    // Advanced example with multiple tooltips
    return () => h('div', { class: 'preview-tooltip-wrapper', style: 'display: flex; flex-direction: column; gap: 16px;' }, [
      h('div', { style: 'display: flex; gap: 8px; flex-wrap: wrap; align-items: center;' }, [
        h(Tooltip, {
          content: parsedContent || 'This is a tooltip on a button',
          trigger: parsedTrigger,
          placement: parsedPlacement,
        }, () => h(Button, {}, () => 'Hover Button')),
        h(Tooltip, {
          content: 'Tooltip on icon',
          trigger: 'hover',
          placement: 'right'
        }, () => h('span', {
          style: 'display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 4px; background: var(--eui-bg-secondary); cursor: pointer;'
        }, 'ℹ️')),
        h(Tooltip, {
          content: 'Tooltip on text',
          trigger: 'hover',
          placement: 'bottom'
        }, () => h('span', {
          style: 'text-decoration: underline; cursor: help; color: var(--eui-color-primary);'
        }, 'Hover this text')),
      ]),
      h('div', { style: 'display: flex; gap: 8px; flex-wrap: wrap; align-items: center;' }, [
        h(Tooltip, {
          content: 'Click to show tooltip',
          trigger: 'click',
          placement: 'top'
        }, () => h(Button, { variant: 'outline' }, () => 'Click Tooltip')),
        h(Tooltip, {
          content: 'Focus to show tooltip',
          trigger: 'focus',
          placement: 'right'
        }, () => h('input', {
          type: 'text',
          placeholder: 'Focus me',
          style: 'padding: 8px 12px; border: 1px solid var(--eui-border-color); border-radius: 4px;'
        })),
        h(Tooltip, {
          content: 'This tooltip is disabled',
          trigger: 'hover',
          placement: 'top',
          disabled: true
        }, () => h(Button, { disabled: true }, () => 'Disabled Tooltip')),
      ]),
    ])
  }

  return null
}
