import Steps from './Steps.vue'
import Step from './Step.vue'
import type { App } from 'vue'

Steps.install = (app: App) => {
  app.component(Steps.name, Steps)
  app.component(Step.name, Step)
}

Step.install = (app: App) => {
  app.component(Step.name, Step)
}

export { Steps, Step }
export type { StepsProps, StepProps, StepsDirection, StepsStatus, StepsSize } from './Steps'
export default Steps

