<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from 'src/stores/theme'
import { useAuthStore } from 'src/stores/auth'
import { initShadcnUI } from 'src/utils/shadcn-theme'

const themeStore = useThemeStore()
const authStore = useAuthStore()

onMounted(() => {
  // Initialize shadcn/ui theme
  initShadcnUI()

  // Initialize theme
  themeStore.initializeTheme()

  // Initialize auth
  authStore.initializeAuth()
})
</script>
