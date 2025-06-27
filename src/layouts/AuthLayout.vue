<template>
  <q-layout view="lHh Lpr lFf" class="bg-background">
    <q-page-container>
      <div class="min-h-screen bg-background flex flex-col relative">
        <div class="absolute top-0 right-0 z-50 p-4">
          <q-btn
            flat
            round
            :icon="themeStore.themeIcon"
            class="text-foreground hover:bg-accent transition-all"
            @click="themeStore.toggleTheme"
          >
            <q-tooltip class="bg-popover text-popover-foreground border border-border">
              Toggle {{ themeStore.isDarkMode ? 'Light' : 'Dark' }} Mode
            </q-tooltip>
          </q-btn>
        </div>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useThemeStore } from 'src/stores/theme'

export default {
  name: 'AuthLayout',
  setup() {
    const themeStore = useThemeStore()

    return {
      themeStore,
    }
  },
}
</script>

<style scoped>
/* Styles are now handled in global CSS */
</style>
