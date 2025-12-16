<template>
  <div class="docs-page">
    <h1>Accordion</h1>
    <p>The Accordion component is used to show and hide content sections. Only one item can be open at a time.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="AccordionBasicDemo" :code="basicCode" />

    <h2>With Description</h2>
    <Playground :demo-component="AccordionWithDescriptionDemo" :code="descriptionCode" />

    <h2>Styles</h2>
    <Playground :demo-component="AccordionStylesDemo" :code="stylesCode" />

    <h2>API</h2>
    <h3>Accordion</h3>
    <ApiTable :props="accordionProps" :events="accordionEvents" />
    
    <h3>AccordionItem</h3>
    <ApiTable :props="accordionItemProps" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import ApiTable from '../../components/ApiTable.vue'
import AccordionBasicDemo from '../../components/demos/Accordion/BasicBasic.vue'
import AccordionWithDescriptionDemo from '../../components/demos/Accordion/WithDescriptionBasic.vue'
import AccordionStylesDemo from '../../components/demos/Accordion/StylesBasic.vue'

const basicCode = `<template>
  <EuiAccordion v-model="activeKey">
    <EuiAccordionItem name="1" title="Accordion 1" description="Press to expand">
      Content of accordion 1
    </EuiAccordionItem>
    <EuiAccordionItem name="2" title="Accordion 2" description="Press to expand key 2">
      Content of accordion 2
    </EuiAccordionItem>
    <EuiAccordionItem name="3" title="Accordion 3" description="Press to expand">
      Content of accordion 3
    </EuiAccordionItem>
  </EuiAccordion>
</template>

<script setup>
import { ref } from 'vue'
import { Accordion as EuiAccordion, AccordionItem as EuiAccordionItem } from '@elivander/elix-ui'

const activeKey = ref('1')
<\/script>`

const descriptionCode = `<template>
  <EuiAccordion v-model="activeKey">
    <EuiAccordionItem 
      name="1" 
      title="Accordion 1" 
      description="Press to expand"
    >
      Content with description
    </EuiAccordionItem>
    <EuiAccordionItem 
      name="2" 
      title="Accordion 2"
    >
      Content without description
    </EuiAccordionItem>
  </EuiAccordion>
</template>

<script setup>
import { ref } from 'vue'
import { Accordion as EuiAccordion, AccordionItem as EuiAccordionItem } from '@elivander/elix-ui'

const activeKey = ref('1')
<\/script>`

const stylesCode = `<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <EuiAccordion v-model="activeKey1" style="default">
      <EuiAccordionItem name="1" title="Title">Default style</EuiAccordionItem>
    </EuiAccordion>
    
    <EuiAccordion v-model="activeKey2" style="shadow">
      <EuiAccordionItem name="1" title="Title">Shadow style</EuiAccordionItem>
    </EuiAccordion>
    
    <EuiAccordion v-model="activeKey3" style="bordered">
      <EuiAccordionItem name="1" title="Title">Bordered style</EuiAccordionItem>
    </EuiAccordion>
    
    <EuiAccordion v-model="activeKey4" style="splitted">
      <EuiAccordionItem name="1" title="Title">Splitted style</EuiAccordionItem>
    </EuiAccordion>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Accordion as EuiAccordion, AccordionItem as EuiAccordionItem } from '@elivander/elix-ui'

const activeKey1 = ref(undefined)
const activeKey2 = ref(undefined)
const activeKey3 = ref(undefined)
const activeKey4 = ref(undefined)
<\/script>`

const accordionProps = [
  {
    name: 'modelValue',
    type: 'string | number | undefined',
    default: 'undefined',
    description: 'The name of the currently active accordion item',
  },
  {
    name: 'style',
    type: "'default' | 'shadow' | 'bordered' | 'splitted'",
    default: "'default'",
    description: 'The visual style of the accordion',
  },
]

const accordionEvents = [
  {
    name: 'update:modelValue',
    description: 'Emitted when the active item changes',
    params: 'value: string | number | undefined',
  },
]

const accordionItemProps = [
  {
    name: 'name',
    type: 'string | number',
    default: '-',
    description: 'Unique identifier for the accordion item (required)',
  },
  {
    name: 'title',
    type: 'string',
    default: "''",
    description: 'The title text displayed in the accordion header',
  },
  {
    name: 'description',
    type: 'string',
    default: "''",
    description: 'Optional description text displayed below the title',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the accordion item is disabled',
  },
]
</script>

