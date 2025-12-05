import type { App, Plugin } from 'vue'
import { applyTheme, type UiOptions } from '../utils/theme'
import '../styles/index.scss'

export function createUi(options: UiOptions = {}): Plugin {
  return {
    install(app: App) {
      // Apply theme if provided
      if (options.theme) {
        applyTheme(options.theme)
      } else {
        // Default to light theme
        applyTheme('light')
      }
    },
  }
}

export default createUi

