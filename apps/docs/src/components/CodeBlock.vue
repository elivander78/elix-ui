<template>
  <div class="code-block">
    <div class="code-block__header">
      <div class="code-block__dots">
        <span class="code-block__dot"></span>
        <span class="code-block__dot"></span>
        <span class="code-block__dot"></span>
      </div>
      <button
        class="code-block__copy"
        :class="{ 'code-block__copy--copied': copied }"
        @click="copyCode"
      >
        <span class="code-block__copy-icon">
          <svg
            v-if="!copied"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 4.5V3.5C5.5 2.67157 6.17157 2 7 2H12.5C13.3284 2 14 2.67157 14 3.5V9C14 9.82843 13.3284 10.5 12.5 10.5H11.5V11.5C11.5 12.3284 10.8284 13 10 13H3.5C2.67157 13 2 12.3284 2 11.5V5.5C2 4.67157 2.67157 4 3.5 4H5.5V4.5Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.5 4.5H10C9.17157 4.5 8.5 5.17157 8.5 6V10.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 4.5L6 12L2.5 8.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span class="code-block__copy-text">{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>
    <div class="code-block__content">
      <pre><code>{{ code }}</code></pre>
    </div>
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
  margin-top: var(--eui-spacing-lg);
  background: linear-gradient(135deg, var(--eui-bg-secondary) 0%, var(--eui-bg-tertiary) 100%);
  overflow: hidden;
  max-width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--eui-spacing-sm) var(--eui-spacing-md);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.03) 0%,
      rgba(255, 255, 255, 0.01) 100%
    );
    border-bottom: 1px solid var(--eui-border-color);
    backdrop-filter: blur(10px);
  }

  &__dots {
    display: flex;
    gap: var(--eui-spacing-xs);
    align-items: center;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--eui-text-tertiary);
    opacity: 0.6;
    transition: opacity 0.2s ease;

    &:nth-child(1) {
      background: #ff5f56;
      opacity: 0.8;
    }

    &:nth-child(2) {
      background: #ffbd2e;
      opacity: 0.8;
    }

    &:nth-child(3) {
      background: #27c93f;
      opacity: 0.8;
    }
  }

  &__copy {
    display: flex;
    align-items: center;
    gap: var(--eui-spacing-xs);
    padding: var(--eui-spacing-xs) var(--eui-spacing-md);
    font-size: var(--eui-font-size-sm);
    color: var(--eui-text-secondary);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--eui-border-color);
    border-radius: var(--eui-radius-md);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: var(--eui-font-weight-medium);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      color: var(--eui-text-primary);
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--eui-border-color-hover);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(0) scale(0.98);
    }

    &--copied {
      color: #27c93f;
      background: rgba(39, 201, 63, 0.1);
      border-color: rgba(39, 201, 63, 0.3);

      .code-block__copy-icon {
        animation: checkmark 0.3s ease;
      }
    }
  }

  &__copy-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  &__copy-text {
    transition: opacity 0.2s ease;
  }

  &__content {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
  }

  pre {
    margin: 0;
    padding: var(--eui-spacing-xl);
    overflow-x: auto;
    font-family: var(--eui-font-family-mono);
    font-size: var(--eui-font-size-sm);
    line-height: var(--eui-line-height-relaxed);
    color: var(--eui-text-primary);
    background: transparent;
    position: relative;
    border: none;
    border-radius: 0;

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--eui-border-color);
      border-radius: 4px;
      transition: background 0.2s ease;

      &:hover {
        background: var(--eui-border-color-hover);
      }
    }

    code {
      font-family: inherit;
      display: block;
      white-space: pre;
      word-break: break-all;
      overflow-wrap: anywhere;
    }
  }
}

@keyframes checkmark {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
</style>
