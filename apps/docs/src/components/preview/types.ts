import type { Ref } from 'vue'

export type NotificationItem = {
  id: string
  title: string
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export interface PreviewState {
  inputValues: Ref<Record<string, string>>
  selectValues: Ref<Record<string, string | number | undefined>>
  modalVisible: Ref<Record<string, boolean>>
  modalOriginPoints: Ref<Record<string, { x: number; y: number }>>
  drawerOriginPoints: Ref<Record<string, { x: number; y: number }>>
  drawerVisible: Ref<Record<string, boolean>>
  switchValues: Ref<Record<string, boolean>>
  checkboxValues: Ref<Record<string, boolean>>
  radioValues: Ref<Record<string, string | number>>
  textareaValues: Ref<Record<string, string>>
  tabsValues: Ref<Record<string, string | number>>
  notifications: Ref<Record<string, NotificationItem[]>>
  notificationCounters: Ref<Record<string, number>>
  loadingStates: Ref<Record<string, boolean>>
  progressValues: Ref<Record<string, number>>
  formData: Ref<Record<string, Record<string, any>>>
}

export type RenderFunction = (() => any) | null
