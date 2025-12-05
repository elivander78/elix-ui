<template>
  <header class="docs-header">
    <div class="docs-header__content">
      <div class="docs-header__brand">
        <h1>@elix/ui</h1>
      </div>
      <div class="docs-header__theme-toggle">
        <button class="theme-toggle-btn" @click="toggleTheme" :title="theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'">
          <svg v-if="theme === 'light'" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 4.343L16.97 3.03M3.03 16.97L4.343 15.657M15.657 15.657L16.97 16.97M3.03 3.03L4.343 4.343M14 10A4 4 0 1 1 6 10a4 4 0 0 1 8 0Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a8.001 8.001 0 1 0 10.586 10.586Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTheme, getCurrentTheme } from '@elix/ui'

const { theme, setTheme } = useTheme()

const toggleTheme = () => {
  setTheme(theme.value === 'light' ? 'dark' : 'light')
}
</script>

<style lang="scss" scoped>
.docs-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--eui-bg-primary);
  border-bottom: 1px solid var(--eui-border-color);
  box-shadow: var(--eui-shadow-sm);

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--eui-spacing-md) var(--eui-spacing-xl);
  }

  &__brand {
    h1 {
      margin: 0;
      font-size: var(--eui-font-size-xl);
      font-weight: var(--eui-font-weight-bold);
      color: var(--eui-color-primary);
    }
  }

  &__theme-toggle {
    .theme-toggle-btn {
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

      &:hover {
        color: var(--eui-text-primary);
        background-color: var(--eui-bg-tertiary);
        border-color: var(--eui-border-color-hover);
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>

