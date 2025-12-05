import { h, computed } from 'vue'
import { Button, Notification, Skeleton, Spinner, Progress } from '@elix/ui'
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
    
    const success = (title: string, message?: string, duration?: number) => add({ title, message, type: 'success', duration })
    const error = (title: string, message?: string, duration?: number) => add({ title, message, type: 'error', duration })
    const warning = (title: string, message?: string, duration?: number) => add({ title, message, type: 'warning', duration })
    const info = (title: string, message?: string, duration?: number) => add({ title, message, type: 'info', duration })
    
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
              avatar: true,
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
              avatar: true,
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
            rows: 3,
          }, () => h('div', {}, 'Content loaded')),
        ]),
      ])
    }
  }

  // Spinner examples
  if (codeLower.includes('spinner')) {
    return () => h('div', { class: 'preview-spinners' }, [
      h(Spinner),
      h(Spinner, { size: 'sm' }),
      h(Spinner, { size: 'lg' }),
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
