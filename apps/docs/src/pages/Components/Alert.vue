<template>
  <div class="docs-page">
    <h1>Alert</h1>
    <p>The Alert component is used to display important messages to users.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="AlertBasicDemo" :code="basicCode" />

    <h2>Types</h2>
    <Playground :demo-component="AlertTypesDemo" :code="typesCode" />

    <h2>Variants</h2>
    <Playground :demo-component="AlertVariantsDemo" :code="variantsCode" />

    <h2>With Description</h2>
    <Playground :demo-component="AlertDescriptionDemo" :code="descriptionCode" />

    <h2>Closable</h2>
    <Playground :demo-component="AlertClosableDemo" :code="closableCode" />

    <h2>Appearance</h2>
    <Playground :demo-component="AlertAppearanceDemo" :code="appearanceCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import AlertBasicDemo from '../../components/demos/AlertBasicDemo.vue'
import AlertTypesDemo from '../../components/demos/AlertTypesDemo.vue'
import AlertVariantsDemo from '../../components/demos/AlertVariantsDemo.vue'
import AlertDescriptionDemo from '../../components/demos/AlertDescriptionDemo.vue'
import AlertClosableDemo from '../../components/demos/AlertClosableDemo.vue'
import AlertAppearanceDemo from '../../components/demos/AlertAppearanceDemo.vue'

const basicCode = `<template>
  <Alert type="info" title="Info Alert">
    This is an informational message.
  </Alert>
</template>

<script setup>
import { Alert } from '@elix/ui'
<\/script>`

const typesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Alert type="success" title="Success" />
    <Alert type="info" title="Info" />
    <Alert type="warning" title="Warning" />
    <Alert type="error" title="Error" />
  </div>
</template>

<script setup>
import { Alert } from '@elix/ui'
<\/script>`

const variantsCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Alert type="info" variant="soft" title="Soft variant" />
    <Alert type="info" variant="solid" title="Solid variant" />
    <Alert type="info" variant="outlined" title="Outlined variant" />
  </div>
</template>

<script setup>
import { Alert } from '@elix/ui'
<\/script>`

const descriptionCode = `<template>
  <Alert 
    type="warning" 
    title="Warning" 
    description="This is a longer description that provides more context about the alert message."
  />
</template>

<script setup>
import { Alert } from '@elix/ui'
<\/script>`

const closableCode = `<template>
  <Alert 
    type="info" 
    title="Closable Alert" 
    description="Click the X button to close this alert."
    :closable="true"
    @close="handleClose"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Alert } from '@elix/ui'

const handleClose = () => {
  console.log('Alert closed')
}
<\/script>`

const appearanceCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <Alert type="info" appearance="border" variant="outlined" title="Border" />
    <Alert type="info" appearance="shadow" variant="outlined" title="Shadow" />
    <Alert type="info" appearance="border-shadow" variant="outlined" title="Border + Shadow" />
  </div>
</template>

<script setup>
import { Alert } from '@elix/ui'
<\/script>`
</script>

