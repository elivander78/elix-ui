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

    <h2>Header + Sidebar + Content Layout</h2>
    <Playground :demo-component="SidebarLayoutDemo" :code="layoutCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import SidebarLayoutDemo from '../../components/demos/Sidebar/Layout.vue'

const basicCode = `<template>
  <div style="display: flex;">
    <EuiSidebar width="280px" bordered>
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
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" stroke="currentColor" stroke-width="2"/>
                  <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </span>
              <span>About</span>
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
              <span>Services</span>
            </a>
          </li>
          <li class="sidebar-nav__item">
            <a href="#" class="sidebar-nav__link">
              <span class="sidebar-nav__icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3l7 7 7-7M3 17l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span>Contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </EuiSidebar>
    <main style="flex: 1; padding: 20px;">
      Main content
    </main>
  </div>
</template>

<script setup>
import { Sidebar as EuiSidebar } from '@elivander/elix-ui'
<\/script>

<style scoped>
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
<\/style>`

const collapsedCode = `<template>
  <div style="display: flex;">
    <EuiSidebar :collapsed="collapsed" width="280px" collapsed-width="64px" bordered>
      <nav class="sidebar-nav">
        <ul class="sidebar-nav__list">
          <li class="sidebar-nav__item">
            <a href="#" class="sidebar-nav__link" :title="collapsed ? 'Home' : ''">
              <span class="sidebar-nav__icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10l7-7 7 7M5 10v7a1 1 0 001 1h3M15 10v7a1 1 0 01-1 1h-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span v-if="!collapsed">Home</span>
            </a>
          </li>
          <li class="sidebar-nav__item">
            <a href="#" class="sidebar-nav__link" :title="collapsed ? 'About' : ''">
              <span class="sidebar-nav__icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" stroke="currentColor" stroke-width="2"/>
                  <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </span>
              <span v-if="!collapsed">About</span>
            </a>
          </li>
          <li class="sidebar-nav__item">
            <a href="#" class="sidebar-nav__link" :title="collapsed ? 'Contact' : ''">
              <span class="sidebar-nav__icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3l7 7 7-7M3 17l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span v-if="!collapsed">Contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </EuiSidebar>
    <main style="flex: 1; padding: 20px;">
      <EuiButton @click="collapsed = !collapsed">Toggle Sidebar</EuiButton>
      <p>Main content</p>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Sidebar as EuiSidebar, Button as EuiButton } from '@elivander/elix-ui'

const collapsed = ref(false)
<\/script>

<style scoped>
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
  justify-content: center;
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
<\/style>`

const fixedCode = `<template>
  <div style="position: relative;">
    <EuiSidebar fixed width="280px" bordered>
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
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" stroke="currentColor" stroke-width="2"/>
                  <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </span>
              <span>About</span>
            </a>
          </li>
          <li class="sidebar-nav__item">
            <a href="#" class="sidebar-nav__link">
              <span class="sidebar-nav__icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3l7 7 7-7M3 17l7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span>Contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </EuiSidebar>
    <main style="margin-left: 280px; padding: 20px;">
      Main content with fixed sidebar
    </main>
  </div>
</template>

<script setup>
import { Sidebar as EuiSidebar } from '@elivander/elix-ui'
<\/script>

<style scoped>
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
<\/style>`

const iconsCode = `<template>
  <div style="display: flex;">
    <EuiSidebar width="280px" bordered>
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
        </ul>
      </nav>
    </EuiSidebar>
    <main style="flex: 1; padding: 20px;">
      Main content
    </main>
  </div>
</template>

<script setup>
import { Sidebar as EuiSidebar } from '@elivander/elix-ui'
<\/script>

<style scoped>
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
<\/style>`

const groupsCode = `<template>
  <div style="display: flex;">
    <EuiSidebar width="280px" bordered>
      <nav class="sidebar-nav">
        <div class="sidebar-nav__group-title">Main</div>
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
        </ul>
        <div class="sidebar-nav__group-title">Settings</div>
        <ul class="sidebar-nav__list">
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
          <li class="sidebar-nav__item">
            <a href="#" class="sidebar-nav__link">
              <span class="sidebar-nav__icon">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
                  <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </span>
              <span>Preferences</span>
            </a>
          </li>
        </ul>
      </nav>
    </EuiSidebar>
    <main style="flex: 1; padding: 20px;">
      Main content
    </main>
  </div>
</template>

<script setup>
import { Sidebar as EuiSidebar } from '@elivander/elix-ui'
<\/script>

<style scoped>
.sidebar-nav__group-title {
  padding: 12px 14px;
  font-weight: var(--eui-font-weight-bold);
  color: var(--eui-text-secondary);
  font-size: var(--eui-font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 20px;
}

.sidebar-nav__group-title:first-child {
  margin-top: 0;
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
<\/style>`

const layoutCode = `<template>
  <div style="display: flex; flex-direction: column; height: 500px; border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); overflow: hidden;">
    <EuiHeader sticky bordered>
      <template #logo>
        <h2 style="margin: 0;">App Name</h2>
      </template>
      <template #right>
        <EuiButton>Menu</EuiButton>
      </template>
    </EuiHeader>
    <div style="display: flex; flex: 1; overflow: hidden;">
      <EuiSidebar sticky width="280px" bordered>
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
      </EuiSidebar>
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

<script setup>
import { Header as EuiHeader, Sidebar as EuiSidebar, Button as EuiButton } from '@elivander/elix-ui'
<\/script>

<style scoped>
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
<\/style>`
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
