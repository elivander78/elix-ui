import { ref, onMounted, onUnmounted } from 'vue'
import { breakpointValues, type Breakpoint } from '../tokens/breakpoints'

export function useBreakpoint() {
  const currentBreakpoint = ref<Breakpoint>('xs')
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  const updateBreakpoint = () => {
    const width = window.innerWidth

    if (width >= breakpointValues['2xl']) {
      currentBreakpoint.value = '2xl'
      isMobile.value = false
      isTablet.value = false
      isDesktop.value = true
    } else if (width >= breakpointValues.xl) {
      currentBreakpoint.value = 'xl'
      isMobile.value = false
      isTablet.value = false
      isDesktop.value = true
    } else if (width >= breakpointValues.lg) {
      currentBreakpoint.value = 'lg'
      isMobile.value = false
      isTablet.value = false
      isDesktop.value = true
    } else if (width >= breakpointValues.md) {
      currentBreakpoint.value = 'md'
      isMobile.value = false
      isTablet.value = true
      isDesktop.value = false
    } else if (width >= breakpointValues.sm) {
      currentBreakpoint.value = 'sm'
      isMobile.value = true
      isTablet.value = false
      isDesktop.value = false
    } else {
      currentBreakpoint.value = 'xs'
      isMobile.value = true
      isTablet.value = false
      isDesktop.value = false
    }
  }

  const isBreakpoint = (breakpoint: Breakpoint): boolean => {
    return currentBreakpoint.value === breakpoint
  }

  const isBreakpointUp = (breakpoint: Breakpoint): boolean => {
    return breakpointValues[currentBreakpoint.value] >= breakpointValues[breakpoint]
  }

  const isBreakpointDown = (breakpoint: Breakpoint): boolean => {
    return breakpointValues[currentBreakpoint.value] <= breakpointValues[breakpoint]
  }

  onMounted(() => {
    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
  })

  return {
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
  }
}

