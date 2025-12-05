<template>
  <div class="docs-page">
    <h1>Sidebar</h1>
    <p>The Sidebar component is used to display a navigation panel on the side of the page.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Collapsible Sidebar</h2>
    <Playground :code="collapsedCode" />

    <h2>Fixed Sidebar</h2>
    <Playground :code="fixedCode" />

    <h2>With Icons</h2>
    <Playground :code="iconsCode" />

    <h2>With Groups</h2>
    <Playground :code="groupsCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'

const basicCode = `<template>
  <div style="display: flex;">
    <Sidebar width="280px" bordered>
      <nav>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 12px; cursor: pointer;">Home</li>
          <li style="padding: 12px; cursor: pointer;">About</li>
          <li style="padding: 12px; cursor: pointer;">Services</li>
          <li style="padding: 12px; cursor: pointer;">Contact</li>
        </ul>
      </nav>
    </Sidebar>
    <main style="flex: 1; padding: 20px;">
      Main content
    </main>
  </div>
</template>

<script setup>
import { Sidebar } from '@elix/ui'
<\/script>`

const collapsedCode = `<template>
  <div style="display: flex;">
    <Sidebar :collapsed="collapsed" width="280px" collapsed-width="64px" bordered>
      <nav>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 12px; cursor: pointer;">Home</li>
          <li style="padding: 12px; cursor: pointer;">About</li>
          <li style="padding: 12px; cursor: pointer;">Contact</li>
        </ul>
      </nav>
    </Sidebar>
    <main style="flex: 1; padding: 20px;">
      <Button @click="collapsed = !collapsed">Toggle Sidebar</Button>
      <p>Main content</p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sidebar, Button } from '@elix/ui'

const collapsed = ref(false)
<\/script>`

const fixedCode = `<template>
  <div style="position: relative;">
    <Sidebar fixed width="280px" bordered>
      <nav>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 12px; cursor: pointer;">Home</li>
          <li style="padding: 12px; cursor: pointer;">About</li>
          <li style="padding: 12px; cursor: pointer;">Contact</li>
        </ul>
      </nav>
    </Sidebar>
    <main style="margin-left: 280px; padding: 20px;">
      Main content with fixed sidebar
    </main>
  </div>
</template>

<script setup>
import { Sidebar } from '@elix/ui'
<\/script>`

const iconsCode = `<template>
  <div style="display: flex;">
    <Sidebar width="280px" bordered>
      <nav>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
            <span>🏠</span>
            <span>Home</span>
          </li>
          <li style="padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
            <span>📊</span>
            <span>Dashboard</span>
          </li>
          <li style="padding: 12px; cursor: pointer; display: flex; align-items: center; gap: 10px;">
            <span>⚙️</span>
            <span>Settings</span>
          </li>
        </ul>
      </nav>
    </Sidebar>
    <main style="flex: 1; padding: 20px;">
      Main content
    </main>
  </div>
</template>

<script setup>
import { Sidebar } from '@elix/ui'
<\/script>`

const groupsCode = `<template>
  <div style="display: flex;">
    <Sidebar width="280px" bordered>
      <nav>
        <div style="padding: 12px; font-weight: bold; color: var(--eui-text-secondary);">Main</div>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 12px; cursor: pointer;">Home</li>
          <li style="padding: 12px; cursor: pointer;">Dashboard</li>
        </ul>
        <div style="padding: 12px; font-weight: bold; color: var(--eui-text-secondary); margin-top: 20px;">Settings</div>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 12px; cursor: pointer;">Profile</li>
          <li style="padding: 12px; cursor: pointer;">Preferences</li>
        </ul>
      </nav>
    </Sidebar>
    <main style="flex: 1; padding: 20px;">
      Main content
    </main>
  </div>
</template>

<script setup>
import { Sidebar } from '@elix/ui'
<\/script>`
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
