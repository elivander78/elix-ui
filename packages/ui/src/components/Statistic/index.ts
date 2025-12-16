import Statistic from './Statistic.vue'
import type { App } from 'vue'

Statistic.install = (app: App) => {
  app.component(Statistic.name, Statistic)
}

export { Statistic }
export type { StatisticProps, StatisticTrend } from './Statistic'
export default Statistic

