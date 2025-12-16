<template>
  <EuiUpload 
    accept="image/*"
    :max-size-mb="5"
    :file-list="uploadFileList4"
    @change="handleChange4"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload as EuiUpload, type UploadFile } from '@elivander/elix-ui'

const uploadFileList4 = ref<UploadFile[]>([])

const handleChange4 = (files: UploadFile[]) => {
  uploadFileList4.value = files
}
</script>

