<template>
  <div class="sidebar-demo" style="display: flex; flex-direction: column; height: 500px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); overflow: hidden;">
    <Header sticky bordered>
      <template #logo>
        <h2 style="margin: 0;">App Name</h2>
      </template>
      <template #right>
        <Button>Menu</Button>
      </template>
    </Header>
    <div style="display: flex; flex: 1; overflow: hidden;">
      <Sidebar sticky width="280px" bordered>
        <nav class="sidebar-nav">
          <ul class="sidebar-nav__list">
            <li class="sidebar-nav__item">
              <a href="#" class="sidebar-nav__link">
                <span class="sidebar-nav__icon">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10l7-7 7 7M5 10v7a1 1 0 001 1h3M15 10v7a1 1 0 01-1 1h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span>Home</span>
              </a>
            </li>
            <li class="sidebar-nav__item">
              <a href="#" class="sidebar-nav__link">
                <span class="sidebar-nav__icon">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                    <path d="M3 10h14M10 3v14" stroke="currentColor" stroke-width="2"/>
                  </svg>
                </span>
                <span>Dashboard</span>
              </a>
            </li>
            <li class="sidebar-nav__item">
              <a href="#" class="sidebar-nav__link">
                <span class="sidebar-nav__icon">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
                    <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </span>
                <span>Settings</span>
              </a>
            </li>
            <li class="sidebar-nav__item">
              <a href="#" class="sidebar-nav__link">
                <span class="sidebar-nav__icon">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                    <path d="M5 17c0-2.5 2.5-5 5-5s5 2.5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </span>
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </nav>
      </Sidebar>
      <main style="flex: 1; padding: 20px; overflow-y: auto;">
        <h3>Main Content</h3>
        <p>This is the main content area. When you scroll, only this area scrolls while the header and sidebar remain fixed.</p>
        <div style="height: 100vh;">
          <p>Scroll down to see that the sidebar stays in place.</p>
        </div>
        <p style="margin-top: 100vh;">You've scrolled far down. The header and sidebar are still visible.</p>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Header, Sidebar, Button } from '@elix/ui'
</script>

<style lang="scss" scoped>
.sidebar-demo {
  width: 100%;
}

.sidebar-nav__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav__item {
  margin-bottom: 4px;
}

.sidebar-nav__link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  color: var(--eui-text-primary);
  text-decoration: none;
  border-radius: var(--eui-radius-md);
  transition: all 0.2s ease;
  font-size: var(--eui-font-size-sm);
}

.sidebar-nav__link:hover {
  background-color: var(--eui-bg-tertiary);
  color: var(--eui-color-primary);
}

.sidebar-nav__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: currentColor;
}

.sidebar-nav__icon svg {
  width: 100%;
  height: 100%;
}
</style>

