<template>
  <div :class="uploadClasses">
    <input
      ref="inputRef"
      type="file"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      class="eui-upload__input"
      @change="handleFileChange"
    />
    <div
      v-if="drag"
      :class="dragClasses"
      @drop="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragenter.prevent="handleDragEnter"
      @dragleave="handleDragLeave"
      @click.stop="triggerUpload"
    >
      <div class="eui-upload__drag-content">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="eui-upload__drag-text">Drop files here or click to upload</p>
        <p v-if="accept" class="eui-upload__drag-hint">{{ accept }}</p>
      </div>
    </div>
    <div v-else class="eui-upload__trigger">
      <slot>
        <EuiButton :disabled="disabled" @click="triggerUpload">
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 2v12M2 8h12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </template>
          {{ fileList && fileList.length > 0 ? 'Add More Files' : 'Upload' }}
        </EuiButton>
      </slot>
    </div>
    <div v-if="fileList && fileList.length > 0" class="eui-upload__file-list">
      <div
        v-for="file in fileList"
        :key="file.uid"
        class="eui-upload__file-item"
      >
        <div class="eui-upload__file-info">
          <span class="eui-upload__file-name">{{ file.name }}</span>
          <span class="eui-upload__file-size">{{ formatFileSize(file.size) }}</span>
        </div>
        <div v-if="file.status === 'uploading'" class="eui-upload__file-progress">
          <EuiProgress :percentage="file.percent || 0" :size="'sm'" />
        </div>
        <div v-if="file.status === 'done'" class="eui-upload__file-status">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="color: var(--eui-color-success);">
            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Uploaded
        </div>
        <div v-if="file.status === 'error'" class="eui-upload__file-error">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="color: var(--eui-color-error);">
            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" />
            <path d="M8 5v3M8 11h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          Upload failed
        </div>
        <div v-if="file.status === 'pending'" class="eui-upload__file-status">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="color: var(--eui-text-tertiary);">
            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" />
          </svg>
          Pending
        </div>
        <button
          class="eui-upload__file-remove"
          @click="handleRemove(file)"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { uploadProps, type UploadProps, type UploadFile } from './Upload'
import Button from '../Button/Button.vue'
import Progress from '../Progress/Progress.vue'

// Register components locally
const EuiButton = Button
const EuiProgress = Progress

defineOptions({
  name: 'EuiUpload',
})

const props = defineProps(uploadProps)

const emit = defineEmits<{
  change: [files: UploadFile[]]
  remove: [file: UploadFile]
}>()

const inputRef = ref<HTMLInputElement>()
const isDragging = ref(false)

const uploadClasses = computed(() => {
  return [
    'eui-upload',
    {
      'eui-upload--disabled': props.disabled,
    },
  ]
})

const dragClasses = computed(() => {
  return [
    'eui-upload__drag',
    {
      'eui-upload__drag--active': isDragging.value,
      'eui-upload__drag--disabled': props.disabled,
    },
  ]
})

const triggerUpload = () => {
  if (props.disabled) return
  inputRef.value?.click()
}

const validateFile = (file: File): string | null => {
  if (props.maxSizeMb && file.size > props.maxSizeMb * 1024 * 1024) {
    return `File size exceeds ${props.maxSizeMb}MB`
  }
  if (props.accept) {
    const acceptTypes = props.accept.split(',').map(t => t.trim())
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    const fileType = file.type
    
    const matches = acceptTypes.some(acceptType => {
      if (acceptType.startsWith('.')) {
        return acceptType === fileExtension
      }
      if (acceptType.includes('/*')) {
        const baseType = acceptType.split('/')[0]
        return fileType.startsWith(baseType + '/')
      }
      return acceptType === fileType
    })
    
    if (!matches) {
      return `File type not allowed. Accepted: ${props.accept}`
    }
  }
  return null
}

const createUploadFile = (file: File): UploadFile => {
  return {
    uid: `${Date.now()}-${Math.random()}`,
    name: file.name,
    size: file.size,
    status: 'pending',
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  if (files.length === 0) return
  
  const newFiles: UploadFile[] = []
  
  for (const file of files) {
    const error = validateFile(file)
    if (error) {
      console.warn(error, file.name)
      continue
    }
    
    const uploadFile = createUploadFile(file)
    newFiles.push(uploadFile)
  }
  
  if (newFiles.length > 0) {
    const updatedList = props.multiple
      ? [...(props.fileList || []), ...newFiles]
      : newFiles.slice(0, 1)
    
    emit('change', updatedList)
  }
  
  // Reset input
  if (inputRef.value) {
    inputRef.value.value = ''
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  isDragging.value = false
  
  if (props.disabled) return
  
  const files = Array.from(event.dataTransfer?.files || [])
  if (files.length === 0) return
  
  const newFiles: UploadFile[] = []
  
  for (const file of files) {
    const error = validateFile(file)
    if (error) {
      console.warn(error, file.name)
      continue
    }
    
    const uploadFile = createUploadFile(file)
    newFiles.push(uploadFile)
  }
  
  if (newFiles.length > 0) {
    const updatedList = props.multiple
      ? [...(props.fileList || []), ...newFiles]
      : newFiles.slice(0, 1)
    
    emit('change', updatedList)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  if (!props.disabled) {
    isDragging.value = true
  }
}

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  if (!props.disabled) {
    isDragging.value = true
  }
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  event.stopPropagation()
  // Only set dragging to false if we're actually leaving the drag zone
  // Check if we're leaving to a child element (which is still inside)
  const currentTarget = event.currentTarget as HTMLElement
  const relatedTarget = event.relatedTarget as HTMLElement | null
  
  if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
    isDragging.value = false
  }
}

const handleRemove = (file: UploadFile) => {
  emit('remove', file)
  const updatedList = (props.fileList || []).filter(f => f.uid !== file.uid)
  emit('change', updatedList)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
</script>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.eui-upload {
  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
}

.eui-upload__input {
  display: none;
}

.eui-upload__trigger {
  display: inline-block;
}

.eui-upload__drag {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: var(--eui-spacing-xl);
  border: 2px dashed var(--eui-border-color);
  border-radius: var(--eui-radius-lg);
  background-color: var(--eui-bg-secondary);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;

  &:hover:not(&--disabled) {
    border-color: var(--eui-color-primary);
    background-color: var(--eui-color-primary-50);
  }

  &--active {
    border-color: var(--eui-color-primary);
    background-color: var(--eui-color-primary-100);
    border-style: solid;
    transform: scale(1.02);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}

.eui-upload__drag-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--eui-spacing-md);
  text-align: center;
  color: var(--eui-text-secondary);
}

.eui-upload__drag-text {
  margin: 0;
  font-size: var(--eui-font-size-base);
  font-weight: var(--eui-font-weight-medium);
  color: var(--eui-text-primary);
}

.eui-upload__drag-hint {
  margin: 0;
  font-size: var(--eui-font-size-sm);
  color: var(--eui-text-tertiary);
}

.eui-upload__file-list {
  margin-top: var(--eui-spacing-md);
}

.eui-upload__file-item {
  display: flex;
  align-items: center;
  gap: var(--eui-spacing-sm);
  padding: var(--eui-spacing-sm) var(--eui-spacing-md);
  margin-bottom: var(--eui-spacing-xs);
  background-color: var(--eui-bg-secondary);
  border-radius: var(--eui-radius-md);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--eui-bg-tertiary);
  }
}

.eui-upload__file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--eui-spacing-xs);
  min-width: 0;
}

.eui-upload__file-name {
  font-size: var(--eui-font-size-sm);
  font-weight: var(--eui-font-weight-medium);
  color: var(--eui-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.eui-upload__file-size {
  font-size: var(--eui-font-size-xs);
  color: var(--eui-text-tertiary);
}

.eui-upload__file-progress {
  flex: 1;
  max-width: 200px;
}

.eui-upload__file-error {
  display: flex;
  align-items: center;
  gap: var(--eui-spacing-xs);
  font-size: var(--eui-font-size-xs);
  color: var(--eui-color-error);
}

.eui-upload__file-status {
  display: flex;
  align-items: center;
  gap: var(--eui-spacing-xs);
  font-size: var(--eui-font-size-xs);
  color: var(--eui-text-secondary);
}

.eui-upload__file-remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  color: var(--eui-text-tertiary);
  background: transparent;
  border: none;
  border-radius: var(--eui-radius-sm);
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--eui-text-primary);
    background-color: var(--eui-bg-tertiary);
  }
}
</style>

