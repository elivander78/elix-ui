import type { App, Plugin } from 'vue'
import { applyTheme, getCurrentTheme, type UiOptions } from '../utils/theme'
import '../styles/index.scss'

export function createUi(options: UiOptions = {}): Plugin {
  return {
    install(app: App) {
      // Apply theme if provided, otherwise load from localStorage or default to light
      if (options.theme) {
        applyTheme(options.theme)
      } else {
        // Try to load from localStorage, fallback to light
        const savedTheme = getCurrentTheme()
        applyTheme(savedTheme)
      }
    },
  }
}

export default createUi

