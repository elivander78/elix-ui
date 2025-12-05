<template>
  <div class="docs-app">
    <DocsHeader />
    <div class="docs-content">
      <nav class="docs-nav">
        <div class="docs-nav__brand">
          <h1>@elix/ui</h1>
        </div>
        <ul class="docs-nav__menu">
          <li><router-link to="/">Getting Started</router-link></li>
          <li><router-link to="/theming">Theming</router-link></li>
          
          <li class="docs-nav__section-title">Form Components</li>
          <li><router-link to="/components/button">Button</router-link></li>
          <li><router-link to="/components/input">Input</router-link></li>
          <li><router-link to="/components/select">Select</router-link></li>
          <li><router-link to="/components/checkbox">Checkbox</router-link></li>
          <li><router-link to="/components/radio">Radio</router-link></li>
          <li><router-link to="/components/switch">Switch</router-link></li>
          <li><router-link to="/components/textarea">Textarea</router-link></li>
          <li><router-link to="/components/form">Form</router-link></li>

          <li class="docs-nav__section-title">Overlay Components</li>
          <li><router-link to="/components/modal">Modal</router-link></li>
          <li><router-link to="/components/drawer">Drawer</router-link></li>
          <li><router-link to="/components/popover">Popover</router-link></li>
          <li><router-link to="/components/tooltip">Tooltip</router-link></li>

          <li class="docs-nav__section-title">Data Display</li>
          <li><router-link to="/components/card">Card</router-link></li>
          <li><router-link to="/components/table">Table</router-link></li>
          <li><router-link to="/components/badge">Badge</router-link></li>
          <li><router-link to="/components/tag">Tag</router-link></li>
          <li><router-link to="/components/avatar">Avatar</router-link></li>
          <li><router-link to="/components/divider">Divider</router-link></li>
          <li><router-link to="/components/tabs">Tabs</router-link></li>
          <li><router-link to="/components/breadcrumbs">Breadcrumbs</router-link></li>

          <li class="docs-nav__section-title">Feedback</li>
          <li><router-link to="/components/notification">Notification</router-link></li>
          <li><router-link to="/components/skeleton">Skeleton</router-link></li>
          <li><router-link to="/components/spinner">Spinner</router-link></li>
          <li><router-link to="/components/progress">Progress</router-link></li>

          <li class="docs-nav__section-title">Navigation</li>
          <li><router-link to="/components/pagination">Pagination</router-link></li>

          <li class="docs-nav__section-title">Layout</li>
          <li><router-link to="/components/header">Header</router-link></li>
          <li><router-link to="/components/sidebar">Sidebar</router-link></li>
        </ul>
      </nav>
      <main class="docs-main">
        <router-view />
      </main>
    </div>
    <Notification :notifications="notificationService.notifications.value" @remove="(id: string) => notificationService.remove(id)" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme, getCurrentTheme, Notification, useNotification } from '@elix/ui'
import DocsHeader from './components/DocsHeader.vue'

const { theme, setTheme } = useTheme()
const notificationService = useNotification()

onMounted(() => {
  // Detect system theme preference if no theme is set
  if (!document.documentElement.classList.contains('theme-light') && !document.documentElement.classList.contains('theme-dark')) {
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
}

.docs-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.docs-nav {
  width: 280px;
  padding: var(--eui-spacing-lg);
  background-color: var(--eui-bg-secondary);
  border-right: 1px solid var(--eui-border-color);
  overflow-y: auto;
  flex-shrink: 0;


  &__menu {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: var(--eui-spacing-xs);

      a {
        display: block;
        padding: var(--eui-spacing-sm);
        color: var(--eui-text-primary);
        text-decoration: none;
        border-radius: var(--eui-radius-md);
        transition: background-color 0.2s ease-in-out;

        &:hover {
          background-color: var(--eui-bg-tertiary);
        }

        &.router-link-active {
          color: var(--eui-color-primary);
          background-color: var(--eui-color-primary-50);
        }
      }
    }

    &__section-title {
      margin-top: var(--eui-spacing-md);
      margin-bottom: var(--eui-spacing-sm);
      padding: var(--eui-spacing-sm);
      font-weight: var(--eui-font-weight-semibold);
      color: var(--eui-text-secondary);
      font-size: var(--eui-font-size-sm);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      list-style: none;
    }
  }
}

.docs-main {
  flex: 1;
  padding: var(--eui-spacing-2xl);
  max-width: 1200px;
  overflow-y: auto;
}

.docs-app {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>

