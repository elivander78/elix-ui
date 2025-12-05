<template>
  <div class="playground">
    <div class="playground__controls">
      <button class="playground__control" @click="copyCode">
        {{ copied ? 'Copied!' : 'Copy Code' }}
      </button>
    </div>
    <div class="playground__preview">
      <component v-if="demoComponent" :is="demoComponent" />
      <PreviewRenderer v-else :code="code" />
    </div>
    <CodeBlock :code="code" />
  </div>
</template>

<script setup lang="ts">
import { ref, type Component } from 'vue'
import CodeBlock from './CodeBlock.vue'
import PreviewRenderer from './PreviewRenderer.vue'

const props = defineProps<{
  code: string
  demoComponent?: Component
}>()

const copied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>

<style lang="scss" scoped>
.playground {
  margin: var(--eui-spacing-lg) 0;
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-lg);
  overflow: hidden;
  max-width: 100%;
  position: relative;

  &__controls {
    display: flex;
    gap: var(--eui-spacing-sm);
    padding: var(--eui-spacing-sm);
    background-color: var(--eui-bg-secondary);
    border-bottom: 1px solid var(--eui-border-color);
  }

  &__control {
    padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-primary);
    border: 1px solid var(--eui-border-color);
    border-radius: var(--eui-radius-sm);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: var(--eui-bg-secondary);
    }
  }

  &__preview {
    padding: var(--eui-spacing-xl);
    background-color: var(--eui-bg-primary);
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--eui-spacing-sm);
    max-width: 100%;
    overflow-x: auto;
  }
}
</style>
