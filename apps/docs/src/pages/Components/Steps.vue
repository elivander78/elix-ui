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
import StepsBasicDemo from '../../components/demos/StepsBasicDemo.vue'
import StepsDescriptionDemo from '../../components/demos/StepsDescriptionDemo.vue'
import StepsVerticalDemo from '../../components/demos/StepsVerticalDemo.vue'
import StepsStatusDemo from '../../components/demos/StepsStatusDemo.vue'

const basicCode = `<template>
  <Steps :current="current">
    <Step title="Step 1" />
    <Step title="Step 2" />
    <Step title="Step 3" />
    <Step title="Step 4" />
  </Steps>
  <div style="margin-top: 16px;">
    <Button @click="current = Math.max(0, current - 1)">Previous</Button>
    <Button @click="current = Math.min(3, current + 1)">Next</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Steps, Step, Button } from '@elix/ui'

const current = ref(1)
<\/script>`

const descriptionCode = `<template>
  <Steps :current="current">
    <Step title="Finished" description="This is a description" />
    <Step title="In Progress" description="This is a description" />
    <Step title="Waiting" description="This is a description" />
  </Steps>
</template>

<script setup>
import { ref } from 'vue'
import { Steps, Step } from '@elix/ui'

const current = ref(1)
<\/script>`

const verticalCode = `<template>
  <Steps :current="current" direction="vertical">
    <Step title="Step 1" description="Description 1" />
    <Step title="Step 2" description="Description 2" />
    <Step title="Step 3" description="Description 3" />
  </Steps>
</template>

<script setup>
import { ref } from 'vue'
import { Steps, Step } from '@elix/ui'

const current = ref(1)
<\/script>`

const statusCode = `<template>
  <Steps :current="2" status="error">
    <Step title="Step 1" />
    <Step title="Step 2" />
    <Step title="Step 3" />
    <Step title="Step 4" />
  </Steps>
</template>

<script setup>
import { Steps, Step } from '@elix/ui'
<\/script>`
</script>

