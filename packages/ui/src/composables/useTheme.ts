import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import { applyTheme, getCurrentTheme, type ThemeMode, type ThemeConfig } from '../utils/theme'

export function useTheme(initialTheme?: ThemeMode | ThemeConfig) {
  const theme = ref<ThemeMode | ThemeConfig>(initialTheme || getCurrentTheme())

  const setTheme = (newTheme: ThemeMode | ThemeConfig) => {
    theme.value = newTheme
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const current = typeof theme.value === 'string' ? theme.value : getCurrentTheme()
    const newTheme: ThemeMode = current === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  onMounted(() => {
    if (initialTheme) {
      applyTheme(initialTheme)
    }
  })

  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  return {
    theme: theme as Ref<ThemeMode | ThemeConfig>,
    setTheme,
    toggleTheme,
  }
}

