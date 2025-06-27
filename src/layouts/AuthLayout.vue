<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="auth-background" :class="{ 'auth-background--dark': themeStore.isDarkMode }">
        <div class="auth-theme-toggle">
          <q-btn
            flat
            round
            :icon="themeStore.themeIcon"
            color="white"
            @click="themeStore.toggleTheme"
            class="q-ma-md"
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
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background 0.3s ease;
}

.auth-background--dark {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
}

.auth-theme-toggle {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}
</style>
