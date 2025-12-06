import Result from './Result.vue'
import type { App } from 'vue'

Result.install = (app: App) => {
  app.component(Result.name || 'EuiResult', Result)
}

export { Result }
export type { ResultProps, ResultStatus } from './Result'
export default Result

