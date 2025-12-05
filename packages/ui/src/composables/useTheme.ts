import { ref, watch, onMounted } from 'vue'
import type { Ref } from 'vue'
import { applyTheme, getCurrentTheme, type ThemeMode, type ThemeConfig } from '../utils/theme'

export function useTheme(initialTheme?: ThemeMode | ThemeConfig) {
  // If initialTheme is provided, use it; otherwise load from localStorage
  const savedTheme = initialTheme || getCurrentTheme()
  const theme = ref<ThemeMode | ThemeConfig>(savedTheme)

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
    // Apply the theme on mount (will load from localStorage if no initialTheme)
    const themeToApply = initialTheme || getCurrentTheme()
    theme.value = themeToApply
    applyTheme(themeToApply)
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

