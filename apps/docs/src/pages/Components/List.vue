<template>
  <div class="docs-page">
    <h1>List</h1>
    <p>Вертикальный список элементов для навигации, настроек и меню.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="ListBasicDemo" :code="basicCode" />

    <h2>With Description</h2>
    <Playground :demo-component="ListWithDescriptionDemo" :code="descriptionCode" />

    <h2>With Icon and Extra</h2>
    <Playground :demo-component="ListWithIconDemo" :code="iconCode" />

    <h2>API</h2>
    <ApiTable
      :props="listProps"
      :slots="listSlots"
      :events="listEvents"
    />
    <h3>ListItem</h3>
    <ApiTable
      :props="listItemProps"
      :slots="listItemSlots"
      :events="listItemEvents"
    />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import ListBasicDemo from '../../components/demos/ListBasicDemo.vue'
import ListWithDescriptionDemo from '../../components/demos/ListWithDescriptionDemo.vue'
import ListWithIconDemo from '../../components/demos/ListWithIconDemo.vue'

const listProps = [
  { name: 'bordered', type: 'boolean', default: 'false', description: 'Добавить границу вокруг списка' },
  { name: 'hoverable', type: 'boolean', default: 'false', description: 'Добавить hover эффект для всех элементов' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Размер элементов списка' },
  { name: 'appearance', type: "'border' | 'shadow' | 'border-shadow'", default: "'border'", description: 'Стиль контейнера списка' },
]

const listSlots = [
  { name: 'default', description: 'Содержимое списка (ListItem компоненты)' },
]

const listEvents = []

const listItemProps = [
  { name: 'title', type: 'string', default: '', description: 'Заголовок элемента' },
  { name: 'description', type: 'string', default: '', description: 'Описание элемента' },
  { name: 'icon', type: 'VNode', default: '', description: 'Иконка слева' },
  { name: 'extra', type: 'VNode', default: '', description: 'Дополнительный контент справа' },
  { name: 'clickable', type: 'boolean', default: 'false', description: 'Сделать элемент кликабельным (эмитит событие click)' },
]

const listItemSlots = [
  { name: 'default', description: 'Дополнительный контент элемента' },
  { name: 'icon', description: 'Иконка слева' },
  { name: 'title', description: 'Заголовок элемента' },
  { name: 'description', description: 'Описание элемента' },
  { name: 'extra', description: 'Дополнительный контент справа' },
]

const listItemEvents = [
  { name: 'click', payload: 'MouseEvent', description: 'Эмитится при клике на элемент (если clickable=true)' },
]

const basicCode = `<template>
  <List>
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
    <ListItem title="Item 3" />
  </List>
</template>`

const descriptionCode = `<template>
  <List>
    <ListItem title="Settings" description="Manage your account settings" />
    <ListItem title="Privacy" description="Control your privacy settings" />
  </List>
</template>`

const iconCode = `<template>
  <List>
    <ListItem title="Settings">
      <template #icon>
        <svg>...</svg>
      </template>
    </ListItem>
    <ListItem title="Notifications" clickable>
      <template #icon>...</template>
      <template #extra>
        <Badge>New</Badge>
      </template>
    </ListItem>
  </List>
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

  h3 {
    margin-top: var(--eui-spacing-xl);
    margin-bottom: var(--eui-spacing-md);
  }
}
</style>

