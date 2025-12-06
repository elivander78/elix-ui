import type { PropType, VNode } from 'vue'

export type StatisticTrend = 'up' | 'down' | 'none'

export interface StatisticProps {
  title: string
  value: string | number
  prefix?: VNode
  suffix?: VNode
  trend?: StatisticTrend
  description?: string
}

export const statisticProps = {
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  prefix: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  suffix: {
    type: Object as PropType<VNode>,
    default: undefined,
  },
  trend: {
    type: String as PropType<StatisticTrend>,
    default: 'none' as StatisticTrend,
  },
  description: {
    type: String,
    default: '',
  },
}

