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
import HeaderStickyScrollDemo from '../../components/demos/Header/StickyScroll.vue'

const basicCode = `<template>
  <EuiHeader bordered>
    <template #left>
      <h2 style="margin: 0;">Logo</h2>
    </template>
    <template #right>
      <EuiButton>Login</EuiButton>
    </template>
  </EuiHeader>
</template>

<script setup>
import { Header as EuiHeader, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const fixedCode = `<template>
  <EuiHeader fixed bordered>
    <template #left>
      <h2 style="margin: 0;">Logo</h2>
    </template>
    <template #right>
      <EuiButton>Menu</EuiButton>
    </template>
  </EuiHeader>
  <div style="height: 200vh; padding: 20px;">
    Scroll to see fixed header
  </div>
</template>

<script setup>
import { Header as EuiHeader, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const navigationCode = `<template>
  <EuiHeader height="64px" bordered>
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
      <EuiButton type="outline">Sign In</EuiButton>
      <EuiButton type="primary">Sign Up</EuiButton>
    </template>
  </EuiHeader>
</template>

<script setup>
import { Header as EuiHeader, Button as EuiButton } from '@elivander/elix-ui'
<\/script>`

const searchCode = `<template>
  <EuiHeader bordered>
    <template #left>
      <h2 style="margin: 0;">Logo</h2>
    </template>
    <template #center>
      <EuiInput placeholder="Search..." style="width: 300px;" />
    </template>
    <template #right>
      <EuiButton>Profile</EuiButton>
    </template>
  </EuiHeader>
</template>

<script setup>
import { Header as EuiHeader, Button as EuiButton, Input as EuiInput } from '@elivander/elix-ui'
<\/script>`

const userMenuCode = `<template>
  <EuiHeader bordered>
    <template #left>
      <EuiAvatar>JD</EuiAvatar>
      <span style="margin-left: 10px;">John Doe</span>
    </template>
    <template #right>
      <EuiBadge :value="3">
        <EuiButton type="ghost">Notifications</EuiButton>
      </EuiBadge>
      <EuiButton type="ghost">Settings</EuiButton>
      <EuiButton type="outline">Logout</EuiButton>
    </template>
  </EuiHeader>
</template>

<script setup>
import { Header as EuiHeader, Button as EuiButton, Avatar as EuiAvatar, Badge as EuiBadge } from '@elivander/elix-ui'
<\/script>`

const stickyScrollCode = `<template>
  <div style="position: relative; height: 400px; overflow: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);">
    <EuiHeader sticky bordered>
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
        <EuiButton>Profile</EuiButton>
      </template>
    </EuiHeader>
    <div style="padding: 20px; height: 200vh;">
      <p>Scroll down to see the sticky header behavior. The header will remain at the top while scrolling.</p>
      <p style="margin-top: 100vh;">You've scrolled far down. The header is still visible at the top.</p>
    </div>
  </div>
</template>

<script setup>
import { Header as EuiHeader, Button as EuiButton } from '@elivander/elix-ui'
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
