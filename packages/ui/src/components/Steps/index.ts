import Steps from './Steps.vue'
import Step from './Step.vue'
import type { App } from 'vue'

Steps.install = (app: App) => {
  app.component(Steps.name || 'EuiSteps', Steps)
  app.component(Step.name || 'EuiStep', Step)
}

Step.install = (app: App) => {
  app.component(Step.name || 'EuiStep', Step)
}

export { Steps, Step }
export type { StepsProps, StepProps, StepsDirection, StepsStatus, StepsSize } from './Steps'
export default Steps

