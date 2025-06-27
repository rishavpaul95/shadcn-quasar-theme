<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="auth-background">
        <div class="absolute top-0 right-0 z-50 p-4">
          <q-btn
            flat
            round
            :icon="themeStore.themeIcon"
            color="white"
            @click="themeStore.toggleTheme"
            class="hover:opacity-80 transition-opacity"
          >
            <q-tooltip>Toggle {{ themeStore.isDarkMode ? 'Light' : 'Dark' }} Mode</q-tooltip>
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
.auth-background {
  @apply min-h-screen flex items-center justify-center relative transition-all duration-300;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.dark .auth-background {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}
</style>
