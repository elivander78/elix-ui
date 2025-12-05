<template>
  <div class="docs-page">
    <h1>Theming</h1>
    <p>@elix/ui supports theming through CSS variables that can be customized from your main project.</p>

    <h2>Theme Modes</h2>
    <p>The library supports light and dark themes:</p>
    <CodeBlock :code="themeCode" />

    <h2>Customizing Colors</h2>
    <p>You can override CSS variables in your project:</p>
    <CodeBlock :code="customColorsCode" />

    <h2>Available CSS Variables</h2>
    <p>All design tokens are available as CSS variables with the <code>--eui-</code> prefix:</p>
    <ul>
      <li><code>--eui-color-primary</code> - Primary color</li>
      <li><code>--eui-color-success</code> - Success color</li>
      <li><code>--eui-color-warning</code> - Warning color</li>
      <li><code>--eui-color-error</code> - Error color</li>
      <li><code>--eui-spacing-*</code> - Spacing tokens</li>
      <li><code>--eui-radius-*</code> - Border radius tokens</li>
      <li>And many more...</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '../components/CodeBlock.vue'

const themeCode = `import { createUi } from '@elix/ui'

// Light theme (default)
app.use(createUi({ theme: 'light' }))

// Dark theme
app.use(createUi({ theme: 'dark' }))`

const customColorsCode = `:root {
  --eui-color-primary: #your-color;
  --eui-color-primary-500: #your-color;
  --eui-radius-md: 8px;
}`
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
  }
}
</style>

