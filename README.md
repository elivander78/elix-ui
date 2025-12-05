# @elivander/elix-ui

Vue 3 UI Kit with theming and responsive design support.

## Features

- 🎨 **Theming**: Light and dark themes with CSS variables
- 📱 **Responsive**: Mobile-first design with breakpoint utilities
- 🌲 **Tree-shakeable**: Import only what you need
- 📦 **TypeScript**: Full TypeScript support
- 🎯 **Vue 3**: Built for Vue 3 with Composition API

## Installation

```bash
pnpm install @elivander/elix-ui
```

## Quick Start

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { createUi } from '@elivander/elix-ui'

const app = createApp(App)
app.use(createUi({ theme: 'light' }))
app.mount('#app')
```

## Usage

```vue
<template>
  <Button type="primary" size="md">Click me</Button>
  <Input v-model="value" placeholder="Enter text" />
</template>

<script setup>
import { Button, Input } from '@elivander/elix-ui'
import { ref } from 'vue'

const value = ref('')
</script>
```

## Development

This is a monorepo using pnpm workspaces.

```bash
# Install dependencies
pnpm install

# Run documentation
pnpm dev:docs

# Build UI kit
pnpm build

# Run tests
pnpm test
```

## Project Structure

```
ui-kit/
├── packages/
│   └── ui/          # UI Kit package
├── apps/
│   └── docs/        # Documentation site
└── package.json      # Root workspace config
```

## License

MIT

