<template>
  <EuiUpload 
    :drag="true"
    :file-list="uploadFileList2"
    @change="handleChange2"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload as EuiUpload, type UploadFile } from '@elivander/elix-ui'

const uploadFileList2 = ref<UploadFile[]>([])

const handleChange2 = (files: UploadFile[]) => {
  uploadFileList2.value = files
}
</script>

