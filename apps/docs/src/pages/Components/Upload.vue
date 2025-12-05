<template>
  <div class="docs-page">
    <h1>Upload</h1>
    <p>The Upload component is used to upload files.</p>

    <h2>Basic Usage</h2>
    <Playground :demo-component="UploadBasicDemo" :code="basicCode" />

    <h2>Drag & Drop</h2>
    <Playground :demo-component="UploadDragDemo" :code="dragCode" />

    <h2>Multiple Files</h2>
    <Playground :demo-component="UploadMultipleDemo" :code="multipleCode" />

    <h2>With Validation</h2>
    <Playground :demo-component="UploadValidationDemo" :code="validationCode" />

    <h2>With Files</h2>
    <Playground :demo-component="UploadWithFilesDemo" :code="withFilesCode" />
  </div>
</template>

<script setup lang="ts">
import Playground from '../../components/Playground.vue'
import UploadBasicDemo from '../../components/demos/UploadBasicDemo.vue'
import UploadDragDemo from '../../components/demos/UploadDragDemo.vue'
import UploadMultipleDemo from '../../components/demos/UploadMultipleDemo.vue'
import UploadValidationDemo from '../../components/demos/UploadValidationDemo.vue'
import UploadWithFilesDemo from '../../components/demos/UploadWithFilesDemo.vue'

const basicCode = `<template>
  <Upload 
    :file-list="fileList"
    @change="handleChange"
    @remove="handleRemove"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Upload } from '@elix/ui'

const fileList = ref([])

const handleChange = (files) => {
  fileList.value = files
  console.log('Files changed:', files)
}

const handleRemove = (file) => {
  console.log('File removed:', file)
}
<\/script>`

const dragCode = `<template>
  <Upload 
    :drag="true"
    :file-list="fileList"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Upload } from '@elix/ui'

const fileList = ref([])

const handleChange = (files) => {
  fileList.value = files
}
<\/script>`

const multipleCode = `<template>
  <Upload 
    :multiple="true"
    :file-list="fileList"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Upload } from '@elix/ui'

const fileList = ref([])

const handleChange = (files) => {
  fileList.value = files
}
<\/script>`

const validationCode = `<template>
  <Upload 
    accept="image/*"
    :max-size-mb="5"
    :file-list="fileList"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Upload } from '@elix/ui'

const fileList = ref([])

const handleChange = (files) => {
  fileList.value = files
}
<\/script>`

const withFilesCode = `<template>
  <Upload 
    :file-list="fileList"
    @change="handleChange"
    @remove="handleRemove"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Upload, type UploadFile } from '@elix/ui'

const fileList = ref([
  {
    uid: '1',
    name: 'example-image.jpg',
    size: 245760,
    status: 'done',
    url: 'https://via.placeholder.com/150',
  },
  {
    uid: '2',
    name: 'document.pdf',
    size: 1024000,
    status: 'done',
  },
  {
    uid: '3',
    name: 'uploading-file.txt',
    size: 51200,
    status: 'uploading',
    percent: 65,
  },
])

const handleChange = (files) => {
  fileList.value = files
}

const handleRemove = (file) => {
  console.log('File removed:', file)
}
<\/script>`
</script>

