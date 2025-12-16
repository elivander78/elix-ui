# Правила проекта Elix UI

Этот документ описывает стандарты и принципы разработки компонентов в проекте Elix UI, основанные на примере компонента Modal.

## Структура компонента

### 1. Структура файлов компонента

Каждый компонент должен находиться в своей папке в `packages/ui/src/components/{ComponentName}/`:

```
ComponentName/
├── ComponentName.vue      # Основной компонент
├── index.ts              # Экспорт компонента и типов
├── useComponentName.ts   # Опционально: composable для логики компонента
├── types.ts              # Опционально: типы, если их много
└── ComponentName.test.ts # Опционально: тесты
```

**Пример (Modal):**
```
Modal/
├── Modal.vue
├── index.ts
└── useModal.ts
```

### 2. Основной файл компонента (ComponentName.vue)

#### Структура файла:
1. **Template** - разметка компонента
2. **Script setup** - логика компонента
3. **Style** - стили компонента

#### Правила:

- **Используйте `<script setup lang="ts">`** для TypeScript
- **Имя компонента**: обязательно используйте `defineOptions` с префиксом `Eui`:
  ```typescript
  defineOptions({
    name: 'EuiComponentName',
  })
  ```
  - Префикс: `Eui` (например, `EuiModal`, `EuiButton`, `EuiInput`)
  - Имя компонента в шаблоне: `<EuiModal>`, `<EuiButton>` или kebab-case: `<eui-modal>`, `<eui-button>`
- **Именование классов**: используйте префикс `eui-{component-name}` (например, `eui-modal`, `eui-modal__header`)
- **BEM методология**: 
  - Блок: `eui-modal`
  - Элемент: `eui-modal__header`
  - Модификатор: `eui-modal--centered`
- **Props**: используйте `withDefaults` для значений по умолчанию
- **Emits**: типизируйте события через `defineEmits<{...}>()`
- **Computed**: используйте для вычисляемых значений классов и стилей
- **Watchers**: используйте для побочных эффектов (например, блокировка скролла)

#### Пример структуры:

```vue
<template>
  <!-- Разметка компонента -->
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

defineOptions({
  name: 'EuiComponentName',
})

const props = withDefaults(defineProps<{
  // типизированные props
}>(), {
  // значения по умолчанию
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  // другие события
}>()

const componentClasses = computed(() => {
  return [
    'eui-component',
    {
      'eui-component--modifier': props.modifier,
    },
  ]
})
</script>

<style lang="scss" scoped>
.eui-component {
  // стили компонента
}
</style>
```

### 3. Файл экспорта (index.ts)

#### Обязательные элементы:

1. **Импорт компонента**
2. **Метод install** для плагина Vue (если нужен)
3. **Экспорт компонента**
4. **Экспорт типов** (если есть)
5. **Экспорт composables** (если есть)
6. **Default export** компонента

#### Пример:

```typescript
import ComponentName from './ComponentName.vue'
import { useComponentName } from './useComponentName'
import type { App } from 'vue'

ComponentName.install = (app: App) => {
  app.component(ComponentName.name, ComponentName)
}

export { ComponentName, useComponentName }
export type { ComponentNameProps } from './ComponentName'
export default ComponentName
```

### 4. Composable (useComponentName.ts)

Если компонент требует сложной логики или состояния, вынесите её в composable:

```typescript
import { ref } from 'vue'

export function useComponentName() {
  const visible = ref(false)

  const open = () => {
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  return {
    visible,
    open,
    close,
  }
}
```

## Структура документации

### 1. Структура demo файлов

Demo файлы должны быть организованы по компонентам в папках:

```
apps/docs/src/components/demos/
├── Modal/
│   ├── Basic.vue
│   ├── Closable.vue
│   ├── Size.vue
│   └── ...
├── Button/
│   ├── Basic.vue
│   ├── Sizes.vue
│   └── ...
└── ...
```

**Правила именования:**
- Папка: имя компонента (например, `Modal/`)
- Файл: описание функциональности (например, `Basic.vue`, `Closable.vue`, `Size.vue`)
- Избегайте префикса имени компонента в названии файла (не `ModalBasic.vue`, а `Basic.vue`)

### 2. Страница документации компонента

Файл: `apps/docs/src/pages/Components/{ComponentName}.vue`

#### Структура:

```vue
<template>
  <div class="docs-page">
    <h1>ComponentName</h1>
    <p>Краткое описание компонента.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="BasicDemo" :code="basicCode" />

    <h2>Feature Name</h2>
    <p>Описание фичи.</p>
    <Playground :demo-component="FeatureDemo" :code="featureCode" />

    <!-- Другие примеры -->
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import BasicDemo from '../../components/demos/ComponentName/Basic.vue'
import FeatureDemo from '../../components/demos/ComponentName/Feature.vue'

const basicCode = `<!-- Код примера -->`
const featureCode = `<!-- Код примера -->`
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
}
</style>
```

#### Правила:

- **Импорты demo**: из `../../components/demos/{ComponentName}/{DemoName}.vue`
- **Код примеров**: храните в константах с суффиксом `Code` (например, `basicCode`)
- **Используйте компоненты с префиксом Eui** в примерах кода: `<EuiButton>`, `<EuiModal>` и т.д.
- **Используйте Playground**: для отображения интерактивных примеров
- **Добавляйте описания**: перед каждым примером объясняйте, что он демонстрирует

#### Пример кода в константе:

```typescript
const basicCode = `<template>
  <EuiButton @click="handleClick">Click me</EuiButton>
  <EuiModal v-model="showModal" title="Modal Title">
    <p>Modal content</p>
  </EuiModal>
</template>

<script setup>
import { ref } from 'vue'
import { Button as EuiButton, Modal as EuiModal } from '@elivander/elix-ui'

const showModal = ref(false)
<\/script>`
```

**Важно**: Используйте алиасы при импорте (`Button as EuiButton`), потому что:
- Компоненты экспортируются из библиотеки без префикса (`Button`, `Modal`)
- Но зарегистрированы с префиксом `Eui` (`EuiButton`, `EuiModal`) через `defineOptions`
- Алиас позволяет использовать правильное имя компонента в шаблоне

### 3. Demo компонент

#### Структура demo файла:

```vue
<template>
  <div class="component-demo">
    <EuiButton @click="handleClick">Click me</EuiButton>
    <EuiModal v-model="showModal" title="Modal Title">
      <p>Modal content</p>
    </EuiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Modal } from '@elivander/elix-ui'

// Логика демо
</script>

<style lang="scss" scoped>
.component-demo {
  width: 100%;
}
</style>
```

#### Правила:

- **Используйте компоненты с префиксом Eui** в шаблонах: `<EuiButton>`, `<EuiModal>`, `<EuiInput>` и т.д.
- **Используйте алиасы при импорте**: `import { Button as EuiButton, Modal as EuiModal } from '@elivander/elix-ui'`
  - Это необходимо, потому что компоненты зарегистрированы с именем `EuiButton` (через `defineOptions`), а экспортируются как `Button`
  - Алиас позволяет использовать правильное имя компонента в шаблоне
- **Используйте scoped стили** для изоляции стилей
- **Импортируйте из `@elivander/elix-ui`** (не из относительных путей)
- **Название класса**: `{component-name}-demo` (например, `modal-demo`)
- **Минимальные стили**: только необходимые для демонстрации

## Стилизация

### 1. CSS переменные (Design Tokens)

Используйте CSS переменные из design tokens:

- `--eui-spacing-*` для отступов
- `--eui-color-*` для цветов
- `--eui-radius-*` для скруглений
- `--eui-shadow-*` для теней
- `--eui-font-*` для типографики

### 2. SCSS

- Используйте вложенность для организации стилей
- Используйте `&` для модификаторов и элементов
- Группируйте связанные стили вместе

### 3. Responsive

Используйте media queries для адаптивности:

```scss
@media (max-width: 768px) {
  // мобильные стили
}
```

## Экспорт компонента

### 1. Добавление в главный index.ts

В `packages/ui/src/index.ts` добавьте:

```typescript
export { ComponentName } from './components/ComponentName'
export type { ComponentNameProps } from './components/ComponentName'
```

Если есть composable:

```typescript
export { ComponentName, useComponentName } from './components/ComponentName'
```

## Тестирование

### 1. Unit тесты

- Размещайте тесты рядом с компонентом: `ComponentName.test.ts`
- Используйте Vitest для тестирования
- Тестируйте основные сценарии использования

## Общие принципы

1. **Консистентность**: следуйте существующим паттернам
2. **Типизация**: используйте TypeScript везде
3. **Документация**: добавляйте примеры для всех фич
4. **Доступность**: учитывайте a11y при разработке
5. **Производительность**: оптимизируйте рендеринг и обновления

## Префиксы компонентов

### Имя компонента

Все компоненты должны иметь префикс `Eui` в имени:

- **В коде**: `EuiModal`, `EuiButton`, `EuiInput`
- **В шаблонах**: можно использовать как `<EuiModal>`, так и `<eui-modal>` (Vue автоматически конвертирует)
- **В CSS классах**: `eui-modal`, `eui-button`, `eui-input` (kebab-case)

### Регистрация компонента

При регистрации компонента используйте только `component.name` (без fallback):

```typescript
ComponentName.install = (app: App) => {
  app.component(ComponentName.name, ComponentName)
}
```

Или для нескольких компонентов:

```typescript
const components = [Component1, Component2]

const install = (app: App) => {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}
```

## Чеклист для нового компонента

- [ ] Создана папка компонента в `packages/ui/src/components/{ComponentName}/`
- [ ] Создан основной файл `ComponentName.vue` с правильной структурой
- [ ] Добавлен `defineOptions({ name: 'Eui{ComponentName}' })` в компонент
- [ ] Создан `index.ts` с экспортами и правильной регистрацией
- [ ] Добавлен composable (если нужен)
- [ ] Добавлены типы TypeScript
- [ ] Использованы CSS переменные из design tokens
- [ ] Компонент добавлен в `packages/ui/src/index.ts`
- [ ] Создана папка demo в `apps/docs/src/components/demos/{ComponentName}/`
- [ ] Созданы demo файлы (минимум Basic.vue)
- [ ] Создана страница документации в `apps/docs/src/pages/Components/{ComponentName}.vue`
- [ ] Все импорты обновлены и работают

