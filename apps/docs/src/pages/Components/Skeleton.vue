<template>
  <div class="docs-page">
    <h1>Skeleton</h1>
    <p>The Skeleton component is used to show a loading placeholder.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="SkeletonBasicDemo" :code="basicCode" />

    <h2>With Avatar</h2>
    <Playground :demo-component="SkeletonAvatarDemo" :code="avatarCode" />

    <h2>Different Rows</h2>
    <Playground :demo-component="SkeletonRowsDemo" :code="rowsCode" />

    <h2>Animated</h2>
    <Playground :demo-component="SkeletonAnimatedDemo" :code="animatedCode" />

    <h2>Card Example</h2>
    <Playground :demo-component="SkeletonCardDemo" :code="cardCode" />

    <h2>Table Example</h2>
    <Playground :demo-component="SkeletonTableDemo" :code="tableCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import SkeletonBasicDemo from '../../components/demos/SkeletonBasicDemo.vue'
import SkeletonAvatarDemo from '../../components/demos/SkeletonAvatarDemo.vue'
import SkeletonRowsDemo from '../../components/demos/SkeletonRowsDemo.vue'
import SkeletonAnimatedDemo from '../../components/demos/SkeletonAnimatedDemo.vue'
import SkeletonCardDemo from '../../components/demos/SkeletonCardDemo.vue'
import SkeletonTableDemo from '../../components/demos/SkeletonTableDemo.vue'

const basicCode = `<template>
  <Skeleton :loading="loading" :rows="3" type="text">
    <div>Content loaded</div>
  </Skeleton>
</template>

<script setup>
import { ref } from 'vue'
import { Skeleton, Button } from '@elivander/elix-ui'

const loading = ref(true)
<\/script>`

const avatarCode = `<template>
  <div>
    <Skeleton :loading="loading" type="avatar" :rows="3">
      <div>Content with avatar loaded</div>
    </Skeleton>
    <Button @click="loading = !loading" style="margin-top: 20px;">Toggle Loading</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Skeleton, Button } from '@elivander/elix-ui'

const loading = ref(true)
<\/script>`

const rowsCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <Skeleton :loading="true" :rows="1" type="text" />
    <Skeleton :loading="true" :rows="3" type="text" />
    <Skeleton :loading="true" :rows="5" type="text" />
  </div>
</template>

<script setup>
import { Skeleton } from '@elivander/elix-ui'
<\/script>`

const animatedCode = `<template>
  <div>
    <Skeleton :loading="loading" type="avatar" :rows="3" :animated="true">
      <div>Animated skeleton content</div>
    </Skeleton>
    <Button @click="loading = !loading" style="margin-top: 20px;">Toggle Loading</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Skeleton, Button } from '@elivander/elix-ui'

const loading = ref(true)
<\/script>`

const cardCode = `<template>
  <div style="max-width: 400px;">
    <Card>
      <Skeleton :loading="loading" type="avatar" :rows="3" :animated="true">
        <div style="display: flex; gap: 16px;">
          <Avatar>JD</Avatar>
          <div>
            <h3 style="margin: 0 0 8px 0;">John Doe</h3>
            <p style="margin: 0; color: var(--eui-text-secondary);">Software Developer</p>
            <p style="margin: 8px 0 0 0;">This is some content that appears when loading is false.</p>
          </div>
        </div>
      </Skeleton>
      <Button @click="loading = !loading" style="margin-top: 16px;">Toggle Loading</Button>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Skeleton, Card, Avatar, Button } from '@elivander/elix-ui'

const loading = ref(true)
<\/script>`

const tableCode = `<template>
  <div>
    <div style="display: flex; gap: 10px; margin-bottom: 16px;">
      <Button @click="loading = !loading">Toggle Loading</Button>
    </div>
    <div style="border: 1px solid var(--eui-border-color); border-radius: var(--eui-radius-md); overflow: hidden;">
      <Skeleton :loading="loading" :rows="5" :animated="true">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: var(--eui-bg-secondary);">
              <th style="padding: 12px; text-align: left;">Name</th>
              <th style="padding: 12px; text-align: left;">Email</th>
              <th style="padding: 12px; text-align: left;">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding: 12px;">John Doe</td><td style="padding: 12px;">john@example.com</td><td style="padding: 12px;">Admin</td></tr>
            <tr><td style="padding: 12px;">Jane Smith</td><td style="padding: 12px;">jane@example.com</td><td style="padding: 12px;">User</td></tr>
            <tr><td style="padding: 12px;">Bob Johnson</td><td style="padding: 12px;">bob@example.com</td><td style="padding: 12px;">User</td></tr>
          </tbody>
        </table>
      </Skeleton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Skeleton, Button } from '@elivander/elix-ui'

const loading = ref(true)
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
