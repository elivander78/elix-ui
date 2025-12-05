<template>
  <div class="docs-page">
    <h1>Getting Started</h1>
    <p>@elix/ui is a modern Vue 3 UI component library built with TypeScript. It provides a comprehensive set of customizable components with built-in theming support, responsive design utilities, and a design system based on CSS custom properties.</p>

    <h2>Installation</h2>
    <p>Install @elix/ui using npm:</p>
    <CodeBlock code="npm i @elix/ui" />

    <h2>Basic Usage</h2>
    <p>Import and use the UI plugin in your Vue application. Add the plugin to your <code>main.ts</code>:</p>
    <CodeBlock :code="basicUsageCode" />

    <h2>Your First Component</h2>
    <p>Let's start with a simple Button component:</p>
    <Playground :code="buttonExampleCode" />

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
import Playground from '../components/Playground.vue'

const basicUsageCode = `import { createApp } from 'vue'
import App from './App.vue'
import { createUi } from '@elix/ui'

const app = createApp(App)
app.use(createUi())
app.mount('#app')`

const buttonExampleCode = `<template>
  <Button>Click me</Button>
</template>

<script setup>
import { Button } from '@elix/ui'
<\/script>`

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

