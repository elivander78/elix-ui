<template>
  <div class="docs-page">
    <h1>Getting Started</h1>
    <p>Welcome to @elix/ui, a Vue 3 UI component library with theming and responsive design support.</p>

    <h2>Installation</h2>
    <CodeBlock code="npm install @elix/ui" />

    <h2>Basic Usage</h2>
    <p>Import and use the UI plugin in your Vue application:</p>
    <CodeBlock :code="basicUsageCode" />

    <h2>Importing Components</h2>
    <p>You can import components individually or use the full library:</p>
    <CodeBlock :code="importCode" />

    <h2>Next Steps</h2>
    <ul>
      <li>Learn about <router-link to="/theming">theming</router-link></li>
      <li>Explore <router-link to="/components/button">components</router-link></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CodeBlock from '../components/CodeBlock.vue'

const basicUsageCode = `import { createApp } from 'vue'
import App from './App.vue'
import { createUi } from '@elix/ui'

const app = createApp(App)
app.use(createUi({ theme: 'light' }))
app.mount('#app')`

const importCode = `// Import everything
import { Button, Input, Card } from '@elix/ui'

// Or import individually (tree-shakeable)
import { Button } from '@elix/ui/button'
import { Input } from '@elix/ui/input'`
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

  ul {
    padding-left: var(--eui-spacing-lg);
  }
}
</style>

