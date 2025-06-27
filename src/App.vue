<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from 'src/stores/theme'
import { useAuthStore } from 'src/stores/auth'

const themeStore = useThemeStore()
const authStore = useAuthStore()

onMounted(() => {
  // Initialize theme
  themeStore.initializeTheme()

  // Initialize auth
  authStore.initializeAuth()
})
</script>
