<template>
  <div class="preview-renderer">
    <component :is="renderedComponent" :key="props.code" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, h } from 'vue'
import { renderOverlayComponents } from './preview/overlayComponents'
import { renderFormComponents } from './preview/formComponents'
import { renderDataDisplayComponents } from './preview/dataDisplayComponents'
import { renderFeedbackComponents } from './preview/feedbackComponents'
import { renderNavigationComponents } from './preview/navigationComponents'
import { renderLayoutComponents } from './preview/layoutComponents'
import type { PreviewState, NotificationItem } from './preview/types'

const props = defineProps<{
  code: string
}>()

// Create state object
const previewState: PreviewState = {
  inputValues: ref<Record<string, string>>({}),
  selectValues: ref<Record<string, string | number | undefined>>({}),
  modalVisible: ref<Record<string, boolean>>({}),
  modalOriginPoints: ref<Record<string, { x: number; y: number }>>({}),
  drawerOriginPoints: ref<Record<string, { x: number; y: number }>>({}),
  drawerVisible: ref<Record<string, boolean>>({}),
  switchValues: ref<Record<string, boolean>>({}),
  checkboxValues: ref<Record<string, boolean>>({}),
  radioValues: ref<Record<string, string | number>>({}),
  textareaValues: ref<Record<string, string>>({}),
  tabsValues: ref<Record<string, string | number>>({}),
  notifications: ref<Record<string, NotificationItem[]>>({}),
  notificationCounters: ref<Record<string, number>>({}),
  loadingStates: ref<Record<string, boolean>>({}),
  progressValues: ref<Record<string, number>>({}),
  formData: ref<Record<string, Record<string, any>>>({}),
}

const renderedComponent = computed(() => {
  const code = props.code.toLowerCase()
  const codeKey = props.code.substring(0, 50)

  // Try overlay components first (Modal, Drawer, Popover, Tooltip) - они должны быть ПЕРЕД button
  const overlayResult = renderOverlayComponents(code, codeKey, previewState)
  if (overlayResult) return overlayResult

  // Try Notification ПЕРЕД button, т.к. notification может содержать button
  const notificationResult = renderFeedbackComponents(code, codeKey, previewState, 'notification')
  if (notificationResult) return notificationResult

  // Try Badge ПЕРЕД button, т.к. badge может содержать button
  const badgeResult = renderDataDisplayComponents(code, codeKey, previewState, 'badge')
  if (badgeResult) return badgeResult

  // Try Form ПЕРЕД button, т.к. form может содержать button
  const formResult = renderFormComponents(code, codeKey, previewState, 'form')
  if (formResult) return formResult

  // Try Header ПЕРЕД button, т.к. header может содержать button
  const headerResult = renderLayoutComponents(code, codeKey, previewState, 'header')
  if (headerResult) return headerResult

  // Try form components (Button, Input, Select, Checkbox, Radio, Switch, Textarea) - Form уже проверен выше
  const formButtonsResult = renderFormComponents(code, codeKey, previewState)
  if (formButtonsResult) return formButtonsResult

  // Try data display components (Card, Table, Tag, Avatar, Divider, Tabs, Breadcrumbs) - Badge уже проверен выше
  const dataDisplayResult = renderDataDisplayComponents(code, codeKey, previewState)
  if (dataDisplayResult) return dataDisplayResult

  // Try feedback components (Skeleton, Spinner, Progress) - Notification уже проверен выше
  const feedbackResult = renderFeedbackComponents(code, codeKey, previewState)
  if (feedbackResult) return feedbackResult

  // Try navigation components (Pagination)
  const navigationResult = renderNavigationComponents(code, codeKey, previewState)
  if (navigationResult) return navigationResult

  // Try layout components (Sidebar) - Header уже проверен выше
  const layoutResult = renderLayoutComponents(code, codeKey, previewState)
  if (layoutResult) return layoutResult

  // Default fallback
  return () => h('div', { class: 'preview-placeholder' }, 'Preview not available')
})
</script>

<style lang="scss" scoped>
.preview-renderer {
  width: 100%;

  :deep(.preview-buttons),
  :deep(.preview-inputs),
  :deep(.preview-radios),
  :deep(.preview-tags),
  :deep(.preview-avatars),
  :deep(.preview-modal-wrapper),
  :deep(.preview-drawer-wrapper),
  :deep(.preview-notification-wrapper),
  :deep(.preview-spinners) {
    display: flex;
    flex-wrap: wrap;
    gap: var(--eui-spacing-sm);
    align-items: center;
  }

  :deep(.playground) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--eui-spacing-md);
  }

  :deep(.playground__controls) {
    display: flex;
    gap: var(--eui-spacing-sm);
    flex-wrap: wrap;
    align-items: center;
  }

  :deep(.playground__example) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--eui-spacing-sm);
  }

  // Переопределяем fixed на sticky для playground контейнеров
  :deep(.playground__example) {
    .eui-header--fixed {
      position: sticky !important;
      top: 0;
      left: auto;
      right: auto;
    }
    
    .eui-sidebar--fixed {
      position: absolute !important;
      top: 0;
      left: 0;
      bottom: 0;
      right: auto;
    }
  }

  :deep(.preview-placeholder) {
    color: var(--eui-text-secondary);
    font-style: italic;
  }
}
</style>
