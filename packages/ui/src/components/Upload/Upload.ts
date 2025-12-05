import type { PropType } from 'vue'

export type UploadFileStatus = 'pending' | 'uploading' | 'done' | 'error'

export interface UploadFile {
  uid: string
  name: string
  size: number
  status: UploadFileStatus
  percent?: number
  url?: string
}

export interface UploadProps {
  multiple?: boolean
  accept?: string
  maxSizeMb?: number
  fileList?: UploadFile[]
  drag?: boolean
  disabled?: boolean
}

export const uploadProps = {
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: undefined,
  },
  maxSizeMb: {
    type: Number,
    default: undefined,
  },
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => [],
  },
  drag: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}

