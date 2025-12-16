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
import AlertBasicDemo from '../../components/demos/Alert/Basic.vue'
import AlertTypesDemo from '../../components/demos/Alert/Types.vue'
import AlertVariantsDemo from '../../components/demos/Alert/Variants.vue'
import AlertDescriptionDemo from '../../components/demos/Alert/Description.vue'
import AlertClosableDemo from '../../components/demos/Alert/Closable.vue'
import AlertAppearanceDemo from '../../components/demos/Alert/Appearance.vue'

const basicCode = `<template>
  <EuiAlert type="info" title="Info Alert">
    This is an informational message.
  </EuiAlert>
</template>

<script setup>
import { Alert as EuiAlert } from '@elivander/elix-ui'
<\/script>`

const typesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiAlert type="success" title="Success" />
    <EuiAlert type="info" title="Info" />
    <EuiAlert type="warning" title="Warning" />
    <EuiAlert type="error" title="Error" />
  </div>
</template>

<script setup>
import { Alert as EuiAlert } from '@elivander/elix-ui'
<\/script>`

const variantsCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiAlert type="info" variant="soft" title="Soft variant" />
    <EuiAlert type="info" variant="solid" title="Solid variant" />
    <EuiAlert type="info" variant="outlined" title="Outlined variant" />
  </div>
</template>

<script setup>
import { Alert as EuiAlert } from '@elivander/elix-ui'
<\/script>`

const descriptionCode = `<template>
  <EuiAlert 
    type="warning" 
    title="Warning" 
    description="This is a longer description that provides more context about the alert message."
  />
</template>

<script setup>
import { Alert as EuiAlert } from '@elivander/elix-ui'
<\/script>`

const closableCode = `<template>
  <EuiAlert 
    type="info" 
    title="Closable Alert" 
    description="Click the X button to close this alert."
    :closable="true"
    @close="handleClose"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Alert as EuiAlert } from '@elivander/elix-ui'

const handleClose = () => {
  console.log('Alert closed')
}
<\/script>`

const appearanceCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <EuiAlert type="info" appearance="border" variant="outlined" title="Border" />
    <EuiAlert type="info" appearance="shadow" variant="outlined" title="Shadow" />
    <EuiAlert type="info" appearance="border-shadow" variant="outlined" title="Border + Shadow" />
  </div>
</template>

<script setup>
import { Alert as EuiAlert } from '@elivander/elix-ui'
<\/script>`
</script>

