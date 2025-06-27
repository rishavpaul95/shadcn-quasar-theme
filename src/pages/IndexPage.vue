<template>
  <q-page class="flex flex-center column q-gutter-md">
    <q-card class="themed-card q-pa-xl text-center" style="max-width: 600px">
      <div class="text-h4 themed-text-primary q-mb-md">Welcome to Your Dashboard!</div>
      <div class="text-subtitle1 themed-text-secondary q-mb-lg">
        You are successfully authenticated and ready to explore.
      </div>

      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
        class="q-mb-lg"
      />

      <div class="row q-gutter-md justify-center">
        <q-btn
          color="primary"
          label="Go to Dashboard"
          @click="$router.push({ name: 'dashboard' })"
          rounded
          size="lg"
        />
        <q-btn
          color="secondary"
          label="Settings"
          @click="showThemeSettings = true"
          rounded
          outline
          size="lg"
        />
      </div>
    </q-card>

    <!-- Theme Settings Dialog -->
    <ThemeSettings v-model="showThemeSettings" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import ThemeSettings from 'components/ThemeSettings.vue'

const showThemeSettings = ref(false)
</script>
