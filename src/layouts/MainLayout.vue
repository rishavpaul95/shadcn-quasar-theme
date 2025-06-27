<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div v-if="authStore.user" class="q-mr-md">
          Welcome, {{ authStore.user.fullName || authStore.user.username }}!
        </div>

        <q-btn
          flat
          dense
          round
          :icon="themeStore.themeIcon"
          aria-label="Toggle Theme"
          @click="themeStore.toggleTheme"
          class="q-mr-sm"
        >
          <q-tooltip>Toggle {{ themeStore.isDarkMode ? 'Light' : 'Dark' }} Mode</q-tooltip>
        </q-btn>

        <q-btn
          flat
          dense
          round
          icon="palette"
          aria-label="Theme Settings"
          @click="showThemeSettings = true"
          class="q-mr-sm"
        >
          <q-tooltip>Theme Settings</q-tooltip>
        </q-btn>

        <q-btn flat dense round icon="logout" aria-label="Logout" @click="logout" />
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Theme Settings Dialog -->
    <ThemeSettings v-model="showThemeSettings" />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { useThemeStore } from 'src/stores/theme'
import EssentialLink from 'components/EssentialLink.vue'
import ThemeSettings from 'components/ThemeSettings.vue'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const showThemeSettings = ref(false)

const logout = () => {
  // Use Pinia store to handle logout
  authStore.logout()

  $q.notify({
    type: 'positive',
    message: 'Logged out successfully',
  })

  // Redirect to login
  router.push({ name: 'login' })
}

const linksList = [
  {
    title: 'Home',
    caption: 'Main page',
    icon: 'home',
    route: { name: 'home' },
  },
  {
    title: 'Dashboard',
    caption: 'User dashboard',
    icon: 'dashboard',
    route: { name: 'dashboard' },
  },
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
