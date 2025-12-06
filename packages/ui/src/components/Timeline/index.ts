import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'
import type { App } from 'vue'

Timeline.install = (app: App) => {
  app.component(Timeline.name || 'EuiTimeline', Timeline)
}

TimelineItem.install = (app: App) => {
  app.component(TimelineItem.name || 'EuiTimelineItem', TimelineItem)
}

export { Timeline, TimelineItem }
export type { TimelineProps } from './Timeline'
export type { TimelineItemProps } from './Timeline'
export default Timeline

