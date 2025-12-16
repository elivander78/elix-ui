<template>
  <EuiUpload 
    :multiple="true"
    :file-list="uploadFileList3"
    @change="handleChange3"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload as EuiUpload, type UploadFile } from '@elivander/elix-ui'

const uploadFileList3 = ref<UploadFile[]>([])

const handleChange3 = (files: UploadFile[]) => {
  uploadFileList3.value = files
}
</script>

