import Slider from './Slider.vue'
import type { App } from 'vue'

Slider.install = (app: App) => {
  app.component(Slider.name || 'EuiSlider', Slider)
}

export { Slider }
export type { SliderProps, SliderSize, SliderTooltip } from './Slider'
export default Slider

