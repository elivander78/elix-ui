<template>
  <div class="docs-page">
    <h1>Steps</h1>
    <p>The Steps component displays the progress of a process.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="StepsBasicDemo" :code="basicCode" />

    <h2>With Description</h2>
    <Playground :demo-component="StepsDescriptionDemo" :code="descriptionCode" />

    <h2>Vertical</h2>
    <Playground :demo-component="StepsVerticalDemo" :code="verticalCode" />

    <h2>Status</h2>
    <Playground :demo-component="StepsStatusDemo" :code="statusCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import StepsBasicDemo from '../../components/demos/Steps/Basic.vue'
import StepsDescriptionDemo from '../../components/demos/Steps/Description.vue'
import StepsVerticalDemo from '../../components/demos/Steps/Vertical.vue'
import StepsStatusDemo from '../../components/demos/Steps/Status.vue'

const basicCode = `<template>
  <EuiSteps :current="current">
    <EuiStep title="Step 1" />
    <EuiStep title="Step 2" />
    <EuiStep title="Step 3" />
    <EuiStep title="Step 4" />
  </EuiSteps>
  <div style="margin-top: 16px;">
    <EuiButton @click="current = Math.max(0, current - 1)">Previous</EuiButton>
    <EuiButton @click="current = Math.min(3, current + 1)">Next</EuiButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Steps as EuiSteps, Step as EuiStep, Button as EuiButton } from '@elivander/elix-ui'

const current = ref(1)
<\/script>`

const descriptionCode = `<template>
  <EuiSteps :current="current">
    <EuiStep title="Finished" description="This is a description" />
    <EuiStep title="In Progress" description="This is a description" />
    <EuiStep title="Waiting" description="This is a description" />
  </EuiSteps>
</template>

<script setup>
import { ref } from 'vue'
import { Steps as EuiSteps, Step as EuiStep } from '@elivander/elix-ui'

const current = ref(1)
<\/script>`

const verticalCode = `<template>
  <EuiSteps :current="current" direction="vertical">
    <EuiStep title="Step 1" description="Description 1" />
    <EuiStep title="Step 2" description="Description 2" />
    <EuiStep title="Step 3" description="Description 3" />
  </EuiSteps>
</template>

<script setup>
import { ref } from 'vue'
import { Steps as EuiSteps, Step as EuiStep } from '@elivander/elix-ui'

const current = ref(1)
<\/script>`

const statusCode = `<template>
  <EuiSteps :current="2" status="error">
    <EuiStep title="Step 1" />
    <EuiStep title="Step 2" />
    <EuiStep title="Step 3" />
    <EuiStep title="Step 4" />
  </EuiSteps>
</template>

<script setup>
import { Steps as EuiSteps, Step as EuiStep } from '@elivander/elix-ui'
<\/script>`
</script>

