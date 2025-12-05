<template>
  <div class="docs-app">
    <div class="docs-content">
      <nav class="docs-nav">
        <div class="docs-nav__brand">
          <h1>@elivander/elix-ui</h1>
        </div>
        <ul class="docs-nav__menu">
          <template v-for="item in filteredMenuItems" :key="item.section || item.path">
            <li v-if="item.section" class="docs-nav__section-title">{{ item.section }}</li>
            <li v-else>
              <router-link :to="item.path">
                <span class="docs-nav__icon" v-html="getIcon(item.icon)"></span>
                <span>{{ item.label }}</span>
              </router-link>
            </li>
          </template>
          <li>
            <router-link to="/components/input">
              <span class="docs-nav__icon" v-html="getIcon('input')"></span>
              <span>Input</span>
            </router-link>
          </li>
          <li>
            <router-link to="/components/select">
              <span class="docs-nav__icon" v-html="getIcon('select')"></span>
              <span>Select</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="docs-right">
        <Container fluid class="docs-header-container">
          <Header sticky bordered>
            <template #center>
              <div class="docs-header__search">
                <Input
                  v-model="searchQuery"
                  placeholder="Search components..."
                  size="sm"
                  clearable
                  class="docs-header__search-input"
                >
                  <template #prefix>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM19 19l-4.35-4.35"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </template>
                </Input>
              </div>
            </template>
            <template #right>
              <div class="docs-header__actions">
                <a
                  href="https://github.com/elivander78/elix-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="docs-header__action-btn docs-header__action-btn--round"
                  title="View on GitHub"
                  aria-label="View source code on GitHub"
                >
                  <svg
                    height="20"
                    width="20"
                    viewBox="0 0 24 24"
                    version="1.1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <button
                  class="docs-header__action-btn docs-header__action-btn--round"
                  @click="toggleTheme"
                  :title="theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'"
                >
                  <svg
                    v-if="theme === 'light'"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 4.343L16.97 3.03M3.03 16.97L4.343 15.657M15.657 15.657L16.97 16.97M3.03 3.03L4.343 4.343M14 10A4 4 0 1 1 6 10a4 4 0 0 1 8 0Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    v-else
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </template>
          </Header>
        </Container>
        <main class="docs-main">
          <Container fluid class="docs-content-container">
            <router-view />
          </Container>
        </main>
      </div>
    </div>
    <Notification
      :notifications="notificationService.notifications.value"
      @remove="(id: string) => notificationService.remove(id)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import {
  useTheme,
  getCurrentTheme,
  Notification,
  useNotification,
  Header,
  Input,
  Container,
} from '@elivander/elix-ui'
import { useRouter } from 'vue-router'

const { theme, setTheme } = useTheme()
const notificationService = useNotification()
const router = useRouter()
const searchQuery = ref('')

type MenuItem = { path: string; label: string; icon: string } | { section: string }

const menuItems: MenuItem[] = [
  { path: '/', label: 'Getting Started', icon: 'home' },
  { path: '/theming', label: 'Theming', icon: 'palette' },
  { section: 'Form Components' },
  { path: '/components/button', label: 'Button', icon: 'button' },
  { path: '/components/input', label: 'Input', icon: 'input' },
  { path: '/components/select', label: 'Select', icon: 'select' },
  { path: '/components/checkbox', label: 'Checkbox', icon: 'checkbox' },
  { path: '/components/radio', label: 'Radio', icon: 'radio' },
  { path: '/components/switch', label: 'Switch', icon: 'switch' },
  { path: '/components/textarea', label: 'Textarea', icon: 'textarea' },
  { path: '/components/form', label: 'Form', icon: 'form' },
  { section: 'Overlay Components' },
  { path: '/components/modal', label: 'Modal', icon: 'modal' },
  { path: '/components/drawer', label: 'Drawer', icon: 'drawer' },
  { path: '/components/popover', label: 'Popover', icon: 'popover' },
  { path: '/components/tooltip', label: 'Tooltip', icon: 'tooltip' },
  { section: 'Data Display' },
  { path: '/components/card', label: 'Card', icon: 'card' },
  { path: '/components/table', label: 'Table', icon: 'table' },
  { path: '/components/badge', label: 'Badge', icon: 'badge' },
  { path: '/components/tag', label: 'Tag', icon: 'tag' },
  { path: '/components/avatar', label: 'Avatar', icon: 'avatar' },
  { path: '/components/divider', label: 'Divider', icon: 'divider' },
  { path: '/components/tabs', label: 'Tabs', icon: 'tabs' },
  { path: '/components/breadcrumbs', label: 'Breadcrumbs', icon: 'breadcrumbs' },
  { section: 'Feedback' },
  { path: '/components/notification', label: 'Notification', icon: 'notification' },
  { path: '/components/alert', label: 'Alert', icon: 'alert' },
  { path: '/components/skeleton', label: 'Skeleton', icon: 'skeleton' },
  { path: '/components/spinner', label: 'Spinner', icon: 'spinner' },
  { path: '/components/progress', label: 'Progress', icon: 'progress' },
  { section: 'Navigation' },
  { path: '/components/pagination', label: 'Pagination', icon: 'pagination' },
  { path: '/components/steps', label: 'Steps', icon: 'steps' },
  { path: '/components/dropdown', label: 'Dropdown', icon: 'dropdown' },
  { section: 'Data Entry' },
  { path: '/components/slider', label: 'Slider', icon: 'slider' },
  { path: '/components/upload', label: 'Upload', icon: 'upload' },
  { path: '/components/datepicker', label: 'DatePicker', icon: 'calendar' },
  { section: 'Data Display' },
  { path: '/components/collapse', label: 'Collapse', icon: 'collapse' },
  { section: 'Layout' },
  { path: '/components/header', label: 'Header', icon: 'header' },
  { path: '/components/sidebar', label: 'Sidebar', icon: 'sidebar' },
  { path: '/components/container', label: 'Container', icon: 'container' },
  { path: '/components/stack', label: 'Stack', icon: 'stack' },
]

const filteredMenuItems = computed(() => {
  if (!searchQuery.value.trim()) {
    return menuItems
  }

  const query = searchQuery.value.toLowerCase().trim()
  const filtered: MenuItem[] = []
  const addedSections = new Set<string>()

  menuItems.forEach((item, index) => {
    if ('section' in item) {
      // Проверяем, есть ли совпадения в этой секции
      let hasMatches = false
      for (let i = index + 1; i < menuItems.length; i++) {
        const nextItem = menuItems[i]
        if ('section' in nextItem) break
        if ('path' in nextItem && nextItem.label.toLowerCase().includes(query)) {
          hasMatches = true
          break
        }
      }

      if (hasMatches && !addedSections.has(item.section)) {
        filtered.push(item)
        addedSections.add(item.section)
      }
    } else if (item.label.toLowerCase().includes(query)) {
      // Находим секцию для этого элемента
      let section: string | null = null
      for (let i = index - 1; i >= 0; i--) {
        const prevItem = menuItems[i]
        if ('section' in prevItem) {
          section = prevItem.section
          break
        }
      }

      // Добавляем секцию, если её ещё нет
      if (section && !addedSections.has(section)) {
        filtered.push({ section })
        addedSections.add(section)
      }

      filtered.push(item)
    }
  })

  return filtered
})

const getIcon = (name: string): string => {
  const icons: Record<string, string> = {
    home: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10l7-7 7 7M5 10v7a1 1 0 001 1h3M15 10v7a1 1 0 01-1 1h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    palette:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13l3 3 7-7-7-7-3 3-4 4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3v14h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    button:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 10h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    input:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 10h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    select:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M15 7l-3 3-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    checkbox:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    radio:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="3" fill="currentColor"/></svg>',
    switch:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="16" height="8" rx="4" stroke="currentColor" stroke-width="2"/><circle cx="14" cy="10" r="3" fill="currentColor"/></svg>',
    textarea:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M6 8h8M6 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    form: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    modal:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M6 8h8M6 12h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    drawer:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 8h16" stroke="currentColor" stroke-width="2"/></svg>',
    popover:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L3 7v11h14V7l-7-5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="12" r="2" fill="currentColor"/></svg>',
    tooltip:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a8 8 0 100 16 8 8 0 000-16z" stroke="currentColor" stroke-width="2"/><path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    card: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 8h14" stroke="currentColor" stroke-width="2"/></svg>',
    table:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 10h14M10 3v14" stroke="currentColor" stroke-width="2"/></svg>',
    badge:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="4" fill="currentColor"/></svg>',
    tag: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7l7-4 7 4v10l-7 4-7-4V7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    avatar:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="2"/><path d="M5 17c0-2.5 2.5-5 5-5s5 2.5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    divider:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    tabs: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M2 8h16" stroke="currentColor" stroke-width="2"/></svg>',
    breadcrumbs:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10l7-7 7 7M3 17l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    notification:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6a5 5 0 00-10 0c0 7-3 9-3 9h16s-3-2-3-9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.73 18a2 2 0 01-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    alert:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6v4M10 14h.01M2 10a8 8 0 1116 0 8 8 0 01-16 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    skeleton:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2" stroke-dasharray="2 2"/></svg>',
    spinner:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round"/></svg>',
    progress:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="8" width="16" height="4" rx="2" stroke="currentColor" stroke-width="2"/><rect x="2" y="8" width="10" height="4" rx="2" fill="currentColor"/></svg>',
    pagination:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5l-5 5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 5l-5 5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    steps:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="6" cy="5" r="1.5" fill="currentColor"/><circle cx="6" cy="10" r="1.5" fill="currentColor"/><circle cx="6" cy="15" r="1.5" fill="currentColor"/></svg>',
    dropdown:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    slider:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="7" cy="10" r="3" fill="currentColor"/></svg>',
    upload:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3v14M3 10l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    calendar:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 8h14M7 2v4M13 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    collapse:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    header:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="16" height="4" rx="1" stroke="currentColor" stroke-width="2"/><path d="M2 7h16" stroke="currentColor" stroke-width="2"/></svg>',
    sidebar:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="6" height="14" rx="1" stroke="currentColor" stroke-width="2"/><path d="M2 7h6" stroke="currentColor" stroke-width="2"/></svg>',
    container:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/></svg>',
    stack:
      '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="14" height="4" rx="1" stroke="currentColor" stroke-width="2"/><rect x="3" y="9" width="14" height="4" rx="1" stroke="currentColor" stroke-width="2"/><rect x="3" y="15" width="14" height="4" rx="1" stroke="currentColor" stroke-width="2"/></svg>',
  }
  return (
    icons[name] ||
    '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/></svg>'
  )
}

const toggleTheme = () => {
  setTheme(theme.value === 'light' ? 'dark' : 'light')
}

onMounted(() => {
  // Detect system theme preference if no theme is set
  if (
    !document.documentElement.classList.contains('theme-light') &&
    !document.documentElement.classList.contains('theme-dark')
  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  } else {
    const current = getCurrentTheme()
    setTheme(current)
  }
})
</script>

<style lang="scss" scoped>
.docs-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.docs-content {
  display: flex;
  flex: 1;
  min-height: 100vh;
  min-width: 0;
  max-width: 100%;
  overflow-x: hidden;
}

.docs-nav {
  position: fixed;
  top: 0;
  left: 0;
  align-self: flex-start;
  width: 280px;
  min-width: 280px;
  max-width: 280px;
  flex-shrink: 0;
  height: 100vh;
  padding: var(--eui-spacing-lg);
  background-color: var(--eui-bg-secondary);
  border-right: 1px solid var(--eui-border-color);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  scrollbar-width: thin;
  scrollbar-color: var(--eui-color-neutral-300) transparent;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--eui-color-neutral-300);
    border-radius: var(--eui-radius-full);

    &:hover {
      background-color: var(--eui-color-neutral-400);
    }
  }

  &__brand {
    margin-bottom: var(--eui-spacing-lg);
    padding-bottom: var(--eui-spacing-md);
    border-bottom: 1px solid var(--eui-border-color);

    h1 {
      margin: 0;
      font-size: var(--eui-font-size-xl);
      font-weight: var(--eui-font-weight-bold);
      color: var(--eui-color-primary);
    }
  }

  &__menu {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 4px;

      a {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 14px;
        color: var(--eui-text-primary);
        text-decoration: none;
        border-radius: var(--eui-radius-md);
        transition: background-color 0.2s ease, color 0.2s ease;
        font-size: var(--eui-font-size-sm);
        font-weight: var(--eui-font-weight-normal);
        position: relative;
        min-height: 38px;
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 0;
          background-color: var(--eui-color-primary);
          border-radius: 0 2px 2px 0;
          transition: height 0.2s ease;
        }

        &:hover {
          background-color: var(--eui-bg-tertiary);
          color: var(--eui-color-primary);
        }

        &.router-link-active {
          color: var(--eui-color-primary);
          background-color: var(--eui-bg-hover-primary);
          font-weight: var(--eui-font-weight-normal);

          &::before {
            height: 20px;
          }
        }

        span:last-child {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    color: currentColor;
    transition: transform 0.2s ease;

    :deep(svg) {
      width: 100%;
      height: 100%;
    }
  }

  &__menu li a:hover &__icon {
    transform: scale(1.1);
  }

  &__menu li a.router-link-active &__icon {
    transform: scale(1.05);
  }

  &__section-title {
    margin-top: var(--eui-spacing-xl);
    margin-bottom: var(--eui-spacing-sm);
    padding-left: var(--eui-spacing-md);
    font-weight: var(--eui-font-weight-bold);
    color: var(--eui-text-secondary);
    font-size: var(--eui-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    list-style: none;
  }
}

.docs-right {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  min-width: 0;
  max-width: 100%;
  margin-left: 280px;

  // Remove padding from Header content since Container provides it
  :deep(.eui-container .eui-header__content) {
    padding-left: 0;
    padding-right: 0;
  }
}

.docs-header-container,
.docs-content-container {
  padding-left: var(--eui-spacing-2xl);
  padding-right: var(--eui-spacing-2xl);
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding-left: var(--eui-spacing-md);
    padding-right: var(--eui-spacing-md);
  }
}

.docs-main {
  flex: 1;
  padding: var(--eui-spacing-2xl) 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--eui-bg-primary);

  // Improve code block styling
  :deep(pre) {
    background-color: var(--eui-bg-secondary);
    border-radius: var(--eui-radius-lg);
    padding: var(--eui-spacing-lg);
    overflow-x: auto;
    border: 1px solid var(--eui-border-color);
  }

  :deep(code) {
    font-family: var(--eui-font-family-mono);
    font-size: var(--eui-font-size-sm);
  }
}

.docs-header__search {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

.docs-header__search-input {
  width: 100%;
}

.docs-header__actions {
  display: flex;
  align-items: center;
  gap: var(--eui-spacing-sm);
}

.docs-header__action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  color: var(--eui-text-secondary);
  background: transparent;
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-md);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-tertiary);
    border-color: var(--eui-border-color-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
  }

  &.docs-header__action-btn--round {
    border-radius: 50% !important;
  }
}
</style>
