# @elivander/elix-ui

Vue 3 UI component library with theming and responsive design.

## Installation

```bash
npm install @elivander/elix-ui
# or
pnpm add @elivander/elix-ui
# or
yarn add @elivander/elix-ui
```

## Usage

### Full Import

```typescript
import { createApp } from 'vue'
import { createUi, Button, Input } from '@elivander/elix-ui'
// ⚠️ IMPORTANT: Import styles (required)
import '@elivander/elix-ui/styles'

const app = createApp(App)
app.use(createUi({ theme: 'light' }))
```

**Note:** The styles import is mandatory. Without it, components will not have their default styling.

### Tree-shakeable Imports

```typescript
import { Button } from '@elivander/elix-ui/button'
import { Input } from '@elivander/elix-ui/input'
// Don't forget to import styles!
import '@elivander/elix-ui/styles'
```

## Components

- Button
- Input
- Card
- Select
- Modal
- Container
- Row
- Col

## Theming

The library uses CSS variables that can be customized:

```css
:root {
  --eui-color-primary: #1677ff;
  --eui-radius-md: 6px;
  /* ... */
}
```

## Documentation

See the [documentation site](../../apps/docs) for complete examples and API reference.

