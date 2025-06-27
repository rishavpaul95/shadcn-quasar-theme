<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div v-if="authStore.user" class="q-mr-md text-foreground">
          Welcome, {{ authStore.user.fullName || authStore.user.username }}!
        </div>

        <!-- Use our custom theme toggle component -->
        <ThemeToggle class="q-mr-sm" />

        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="Logout"
          @click="logout"
          class="theme-btn"
        />
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
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import EssentialLink from 'components/EssentialLink.vue'
import ThemeToggle from 'components/ThemeToggle.vue'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

const logout = () => {
  // Use Pinia store to handle logout
  authStore.logout()

  $q.notify({
    type: 'positive',
    message: 'Logged out successfully',
    position: 'top',
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

<style scoped>
/* Header and toolbar styling */
.q-header {
  background-color: hsl(var(--background)) !important;
  border-bottom: 1px solid hsl(var(--border)) !important;
  color: hsl(var(--foreground)) !important;
}

.q-toolbar {
  background-color: hsl(var(--background)) !important;
  color: hsl(var(--foreground)) !important;
}

.q-toolbar-title {
  color: hsl(var(--foreground)) !important;
  font-weight: 600 !important;
  font-family: 'Inter', sans-serif !important;
}

/* Theme-aware buttons in header */
.theme-btn {
  color: hsl(var(--muted-foreground)) !important;
  transition: all 0.2s ease-in-out !important;

  &:hover {
    color: hsl(var(--foreground)) !important;
    background-color: hsl(var(--accent)) !important;
  }

  .q-icon {
    color: inherit !important;
  }
}

/* Menu button styling */
.q-btn[aria-label='Menu'] {
  color: hsl(var(--foreground)) !important;

  &:hover {
    background-color: hsl(var(--accent)) !important;
  }
}

/* Drawer styling */
.q-drawer {
  background-color: hsl(var(--card)) !important;
  border-right: 1px solid hsl(var(--border)) !important;
}

.q-list .q-item {
  color: hsl(var(--foreground)) !important;

  &:hover {
    background-color: hsl(var(--accent)) !important;
  }
}

.q-item-label--header {
  color: hsl(var(--muted-foreground)) !important;
  font-weight: 600 !important;
  font-family: 'Inter', sans-serif !important;
}

/* Page container */
.q-page-container {
  background-color: hsl(var(--background)) !important;
}

/* Tooltip styling */
.shadcn-tooltip {
  background-color: hsl(var(--popover)) !important;
  color: hsl(var(--popover-foreground)) !important;
  border: 1px solid hsl(var(--border)) !important;
  border-radius: var(--radius) !important;
  font-size: 0.75rem !important;
}
</style>
