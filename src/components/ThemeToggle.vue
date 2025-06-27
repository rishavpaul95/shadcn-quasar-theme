<template>
  <q-btn flat round :icon="themeIcon" @click="toggleTheme" class="theme-toggle-btn" size="sm">
    <q-tooltip class="bg-popover text-popover-foreground border border-border">
      Toggle {{ isDark ? 'Light' : 'Dark' }} Mode
    </q-tooltip>
  </q-btn>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from 'src/stores/theme'
import { toggleShadcnTheme } from 'src/utils/shadcn-theme'

const themeStore = useThemeStore()

const isDark = computed(() => themeStore.isDarkMode)
const themeIcon = computed(() => (isDark.value ? 'light_mode' : 'dark_mode'))

const toggleTheme = () => {
  toggleShadcnTheme()
}
</script>

<style scoped>
.theme-toggle-btn {
  color: hsl(var(--muted-foreground)) !important;
  transition: all 0.2s ease-in-out !important;

  &:hover {
    color: hsl(var(--foreground)) !important;
    background-color: hsl(var(--accent)) !important;
  }
}

.q-tooltip {
  background-color: hsl(var(--popover)) !important;
  color: hsl(var(--popover-foreground)) !important;
  border: 1px solid hsl(var(--border)) !important;
  border-radius: var(--radius) !important;
  font-size: 0.75rem !important;
}
</style>
