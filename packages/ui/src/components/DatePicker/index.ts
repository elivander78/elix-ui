import BaseDatePicker from './BaseDatePicker.vue'
import DatePicker from './DatePicker.vue'
import type { App } from 'vue'

BaseDatePicker.install = (app: App) => {
  app.component(BaseDatePicker.name || 'EuiBaseDatePicker', BaseDatePicker)
}

DatePicker.install = (app: App) => {
  app.component(DatePicker.name || 'EuiDatePicker', DatePicker)
}

export { BaseDatePicker, DatePicker }
export type { BaseDatePickerProps, DatePickerSize, DatePickerStatus, DatePickerAppearance } from './BaseDatePicker'
export default DatePicker

