<template>
  <q-page class="flex items-center justify-center min-h-screen p-4">
    <q-card class="p-6 text-center max-w-lg w-full">
      <div class="text-2xl font-semibold text-foreground mb-4">Welcome to Your Dashboard!</div>
      <div class="text-muted mb-6">You are successfully authenticated and ready to explore.</div>

      <div class="flex justify-center">
        <q-btn
          color="primary"
          label="Go to Dashboard"
          @click="$router.push({ name: 'dashboard' })"
          size="lg"
          unelevated
          class="font-medium"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup></script>
