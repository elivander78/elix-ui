<template>
  <div class="docs-page">
    <h1>Avatar</h1>
    <p>The Avatar component is used to display user profile pictures or initials.</p>

    <h2>Basic Usage</h2>
    <Playground :code="basicCode" />

    <h2>Photo</h2>
    <Playground :code="photoCode" />

    <h2>Letters</h2>
    <Playground :code="lettersCode" />

    <h2>Icon</h2>
    <Playground :code="iconCode" />

    <h2>Sizes</h2>
    <Playground :code="sizesCode" />

    <h2>Shapes</h2>
    <Playground :code="shapesCode" />

    <h2>API</h2>
    <ApiTable :props="avatarProps" :slots="avatarSlots" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'

const avatarProps = [
  { name: 'src', type: 'string', description: 'Image source URL' },
  { name: 'alt', type: 'string', description: 'Alt text for image' },
  { name: 'size', type: "number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size' },
  { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Avatar shape' },
  { name: 'status', type: "'online' | 'offline' | 'away' | 'busy'", description: 'Status indicator' },
  { name: 'statusPosition', type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", default: "'bottom-right'", description: 'Status indicator position' },
]

const avatarSlots = [
  { name: 'default', description: 'Avatar content (letters or icon)' },
]

const basicCode = `<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar>JD</Avatar>
    <Avatar src="https://i.pravatar.cc/150?img=1" />
    <Avatar src="https://i.pravatar.cc/150?img=2" shape="square" />
  </div>
</template>

<script setup>
import { Avatar } from '@elix/ui'
<\/script>`

const photoCode = `<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar src="https://i.pravatar.cc/150?img=1" />
    <Avatar src="https://i.pravatar.cc/150?img=2" />
    <Avatar src="https://i.pravatar.cc/150?img=3" />
  </div>
</template>

<script setup>
import { Avatar } from '@elix/ui'
<\/script>`

const lettersCode = `<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar>JD</Avatar>
    <Avatar>AB</Avatar>
    <Avatar>CD</Avatar>
  </div>
</template>

<script setup>
import { Avatar } from '@elix/ui'
<\/script>`

const iconCode = `<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar />
    <Avatar size="lg" />
  </div>
</template>

<script setup>
import { Avatar } from '@elix/ui'
<\/script>`

const sizesCode = `<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar size="xs">XS</Avatar>
    <Avatar size="sm">SM</Avatar>
    <Avatar size="md">MD</Avatar>
    <Avatar size="lg">LG</Avatar>
    <Avatar size="xl">XL</Avatar>
  </div>
</template>

<script setup>
import { Avatar } from '@elix/ui'
<\/script>`

const shapesCode = `<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <Avatar shape="circle">C</Avatar>
    <Avatar shape="square">S</Avatar>
    <Avatar src="https://i.pravatar.cc/150?img=1" shape="circle" />
    <Avatar src="https://i.pravatar.cc/150?img=2" shape="square" />
  </div>
</template>

<script setup>
import { Avatar } from '@elix/ui'
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

