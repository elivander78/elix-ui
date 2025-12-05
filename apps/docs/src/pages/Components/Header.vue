<template>
  <div class="docs-page">
    <h1>Header</h1>
    <p>The Header component is used to display a navigation bar at the top of the page.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Fixed Header</h2>
    <Playground :code="fixedCode" />

    <h2>With Navigation</h2>
    <Playground :code="navigationCode" />

    <h2>With Search</h2>
    <Playground :code="searchCode" />

    <h2>With User Menu</h2>
    <Playground :code="userMenuCode" />

    <h2>Sticky Header with Scroll</h2>
    <Playground :demo-component="HeaderStickyScrollDemo" :code="stickyScrollCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import HeaderStickyScrollDemo from '../../components/demos/HeaderStickyScrollDemo.vue'

const basicCode = `<template>
  <Header bordered>
    <template #left>
      <h2 style="margin: 0;">Logo</h2>
    </template>
    <template #right>
      <Button>Login</Button>
    </template>
  </Header>
</template>

<script setup>
import { Header, Button } from '@elivander/elix-ui'
<\/script>`

const fixedCode = `<template>
  <Header fixed bordered>
    <template #left>
      <h2 style="margin: 0;">Logo</h2>
    </template>
    <template #right>
      <Button>Menu</Button>
    </template>
  </Header>
  <div style="height: 200vh; padding: 20px;">
    Scroll to see fixed header
  </div>
</template>

<script setup>
import { Header, Button } from '@elivander/elix-ui'
<\/script>`

const navigationCode = `<template>
  <Header height="64px" bordered>
    <template #left>
      <h2 style="margin: 0;">Company</h2>
    </template>
    <template #center>
      <nav style="display: flex; gap: 20px;">
        <a href="#" style="text-decoration: none; color: inherit;">Home</a>
        <a href="#" style="text-decoration: none; color: inherit;">About</a>
        <a href="#" style="text-decoration: none; color: inherit;">Services</a>
        <a href="#" style="text-decoration: none; color: inherit;">Contact</a>
      </nav>
    </template>
    <template #right>
      <Button type="outline">Sign In</Button>
      <Button type="primary">Sign Up</Button>
    </template>
  </Header>
</template>

<script setup>
import { Header, Button } from '@elivander/elix-ui'
<\/script>`

const searchCode = `<template>
  <Header bordered>
    <template #left>
      <h2 style="margin: 0;">Logo</h2>
    </template>
    <template #center>
      <Input placeholder="Search..." style="width: 300px;" />
    </template>
    <template #right>
      <Button>Profile</Button>
    </template>
  </Header>
</template>

<script setup>
import { Header, Button, Input } from '@elivander/elix-ui'
<\/script>`

const userMenuCode = `<template>
  <Header bordered>
    <template #left>
      <Avatar>JD</Avatar>
      <span style="margin-left: 10px;">John Doe</span>
    </template>
    <template #right>
      <Badge :value="3">
        <Button type="ghost">Notifications</Button>
      </Badge>
      <Button type="ghost">Settings</Button>
      <Button type="outline">Logout</Button>
    </template>
  </Header>
</template>

<script setup>
import { Header, Button, Avatar, Badge } from '@elivander/elix-ui'
<\/script>`

const stickyScrollCode = `<template>
  <div style="position: relative; height: 400px; overflow: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);">
    <Header sticky bordered>
      <template #logo>
        <h2 style="margin: 0;">Logo</h2>
      </template>
      <template #center>
        <nav style="display: flex; gap: 20px;">
          <a href="#" style="text-decoration: none; color: inherit;">Home</a>
          <a href="#" style="text-decoration: none; color: inherit;">About</a>
          <a href="#" style="text-decoration: none; color: inherit;">Contact</a>
        </nav>
      </template>
      <template #right>
        <Button>Profile</Button>
      </template>
    </Header>
    <div style="padding: 20px; height: 200vh;">
      <p>Scroll down to see the sticky header behavior. The header will remain at the top while scrolling.</p>
      <p style="margin-top: 100vh;">You've scrolled far down. The header is still visible at the top.</p>
    </div>
  </div>
</template>

<script setup>
import { Header, Button } from '@elivander/elix-ui'
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
