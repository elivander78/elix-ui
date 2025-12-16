<template>
  <div class="docs-page">
    <h1>Result</h1>
    <p>Компонент для отображения результатов операций (успех, ошибка, 404, 500).</p>

    <h2>Success</h2>
    <Playground :demo-component="ResultSuccessDemo" :code="successCode" />

    <h2>Error</h2>
    <Playground :demo-component="ResultErrorDemo" :code="errorCode" />

    <h2>404</h2>
    <Playground :demo-component="Result404Demo" :code="notFoundCode" />

    <h2>API</h2>
    <ApiTable
      :props="resultProps"
      :slots="resultSlots"
      :events="resultEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import ResultSuccessDemo from '../../components/demos/Result/Success.vue'
import ResultErrorDemo from '../../components/demos/Result/Error.vue'
import Result404Demo from '../../components/demos/Result/404.vue'

const resultProps = [
  { name: 'status', type: "'success' | 'error' | 'info' | 'warning' | '404' | '500'", default: '', description: 'Статус результата (required)' },
  { name: 'title', type: 'string', default: '', description: 'Заголовок (required)' },
  { name: 'description', type: 'string', default: '', description: 'Описание' },
  { name: 'icon', type: 'VNode', default: '', description: 'Кастомная иконка' },
  { name: 'extra', type: 'VNode', default: '', description: 'Дополнительный контент (кнопки действий)' },
]

const resultSlots = [
  { name: 'default', description: 'Дополнительный контент' },
  { name: 'icon', description: 'Кастомная иконка' },
  { name: 'description', description: 'Кастомное описание' },
  { name: 'extra', description: 'Дополнительный контент (кнопки действий)' },
]

const resultEvents = []

const successCode = `<template>
  <EuiResult
    status="success"
    title="Success"
    description="Your operation has been completed successfully."
  >
    <template #extra>
      <EuiButton>Go Home</EuiButton>
    </template>
  </EuiResult>
</template>`

const errorCode = `<template>
  <EuiResult
    status="error"
    title="Error"
    description="Something went wrong."
  />
</template>`

const notFoundCode = `<template>
  <EuiResult
    status="404"
    title="404"
    description="The page you are looking for does not exist."
  />
</template>`
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

