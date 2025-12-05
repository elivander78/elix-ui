# @elix/ui

Vue 3 UI component library with theming and responsive design.

## Installation

```bash
npm install @elix/ui
# or
pnpm add @elix/ui
# or
yarn add @elix/ui
```

## Usage

### Full Import

```typescript
import { createApp } from 'vue'
import { createUi, Button, Input } from '@elix/ui'

const app = createApp(App)
app.use(createUi({ theme: 'light' }))
```

### Tree-shakeable Imports

```typescript
import { Button } from '@elix/ui/button'
import { Input } from '@elix/ui/input'
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

