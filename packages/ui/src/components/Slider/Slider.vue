<template>
  <div :class="sliderClasses">
    <div
      ref="trackRef"
      class="eui-slider__track"
      @mousedown="handleTrackMouseDown"
    >
      <div class="eui-slider__rail" />
      <div
        v-if="range"
        class="eui-slider__range"
        :style="rangeStyle"
      />
      <div
        v-else
        class="eui-slider__range"
        :style="singleRangeStyle"
      />
      <div
        v-for="(mark, value) in marks"
        :key="value"
        class="eui-slider__mark"
        :style="getMarkStyle(value)"
      >
        <span class="eui-slider__mark-text">{{ mark }}</span>
      </div>
      <div
        v-for="(value, index) in handles"
        :key="index"
        class="eui-slider__handle"
        :class="{
          'eui-slider__handle--active': activeHandle === index,
          'eui-slider__handle--with-tooltip': showTooltip(index),
        }"
        :style="getHandleStyle(value, index)"
        @mousedown.stop="handleMouseDown($event, index)"
      >
        <div
          v-if="showTooltip(index)"
          class="eui-slider__tooltip"
          :class="{
            'eui-slider__tooltip--always': tooltip === 'always',
            'eui-slider__tooltip--hover': tooltip === 'hover' && (hoveredHandle === index || activeHandle === index),
          }"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { sliderProps, type SliderProps } from './Slider'

defineOptions({
  name: 'EuiSlider',
})

const props = defineProps(sliderProps)

const emit = defineEmits<{
  'update:modelValue': [value: number | [number, number]]
}>()

const trackRef = ref<HTMLElement>()
const activeHandle = ref<number | null>(null)
const hoveredHandle = ref<number | null>(null)
const isDragging = ref(false)

const handles = computed(() => {
  if (props.range) {
    const values = props.modelValue as [number, number]
    return [values[0], values[1]]
  }
  return [props.modelValue as number]
})

const sliderClasses = computed(() => {
  return [
    'eui-slider',
    `eui-slider--${props.size}`,
    {
      'eui-slider--disabled': props.disabled,
      'eui-slider--range': props.range,
    },
  ]
})

const rangeStyle = computed(() => {
  if (!props.range) return {}
  const values = props.modelValue as [number, number]
  const left = ((values[0] - props.min) / (props.max - props.min)) * 100
  const width = ((values[1] - values[0]) / (props.max - props.min)) * 100
  return {
    left: `${left}%`,
    width: `${width}%`,
  }
})

const singleRangeStyle = computed(() => {
  const value = props.modelValue as number
  const width = ((value - props.min) / (props.max - props.min)) * 100
  return {
    width: `${width}%`,
  }
})

const getMarkStyle = (value: number) => {
  const percentage = ((value - props.min) / (props.max - props.min)) * 100
  return {
    left: `${percentage}%`,
  }
}

const getHandleStyle = (value: number, index: number) => {
  const percentage = ((value - props.min) / (props.max - props.min)) * 100
  return {
    left: `${percentage}%`,
    transform: 'translateX(-50%)',
  }
}

const showTooltip = (index: number) => {
  if (props.tooltip === 'none') return false
  if (props.tooltip === 'always') return true
  return hoveredHandle.value === index || activeHandle.value === index
}

const getValueFromEvent = (event: MouseEvent): number => {
  if (!trackRef.value) return props.min
  
  const rect = trackRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = Math.max(0, Math.min(1, x / rect.width))
  const rawValue = props.min + percentage * (props.max - props.min)
  const steppedValue = Math.round(rawValue / props.step) * props.step
  return Math.max(props.min, Math.min(props.max, steppedValue))
}

const updateValue = (newValue: number, index: number) => {
  if (props.range) {
    const values = [...(props.modelValue as [number, number])]
    values[index] = newValue
    
    // Ensure order: first handle <= second handle
    if (index === 0 && values[0] > values[1]) {
      values[0] = values[1]
    } else if (index === 1 && values[1] < values[0]) {
      values[1] = values[0]
    }
    
    emit('update:modelValue', values as [number, number])
  } else {
    emit('update:modelValue', newValue)
  }
}

const handleMouseDown = (event: MouseEvent, index: number) => {
  if (props.disabled) return
  
  event.preventDefault()
  isDragging.value = true
  activeHandle.value = index
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    const newValue = getValueFromEvent(e)
    updateValue(newValue, index)
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
    activeHandle.value = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleTrackMouseDown = (event: MouseEvent) => {
  if (props.disabled || props.range) return
  
  const newValue = getValueFromEvent(event)
  updateValue(newValue, 0)
  
  // Start dragging immediately
  isDragging.value = true
  activeHandle.value = 0
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    const value = getValueFromEvent(e)
    updateValue(value, 0)
  }
  
  const handleMouseUp = () => {
    isDragging.value = false
    activeHandle.value = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleKeydown = (event: KeyboardEvent, index: number) => {
  if (props.disabled) return
  
  let delta = 0
  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    delta = -props.step
  } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    delta = props.step
  } else {
    return
  }
  
  event.preventDefault()
  
  const currentValue = props.range
    ? (props.modelValue as [number, number])[index]
    : (props.modelValue as number)
  
  const newValue = Math.max(props.min, Math.min(props.max, currentValue + delta))
  updateValue(newValue, index)
}

onMounted(() => {
  // Keyboard navigation
  const handles = trackRef.value?.querySelectorAll('.eui-slider__handle')
  handles?.forEach((handle, index) => {
    handle.setAttribute('tabindex', '0')
    handle.addEventListener('keydown', (e) => handleKeydown(e as KeyboardEvent, index))
    handle.addEventListener('mouseenter', () => {
      hoveredHandle.value = index
    })
    handle.addEventListener('mouseleave', () => {
      hoveredHandle.value = null
    })
  })
})

onUnmounted(() => {
  // Cleanup
  isDragging.value = false
  activeHandle.value = null
})
</script>

<style lang="scss" scoped>
.eui-slider {
  position: relative;
  width: 100%;
  padding: var(--eui-spacing-sm) 0;

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
}

.eui-slider__track {
  position: relative;
  width: 100%;
  height: 4px;
  cursor: pointer;
}

.eui-slider__rail {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--eui-bg-tertiary);
  border-radius: var(--eui-radius-full);
  transform: translateY(-50%);
  transition: background-color 0.2s ease-in-out;
}

.eui-slider__range {
  position: absolute;
  top: 50%;
  height: 4px;
  background-color: var(--eui-color-primary);
  border-radius: var(--eui-radius-full);
  transform: translateY(-50%);
  transition: all 0.2s ease-in-out;
}

.eui-slider__handle {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  background-color: var(--eui-bg-primary);
  border: 2px solid var(--eui-color-primary);
  border-radius: var(--eui-radius-full);
  cursor: grab;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease-in-out;
  outline: none;
  z-index: 2;
  box-sizing: border-box;

  &:hover,
  &--active {
    border-color: var(--eui-color-primary-600);
    box-shadow: 0 0 0 4px var(--eui-color-primary-100);
    transform: translate(-50%, -50%) scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid var(--eui-border-color-focus);
    outline-offset: 2px;
  }

  &:active {
    cursor: grabbing;
  }
}

.eui-slider__tooltip {
  position: absolute;
  bottom: calc(100% + var(--eui-spacing-xs));
  left: 50%;
  padding: var(--eui-spacing-xs) var(--eui-spacing-sm);
  font-size: var(--eui-font-size-xs);
  font-weight: var(--eui-font-weight-medium);
  color: var(--eui-text-inverse);
  background-color: var(--eui-color-neutral-900);
  border-radius: var(--eui-radius-sm);
  white-space: nowrap;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -4px;
    border: 4px solid transparent;
    border-top-color: var(--eui-color-neutral-900);
  }

  &--always,
  &--hover {
    opacity: 1;
  }
}

.eui-slider__mark {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.eui-slider__mark-text {
  display: block;
  margin-top: var(--eui-spacing-md);
  font-size: var(--eui-font-size-xs);
  color: var(--eui-text-tertiary);
  white-space: nowrap;
}

// Sizes
.eui-slider--sm {
  .eui-slider__rail,
  .eui-slider__range {
    height: 2px;
  }

  .eui-slider__handle {
    width: 12px;
    height: 12px;
  }
}

.eui-slider--lg {
  .eui-slider__rail,
  .eui-slider__range {
    height: 6px;
  }

  .eui-slider__handle {
    width: 20px;
    height: 20px;
  }
}
</style>

