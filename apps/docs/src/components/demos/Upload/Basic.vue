<template>
  <EuiUpload 
    :file-list="uploadFileList1"
    @change="handleChange1"
    @remove="handleRemove1"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload as EuiUpload, type UploadFile } from '@elivander/elix-ui'

const uploadFileList1 = ref<UploadFile[]>([])

const handleChange1 = (files: UploadFile[]) => {
  uploadFileList1.value = files
  console.log('Files changed:', files)
}

const handleRemove1 = (file: UploadFile) => {
  uploadFileList1.value = uploadFileList1.value.filter(f => f.uid !== file.uid)
  console.log('File removed:', file)
}
</script>

