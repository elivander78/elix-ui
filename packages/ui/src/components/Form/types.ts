export interface FormRules {
  [key: string]: Array<{
    required?: boolean
    message?: string
    validator?: (value: any) => boolean | Promise<boolean>
    trigger?: 'blur' | 'change'
  }>
}

export interface FormInstance {
  validate: () => Promise<boolean>
  reset: () => void
}

