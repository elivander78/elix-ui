<template>
  <div class="header-demo" style="position: relative; height: 400px; overflow: auto; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md);">
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

<script setup lang="ts">
import { Header, Button } from '@elix/ui'
</script>

<style lang="scss" scoped>
.header-demo {
  width: 100%;
}
</style>

