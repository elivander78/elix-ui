<template>
  <div class="docs-page">
    <h1>Theming</h1>
    <p>@elix/ui uses CSS custom properties (CSS variables) for theming, allowing you to customize the appearance of components without modifying the library code. All design tokens are exposed as CSS variables with the <code>--eui-</code> prefix, making it easy to create custom themes or override specific values.</p>

    <h2>Design Tokens and CSS Variables</h2>
    <p>The library provides a comprehensive set of design tokens that control colors, spacing, typography, shadows, and border radius. All tokens are available as CSS variables:</p>
    <ul>
      <li><strong>Colors:</strong> <code>--eui-color-primary</code>, <code>--eui-color-success</code>, <code>--eui-color-warning</code>, <code>--eui-color-error</code>, <code>--eui-color-info</code>, and their variants (50-900)</li>
      <li><strong>Spacing:</strong> <code>--eui-spacing-xs</code>, <code>--eui-spacing-sm</code>, <code>--eui-spacing-md</code>, <code>--eui-spacing-lg</code>, <code>--eui-spacing-xl</code>, <code>--eui-spacing-2xl</code>, <code>--eui-spacing-3xl</code></li>
      <li><strong>Border Radius:</strong> <code>--eui-radius-xs</code>, <code>--eui-radius-sm</code>, <code>--eui-radius-md</code>, <code>--eui-radius-lg</code>, <code>--eui-radius-xl</code>, <code>--eui-radius-2xl</code>, <code>--eui-radius-full</code></li>
      <li><strong>Shadows:</strong> <code>--eui-shadow-sm</code>, <code>--eui-shadow-md</code>, <code>--eui-shadow-lg</code>, <code>--eui-shadow-xl</code>, <code>--eui-shadow-2xl</code></li>
      <li><strong>Typography:</strong> Font families, sizes, weights, and line heights</li>
      <li><strong>Backgrounds:</strong> <code>--eui-bg-primary</code>, <code>--eui-bg-secondary</code>, <code>--eui-bg-tertiary</code></li>
      <li><strong>Text Colors:</strong> <code>--eui-text-primary</code>, <code>--eui-text-secondary</code>, <code>--eui-text-tertiary</code></li>
      <li><strong>Borders:</strong> <code>--eui-border-color</code>, <code>--eui-border-color-hover</code>, <code>--eui-border-color-focus</code></li>
    </ul>

    <h2>Custom Theme Example</h2>
    <p>You can override CSS variables in your project to create a custom theme. Simply define the variables in your CSS:</p>
    <CodeBlock :code="customThemeCode" />

    <h2>Theme Modes</h2>
    <p>The library supports light and dark themes. You can set the initial theme when installing the plugin:</p>
    <CodeBlock :code="themeCode" />

    <h2>Runtime Theme Switching</h2>
    <p>You can switch themes at runtime by adding or removing theme classes on the <code>html</code> or <code>body</code> element. The library provides utilities to help with this. Try it out below:</p>
    <div class="theme-switcher-demo">
      <p>Current theme: <strong>{{ currentTheme }}</strong></p>
      <Button @click="handleToggle">
        Switch to {{ currentTheme === 'light' ? 'Dark' : 'Light' }} Theme
      </Button>
    </div>
    <p>Here's how to implement runtime theme switching using the <code>useTheme</code> composable:</p>
    <CodeBlock :code="useThemeCode" />
    <p>Or you can use the <code>applyTheme</code> utility function directly:</p>
    <CodeBlock :code="applyThemeCode" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CodeBlock from '../components/CodeBlock.vue'
import { Button } from '@elix/ui'
import { useTheme } from '@elix/ui'

const { theme, toggleTheme } = useTheme()
const currentTheme = ref(theme.value)

watch(theme, (newTheme) => {
  currentTheme.value = typeof newTheme === 'string' ? newTheme : 'light'
})

const handleToggle = () => {
  toggleTheme()
}

const customThemeCode = `:root {
  /* Override primary color */
  --eui-color-primary: #6366f1;
  --eui-color-primary-500: #6366f1;
  
  /* Override border radius */
  --eui-radius-md: 12px;
  --eui-radius-lg: 16px;
  
  /* Override shadows */
  --eui-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --eui-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  /* Override spacing */
  --eui-spacing-md: 16px;
  --eui-spacing-lg: 24px;
}`

const themeCode = `import { createApp } from 'vue'
import { createUi } from '@elix/ui'

const app = createApp(App)

// Light theme (default)
app.use(createUi({ theme: 'light' }))

// Dark theme
app.use(createUi({ theme: 'dark' }))`

const useThemeCode = `import { useTheme } from '@elix/ui'

const { theme, setTheme, toggleTheme } = useTheme()

// Toggle between light and dark
toggleTheme()

// Set specific theme
setTheme('dark')
setTheme('light')`

const applyThemeCode = `import { applyTheme } from '@elix/ui'

// Switch to dark theme
applyTheme('dark')

// Switch to light theme
applyTheme('light')

// Or manually manipulate the DOM
document.documentElement.classList.remove('theme-light', 'theme-dark')
document.documentElement.classList.add('theme-dark')`
</script>

<style lang="scss" scoped>
.docs-page {
  h1 {
    margin-bottom: var(--eui-spacing-lg);
  }

  h2 {
    margin-top: var(--eui-spacing-2xl);
    margin-bottom: var(--eui-spacing-md);
  }

  code {
    padding: 2px 6px;
    background-color: var(--eui-bg-secondary);
    border-radius: var(--eui-radius-sm);
    font-family: var(--eui-font-family-mono);
    font-size: 0.9em;
  }

  ul {
    padding-left: var(--eui-spacing-lg);
    
    li {
      margin-bottom: var(--eui-spacing-xs);
    }
  }

  .theme-switcher-demo {
    margin: var(--eui-spacing-lg) 0;
    padding: var(--eui-spacing-lg);
    background-color: var(--eui-bg-secondary);
    border: 1px solid var(--eui-border-color);
    border-radius: var(--eui-radius-md);
    display: flex;
    align-items: center;
    gap: var(--eui-spacing-md);
    flex-wrap: wrap;
  }
}
</style>

