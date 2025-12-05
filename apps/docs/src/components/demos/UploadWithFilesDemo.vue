<template>
  <Upload 
    :file-list="uploadFileList5"
    @change="handleChange5"
    @remove="handleRemove5"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload, type UploadFile } from '@elix/ui'

const uploadFileList5 = ref<UploadFile[]>([
  {
    uid: 'upload-demo-1',
    name: 'example-image.jpg',
    size: 245760,
    status: 'done',
    url: 'https://via.placeholder.com/150',
  },
  {
    uid: 'upload-demo-2',
    name: 'document.pdf',
    size: 1024000,
    status: 'done',
  },
  {
    uid: 'upload-demo-3',
    name: 'uploading-file.txt',
    size: 51200,
    status: 'uploading',
    percent: 65,
  },
  {
    uid: 'upload-demo-4',
    name: 'pending-file.doc',
    size: 128000,
    status: 'pending',
  },
  {
    uid: 'upload-demo-5',
    name: 'failed-upload.zip',
    size: 2048000,
    status: 'error',
  },
])

const handleChange5 = (files: UploadFile[]) => {
  uploadFileList5.value = files
  console.log('Files changed:', files)
}

const handleRemove5 = (file: UploadFile) => {
  uploadFileList5.value = uploadFileList5.value.filter(f => f.uid !== file.uid)
  console.log('File removed:', file)
}
</script>

