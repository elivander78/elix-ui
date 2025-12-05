import { h, computed } from 'vue'
import { Button, Notification, Skeleton, Spinner, Progress, Card, Avatar, Select, Input } from '@elivander/elix-ui'
import type { RenderFunction, PreviewState, NotificationItem } from './types'

export function renderFeedbackComponents(
  code: string,
  codeKey: string,
  state: PreviewState,
  onlyComponent?: string
): RenderFunction {
  const codeLower = code.toLowerCase()

  // Notification examples - проверяем ПЕРЕД button, т.к. notification может содержать button
  if (codeLower.includes('notification') && (!onlyComponent || onlyComponent === 'notification')) {
    const notificationKey = `${codeKey}-notification`
    
    if (!state.notifications.value[notificationKey]) {
      state.notifications.value[notificationKey] = []
      state.notifications.value = { ...state.notifications.value }
    }
    if (!state.notificationCounters.value[notificationKey]) {
      state.notificationCounters.value[notificationKey] = 0
      state.notificationCounters.value = { ...state.notificationCounters.value }
    }
    
    const add = (options: { title: string; message?: string; type?: 'success' | 'error' | 'warning' | 'info'; duration?: number }) => {
      const id = `notification-${++state.notificationCounters.value[notificationKey]}`
      const notification: NotificationItem = { ...options, id }
      state.notifications.value[notificationKey] = [...(state.notifications.value[notificationKey] || []), notification]
      state.notifications.value = { ...state.notifications.value }
      
      if (options.duration !== 0) {
        const duration = options.duration || 4500
        setTimeout(() => {
          remove(id)
        }, duration)
      }
      
      return id
    }
    
    const remove = (id: string) => {
      state.notifications.value[notificationKey] = (state.notifications.value[notificationKey] || []).filter((n) => n.id !== id)
      state.notifications.value = { ...state.notifications.value }
    }
    
    const success = (title: string, message?: string, duration?: number, options?: any) => add({ title, message, type: 'success', duration, ...options })
    const error = (title: string, message?: string, duration?: number, options?: any) => add({ title, message, type: 'error', duration, ...options })
    const warning = (title: string, message?: string, duration?: number, options?: any) => add({ title, message, type: 'warning', duration, ...options })
    const info = (title: string, message?: string, duration?: number, options?: any) => add({ title, message, type: 'info', duration, ...options })
    
    // Check for position & appearance example
    if ((codeLower.includes('position') && codeLower.includes('appearance')) || 
        codeLower.includes('position & appearance') ||
        codeLower.includes('positionappearance') ||
        (codeLower.includes('select') && codeLower.includes('position') && codeLower.includes('appearance'))) {
      const positionKey = `${notificationKey}-position`
      const durationKey = `${notificationKey}-duration`
      const appearanceKey = `${notificationKey}-appearance`
      
      if (!state.selectValues.value[positionKey]) {
        state.selectValues.value[positionKey] = 'top-right'
        state.selectValues.value = { ...state.selectValues.value }
      }
      if (!state.inputValues.value[durationKey]) {
        state.inputValues.value[durationKey] = '4500'
        state.inputValues.value = { ...state.inputValues.value }
      }
      if (!state.selectValues.value[appearanceKey]) {
        state.selectValues.value[appearanceKey] = 'shadow'
        state.selectValues.value = { ...state.selectValues.value }
      }
      
      return () => {
        const notificationsRef = computed(() => state.notifications.value[notificationKey] || [])
        const positionRef = computed({
          get: () => state.selectValues.value[positionKey] as string || 'top-right',
          set: (v: string) => {
            state.selectValues.value[positionKey] = v
            state.selectValues.value = { ...state.selectValues.value }
          }
        })
        const durationRef = computed({
          get: () => state.inputValues.value[durationKey] || '4500',
          set: (v: string) => {
            state.inputValues.value[durationKey] = v
            state.inputValues.value = { ...state.inputValues.value }
          }
        })
        const appearanceRef = computed({
          get: () => state.selectValues.value[appearanceKey] as string || 'shadow',
          set: (v: string) => {
            state.selectValues.value[appearanceKey] = v
            state.selectValues.value = { ...state.selectValues.value }
          }
        })
        
        const showNotification = (type: string) => {
          const duration = parseInt(durationRef.value) || 0
          add({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            message: 'Notification message',
            type: type as any,
            duration: duration || undefined,
            position: positionRef.value as any,
            appearance: appearanceRef.value as any,
          })
        }
        
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__controls', style: 'display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;' }, [
            h(Button, { onClick: () => showNotification('success') }, () => 'Success'),
            h(Button, { onClick: () => showNotification('error') }, () => 'Error'),
            h(Button, { onClick: () => showNotification('warning') }, () => 'Warning'),
            h(Button, { onClick: () => showNotification('info') }, () => 'Info'),
          ]),
          h('div', { class: 'playground__controls', style: 'display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; align-items: center;' }, [
            h('label', { style: 'font-size: 14px;' }, 'Position:'),
            h(Select, {
              modelValue: positionRef.value,
              'onUpdate:modelValue': (v: any) => { positionRef.value = v },
              options: [
                { label: 'Top Right', value: 'top-right' },
                { label: 'Top Left', value: 'top-left' },
                { label: 'Bottom Right', value: 'bottom-right' },
                { label: 'Bottom Left', value: 'bottom-left' },
              ],
              style: 'width: 150px;'
            }),
            h('label', { style: 'font-size: 14px;' }, 'Duration (ms):'),
            h(Input, {
              modelValue: durationRef.value,
              'onUpdate:modelValue': (v: string | number) => { durationRef.value = String(v) },
              type: 'number',
              placeholder: '0 = no auto-close',
              style: 'width: 150px;'
            }),
            h('label', { style: 'font-size: 14px;' }, 'Appearance:'),
            h(Select, {
              modelValue: appearanceRef.value,
              'onUpdate:modelValue': (v: any) => { appearanceRef.value = v },
              options: [
                { label: 'Border', value: 'border' },
                { label: 'Shadow', value: 'shadow' },
              ],
              style: 'width: 150px;'
            }),
          ]),
          h('div', { class: 'playground__example' }, [
            h(Notification, { 
              notifications: notificationsRef.value, 
              onRemove: (id: string) => remove(id) 
            }),
          ]),
        ])
      }
    }
    
    // Check for duration control example - look for specific patterns
    if (codeLower.includes('duration') || codeLower.includes('persistent') || 
        codeLower.includes('showshort') || codeLower.includes('showlong') || 
        codeLower.includes('showpersistent') || codeLower.includes('showdefault') ||
        (codeLower.includes('2000') && codeLower.includes('5000'))) {
      return () => {
        const notificationsRef = computed(() => state.notifications.value[notificationKey] || [])
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__controls' }, [
            h(Button, { onClick: () => success('Success', 'This will close in 2 seconds', 2000) }, () => 'Short Duration'),
            h(Button, { onClick: () => error('Error', 'This will close in 5 seconds', 5000) }, () => 'Long Duration'),
            h(Button, { onClick: () => warning('Warning', 'This will stay until closed', 0) }, () => 'Persistent'),
            h(Button, { onClick: () => info('Info', 'Default duration (4.5s)', undefined) }, () => 'Default'),
          ]),
          h('div', { class: 'playground__example' }, [
            h(Notification, { 
              notifications: notificationsRef.value, 
              onRemove: (id: string) => remove(id) 
            }),
          ]),
        ])
      }
    }
    if (codeLower.includes('types') || codeLower.includes('all')) {
      return () => {
        const notificationsRef = computed(() => state.notifications.value[notificationKey] || [])
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__controls' }, [
            h(Button, { onClick: () => success('Success', 'Operation completed successfully') }, () => 'Success'),
            h(Button, { onClick: () => error('Error', 'Something went wrong') }, () => 'Error'),
            h(Button, { onClick: () => warning('Warning', 'Please check your input') }, () => 'Warning'),
            h(Button, { onClick: () => info('Info', 'This is an informational message') }, () => 'Info'),
          ]),
          h('div', { class: 'playground__example' }, [
            h(Notification, { 
              notifications: notificationsRef.value, 
              onRemove: (id: string) => remove(id) 
            }),
          ]),
        ])
      }
    }
    // Basic usage
    return () => {
      const notificationsRef = computed(() => state.notifications.value[notificationKey] || [])
      return h('div', { class: 'playground' }, [
        h('div', { class: 'playground__controls' }, [
          h(Button, { onClick: () => success('Success', 'Operation completed') }, () => 'Success'),
          h(Button, { onClick: () => error('Error', 'Something went wrong') }, () => 'Error'),
          h(Button, { onClick: () => warning('Warning', 'Please check') }, () => 'Warning'),
          h(Button, { onClick: () => info('Info', 'Information message') }, () => 'Info'),
        ]),
        h('div', { class: 'playground__example' }, [
          h(Notification, { 
            notifications: notificationsRef.value, 
            onRemove: (id: string) => remove(id) 
          }),
        ]),
      ])
    }
  }

  // Если запрошен только notification, не проверяем другие компоненты
  if (onlyComponent && onlyComponent !== 'notification') {
    return null
  }

  // Skeleton examples
  if (codeLower.includes('skeleton')) {
    const skeletonKey = `${codeKey}-skeleton`
    
    if (state.loadingStates.value[skeletonKey] === undefined) {
      state.loadingStates.value[skeletonKey] = true
      state.loadingStates.value = { ...state.loadingStates.value }
    }
    
    // Check for card example
    if (codeLower.includes('card example') || codeLower.includes('card') && codeLower.includes('avatar') && codeLower.includes('jd')) {
      return () => {
        const loadingRef = computed({
          get: () => state.loadingStates.value[skeletonKey] ?? true,
          set: (v: boolean) => {
            state.loadingStates.value[skeletonKey] = v
            state.loadingStates.value = { ...state.loadingStates.value }
          }
        })
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__example', style: 'max-width: 400px;' }, [
            h(Card, {}, {
              default: () => [
                h(Skeleton, {
                  loading: loadingRef.value,
                  type: 'avatar',
                  rows: 3,
                  animated: true,
                }, () => h('div', { style: 'display: flex; gap: 16px;' }, [
                  h(Avatar, {}, () => 'JD'),
                  h('div', {}, [
                    h('h3', { style: 'margin: 0 0 8px 0;' }, 'John Doe'),
                    h('p', { style: 'margin: 0; color: var(--eui-text-secondary);' }, 'Software Developer'),
                    h('p', { style: 'margin: 8px 0 0 0;' }, 'This is some content that appears when loading is false.'),
                  ]),
                ])),
                h(Button, { onClick: () => { loadingRef.value = !loadingRef.value }, style: 'margin-top: 16px;' }, () => 'Toggle Loading'),
              ]
            }),
          ]),
        ])
      }
    }
    
    // Check for table example
    if (codeLower.includes('table example') || codeLower.includes('table') && codeLower.includes('name') && codeLower.includes('email')) {
      return () => {
        const loadingRef = computed({
          get: () => state.loadingStates.value[skeletonKey] ?? true,
          set: (v: boolean) => {
            state.loadingStates.value[skeletonKey] = v
            state.loadingStates.value = { ...state.loadingStates.value }
          }
        })
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__controls', style: 'display: flex; gap: 10px; margin-bottom: 16px;' }, [
            h(Button, { onClick: () => { loadingRef.value = !loadingRef.value } }, () => 'Toggle Loading'),
          ]),
          h('div', { class: 'playground__example', style: 'border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); overflow: hidden;' }, [
            h(Skeleton, {
              loading: loadingRef.value,
              rows: 5,
              animated: true,
            }, () => h('table', { style: 'width: 100%; border-collapse: collapse;' }, [
              h('thead', {}, h('tr', { style: 'background: var(--eui-bg-secondary);' }, [
                h('th', { style: 'padding: 12px; text-align: left;' }, 'Name'),
                h('th', { style: 'padding: 12px; text-align: left;' }, 'Email'),
                h('th', { style: 'padding: 12px; text-align: left;' }, 'Role'),
              ])),
              h('tbody', {}, [
                h('tr', {}, [
                  h('td', { style: 'padding: 12px;' }, 'John Doe'),
                  h('td', { style: 'padding: 12px;' }, 'john@example.com'),
                  h('td', { style: 'padding: 12px;' }, 'Admin'),
                ]),
                h('tr', {}, [
                  h('td', { style: 'padding: 12px;' }, 'Jane Smith'),
                  h('td', { style: 'padding: 12px;' }, 'jane@example.com'),
                  h('td', { style: 'padding: 12px;' }, 'User'),
                ]),
                h('tr', {}, [
                  h('td', { style: 'padding: 12px;' }, 'Bob Johnson'),
                  h('td', { style: 'padding: 12px;' }, 'bob@example.com'),
                  h('td', { style: 'padding: 12px;' }, 'User'),
                ]),
              ]),
            ])),
          ]),
        ])
      }
    }
    
    if (codeLower.includes('animated')) {
      return () => {
        const loadingRef = computed({
          get: () => state.loadingStates.value[skeletonKey] ?? true,
          set: (v: boolean) => {
            state.loadingStates.value[skeletonKey] = v
            state.loadingStates.value = { ...state.loadingStates.value }
          }
        })
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__controls' }, [
            h(Button, { onClick: () => { loadingRef.value = !loadingRef.value } }, () => 'Toggle Loading'),
          ]),
          h('div', { class: 'playground__example' }, [
            h(Skeleton, {
              loading: loadingRef.value,
              type: 'avatar',
              rows: 3,
              animated: true,
            }, () => h('div', {}, 'Animated skeleton content')),
          ]),
        ])
      }
    }
    if (codeLower.includes('avatar')) {
      return () => {
        const loadingRef = computed({
          get: () => state.loadingStates.value[skeletonKey] ?? true,
          set: (v: boolean) => {
            state.loadingStates.value[skeletonKey] = v
            state.loadingStates.value = { ...state.loadingStates.value }
          }
        })
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__controls' }, [
            h(Button, { onClick: () => { loadingRef.value = !loadingRef.value } }, () => 'Toggle Loading'),
          ]),
          h('div', { class: 'playground__example' }, [
            h(Skeleton, {
              loading: loadingRef.value,
              type: 'avatar',
              rows: 3,
            }, () => h('div', {}, 'Content with avatar loaded')),
          ]),
        ])
      }
    }
    // Basic usage
    return () => {
      const loadingRef = computed(() => state.loadingStates.value[skeletonKey] ?? true)
      return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__example' }, [
            h(Skeleton, {
              loading: loadingRef.value,
              type: 'text',
              rows: 3,
            }, () => h('div', {}, 'Content loaded')),
          ]),
      ])
    }
  }

  // Spinner examples
  if (codeLower.includes('spinner')) {
    // Check for overlay example
    if (codeLower.includes('overlay') || codeLower.includes('with overlay')) {
      const spinnerKey = `${codeKey}-spinner`
      if (state.loadingStates.value[spinnerKey] === undefined) {
        state.loadingStates.value[spinnerKey] = true
        state.loadingStates.value = { ...state.loadingStates.value }
      }
      return () => {
        const loadingRef = computed({
          get: () => state.loadingStates.value[spinnerKey] ?? true,
          set: (v: boolean) => {
            state.loadingStates.value[spinnerKey] = v
            state.loadingStates.value = { ...state.loadingStates.value }
          }
        })
        return h('div', { class: 'playground' }, [
          h('div', { 
            class: 'playground__example', 
            style: 'position: relative; height: 300px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); padding: 20px;' 
          }, [
            loadingRef.value ? h(Spinner, { overlay: true, label: 'Loading...' }) : null,
            h(Card, {}, {
              default: () => h('div', {}, [
                h('h3', {}, 'Card Content'),
                h('p', {}, 'This is some content in a card. Scroll to see the overlay spinner when loading.'),
              ])
            }),
            h(Button, { onClick: () => { loadingRef.value = !loadingRef.value }, style: 'margin-top: 16px;' }, () => 'Toggle Loading'),
          ]),
        ])
      }
    }
    // Basic usage
    return () => h('div', { class: 'preview-spinners', style: 'display: flex; gap: 20px; align-items: center;' }, [
      h(Spinner),
      h(Spinner, { size: 'sm' }),
      h(Spinner, { size: 'lg' }),
      h(Spinner, { size: 48, thickness: 6, label: 'Loading...' }),
    ])
  }

  // Progress examples
  if (codeLower.includes('progress')) {
    const progressKey = `${codeKey}-progress`
    
    if (state.progressValues.value[progressKey] === undefined) {
      state.progressValues.value[progressKey] = 50
      state.progressValues.value = { ...state.progressValues.value }
    }
    
    if (codeLower.includes('animated')) {
      return () => {
        const percentRef = computed({
          get: () => state.progressValues.value[progressKey] ?? 50,
          set: (v: number) => {
            state.progressValues.value[progressKey] = v
            state.progressValues.value = { ...state.progressValues.value }
          }
        })
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__controls' }, [
            h(Button, { onClick: () => { percentRef.value = Math.max(0, percentRef.value - 10) } }, () => '-10%'),
            h(Button, { onClick: () => { percentRef.value = Math.min(100, percentRef.value + 10) } }, () => '+10%'),
          ]),
          h('div', { class: 'playground__example', style: 'display: flex; flex-direction: column; gap: 20px;' }, [
            h(Progress, {
              percentage: percentRef.value,
              status: 'active',
              showInfo: true,
            }),
          ]),
        ])
      }
    }
    if (codeLower.includes('status')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: flex; flex-direction: column; gap: 20px;' }, [
          h(Progress, { percentage: 50, status: 'active' }),
          h(Progress, { percentage: 75, status: 'success' }),
          h(Progress, { percentage: 30, status: 'error' }),
        ]),
      ])
    }
    if (codeLower.includes('text')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: flex; flex-direction: column; gap: 20px;' }, [
          h(Progress, { percentage: 50, showInfo: true, text: 'Uploading...' }),
          h(Progress, { percentage: 75, showInfo: true, text: 'Processing...' }),
          h(Progress, { percentage: 100, showInfo: true, text: 'Complete' }),
        ]),
      ])
    }
    if (codeLower.includes('size') || codeLower.includes('stroke')) {
      return () => h('div', { class: 'playground' }, [
        h('div', { class: 'playground__example', style: 'display: flex; flex-direction: column; gap: 20px;' }, [
          h(Progress, { percentage: 50, strokeWidth: 4 }),
          h(Progress, { percentage: 50, strokeWidth: 8 }),
          h(Progress, { percentage: 50, strokeWidth: 12 }),
        ]),
      ])
    }
    // Check for playground example with all controls
    if (codeLower.includes('playground') || (codeLower.includes('type') && codeLower.includes('status') && codeLower.includes('appearance'))) {
      const percentKey = `${progressKey}-percent`
      const typeKey = `${progressKey}-type`
      const statusKey = `${progressKey}-status`
      const appearanceKey = `${progressKey}-appearance`
      
      if (!state.progressValues.value[percentKey]) {
        state.progressValues.value[percentKey] = 50
        state.progressValues.value = { ...state.progressValues.value }
      }
      if (!state.selectValues.value[typeKey]) {
        state.selectValues.value[typeKey] = 'line'
        state.selectValues.value = { ...state.selectValues.value }
      }
      if (!state.selectValues.value[statusKey]) {
        state.selectValues.value[statusKey] = 'normal'
        state.selectValues.value = { ...state.selectValues.value }
      }
      if (!state.selectValues.value[appearanceKey]) {
        state.selectValues.value[appearanceKey] = 'shadow'
        state.selectValues.value = { ...state.selectValues.value }
      }
      if (!state.checkboxValues.value[`${progressKey}-showLabel`]) {
        state.checkboxValues.value[`${progressKey}-showLabel`] = true
        state.checkboxValues.value = { ...state.checkboxValues.value }
      }
      if (!state.checkboxValues.value[`${progressKey}-striped`]) {
        state.checkboxValues.value[`${progressKey}-striped`] = false
        state.checkboxValues.value = { ...state.checkboxValues.value }
      }
      if (!state.checkboxValues.value[`${progressKey}-animated`]) {
        state.checkboxValues.value[`${progressKey}-animated`] = false
        state.checkboxValues.value = { ...state.checkboxValues.value }
      }
      
      return () => {
        const percentRef = computed({
          get: () => state.progressValues.value[percentKey] ?? 50,
          set: (v: number) => {
            state.progressValues.value[percentKey] = v
            state.progressValues.value = { ...state.progressValues.value }
          }
        })
        const typeRef = computed({
          get: () => state.selectValues.value[typeKey] as string || 'line',
          set: (v: string) => {
            state.selectValues.value[typeKey] = v
            state.selectValues.value = { ...state.selectValues.value }
          }
        })
        const statusRef = computed({
          get: () => state.selectValues.value[statusKey] as string || 'normal',
          set: (v: string) => {
            state.selectValues.value[statusKey] = v
            state.selectValues.value = { ...state.selectValues.value }
          }
        })
        const appearanceRef = computed({
          get: () => state.selectValues.value[appearanceKey] as string || 'shadow',
          set: (v: string) => {
            state.selectValues.value[appearanceKey] = v
            state.selectValues.value = { ...state.selectValues.value }
          }
        })
        const showLabelRef = computed({
          get: () => state.checkboxValues.value[`${progressKey}-showLabel`] ?? true,
          set: (v: boolean) => {
            state.checkboxValues.value[`${progressKey}-showLabel`] = v
            state.checkboxValues.value = { ...state.checkboxValues.value }
          }
        })
        const stripedRef = computed({
          get: () => state.checkboxValues.value[`${progressKey}-striped`] ?? false,
          set: (v: boolean) => {
            state.checkboxValues.value[`${progressKey}-striped`] = v
            state.checkboxValues.value = { ...state.checkboxValues.value }
          }
        })
        const animatedRef = computed({
          get: () => state.checkboxValues.value[`${progressKey}-animated`] ?? false,
          set: (v: boolean) => {
            state.checkboxValues.value[`${progressKey}-animated`] = v
            state.checkboxValues.value = { ...state.checkboxValues.value }
          }
        })
        
        return h('div', { class: 'playground' }, [
          h('div', { class: 'playground__example', style: 'display: flex; flex-direction: column; gap: 20px;' }, [
            h(Progress, {
              percent: percentRef.value,
              type: typeRef.value as any,
              status: statusRef.value as any,
              showLabel: showLabelRef.value,
              striped: stripedRef.value,
              animated: animatedRef.value,
              appearance: appearanceRef.value as any,
            }),
          ]),
          h('div', { class: 'playground__controls', style: 'display: flex; flex-direction: column; gap: 12px;' }, [
            h('div', { style: 'display: flex; align-items: center; gap: 10px;' }, [
              h('label', { style: 'min-width: 100px; font-size: 14px;' }, 'Percent:'),
              h('input', {
                type: 'range',
                value: percentRef.value,
                onInput: (e: Event) => { percentRef.value = parseInt((e.target as HTMLInputElement).value) },
                min: '0',
                max: '100',
                style: 'flex: 1;'
              }),
              h('span', { style: 'min-width: 50px; font-size: 14px;' }, `${percentRef.value}%`),
            ]),
            h('div', { style: 'display: flex; align-items: center; gap: 10px;' }, [
              h('label', { style: 'min-width: 100px; font-size: 14px;' }, 'Type:'),
              h(Select, {
                modelValue: typeRef.value,
                'onUpdate:modelValue': (v: any) => { typeRef.value = v },
                options: [
                  { label: 'Line', value: 'line' },
                  { label: 'Circle', value: 'circle' },
                ],
                style: 'width: 150px;'
              }),
            ]),
            h('div', { style: 'display: flex; align-items: center; gap: 10px;' }, [
              h('label', { style: 'min-width: 100px; font-size: 14px;' }, 'Status:'),
              h(Select, {
                modelValue: statusRef.value,
                'onUpdate:modelValue': (v: any) => { statusRef.value = v },
                options: [
                  { label: 'Normal', value: 'normal' },
                  { label: 'Success', value: 'success' },
                  { label: 'Error', value: 'error' },
                  { label: 'Warning', value: 'warning' },
                ],
                style: 'width: 150px;'
              }),
            ]),
            h('div', { style: 'display: flex; align-items: center; gap: 10px;' }, [
              h('label', { style: 'min-width: 100px; font-size: 14px;' }, 'Appearance:'),
              h(Select, {
                modelValue: appearanceRef.value,
                'onUpdate:modelValue': (v: any) => { appearanceRef.value = v },
                options: [
                  { label: 'Border', value: 'border' },
                  { label: 'Shadow', value: 'shadow' },
                ],
                style: 'width: 150px;'
              }),
            ]),
            h('div', { style: 'display: flex; gap: 20px;' }, [
              h('label', { style: 'font-size: 14px;' }, [
                h('input', {
                  type: 'checkbox',
                  checked: showLabelRef.value,
                  onChange: (e: Event) => { showLabelRef.value = (e.target as HTMLInputElement).checked },
                  style: 'margin-right: 4px;'
                }),
                'Show Label'
              ]),
              h('label', { style: 'font-size: 14px;' }, [
                h('input', {
                  type: 'checkbox',
                  checked: stripedRef.value,
                  onChange: (e: Event) => { stripedRef.value = (e.target as HTMLInputElement).checked },
                  style: 'margin-right: 4px;'
                }),
                'Striped'
              ]),
              h('label', { style: 'font-size: 14px;' }, [
                h('input', {
                  type: 'checkbox',
                  checked: animatedRef.value,
                  onChange: (e: Event) => { animatedRef.value = (e.target as HTMLInputElement).checked },
                  style: 'margin-right: 4px;'
                }),
                'Animated'
              ]),
            ]),
          ]),
        ])
      }
    }
    // Basic usage
    return () => h('div', { class: 'playground' }, [
      h('div', { class: 'playground__example', style: 'display: flex; flex-direction: column; gap: 20px;' }, [
        h(Progress, { percentage: 30 }),
        h(Progress, { percentage: 50 }),
        h(Progress, { percentage: 75 }),
        h(Progress, { percentage: 100 }),
      ]),
    ])
  }

  return null
}
