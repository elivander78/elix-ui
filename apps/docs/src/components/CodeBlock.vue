<template>
  <div class="code-block">
    <div class="code-block__header">
      <button class="code-block__copy" @click="copyCode">Copy</button>
    </div>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code: string
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
.code-block {
  position: relative;
  margin: var(--eui-spacing-lg) 0;
  background-color: var(--eui-bg-secondary);
  border: 1px solid var(--eui-border-color);
  border-radius: var(--eui-radius-md);
  overflow: hidden;

  &__header {
    display: flex;
    justify-content: flex-end;
    padding: var(--eui-spacing-sm);
    background-color: var(--eui-bg-tertiary);
    border-bottom: 1px solid var(--eui-border-color);
  }

  &__copy {
    padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    background: transparent;
    border: 1px solid var(--eui-border-color);
    border-radius: var(--eui-radius-sm);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--eui-text-primary);
      border-color: var(--eui-border-color-hover);
    }
  }

  pre {
    margin: 0;
    padding: var(--eui-spacing-lg);
    overflow-x: auto;
    font-family: var(--eui-font-family-mono);
    font-size: var(--eui-font-size-sm);
    line-height: var(--eui-line-height-relaxed);
    color: var(--eui-text-primary);

    code {
      font-family: inherit;
    }
  }
}
</style>

