<template>
  <q-page class="flex flex-center column q-gutter-md">
    <q-card class="themed-card q-pa-xl text-center" style="max-width: 600px">
      <div class="text-h4 themed-text-primary q-mb-md">Welcome to Your Dashboard!</div>
      <div class="text-subtitle1 themed-text-secondary q-mb-lg">
        You are successfully authenticated and ready to explore.
      </div>

      <div class="row q-gutter-md justify-center">
        <q-btn
          color="primary"
          label="Go to Dashboard"
          @click="$router.push({ name: 'dashboard' })"
          rounded
          size="lg"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup></script>
