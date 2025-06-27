<template>
  <q-page class="q-pa-lg bg-background">
    <div class="text-h4 q-mb-md text-foreground">Dashboard</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 text-foreground">
          Welcome to your Dashboard,
          {{ authStore.user?.fullName || authStore.user?.username || 'User' }}!
        </div>
        <p class="text-muted">This is a protected route that requires authentication to access.</p>
        <div v-if="authStore.user" class="q-mt-md">
          <p class="text-foreground"><strong>Username:</strong> {{ authStore.user.username }}</p>
          <p class="text-foreground"><strong>Email:</strong> {{ authStore.user.email }}</p>
          <p class="text-foreground"><strong>User ID:</strong> {{ authStore.user.id }}</p>
        </div>

        <div class="q-mt-md">
          <q-btn
            color="primary"
            label="Refresh User Data"
            @click="refreshUserData"
            :loading="refreshing"
            unelevated
          />
        </div>
      </q-card-section>
    </q-card>

    <div class="row q-gutter-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="stats-card">
          <q-card-section class="text-center">
            <q-icon name="people" size="3rem" class="stats-icon" />
            <div class="text-h6 q-mt-sm text-foreground">Users</div>
            <div class="text-subtitle2 text-muted">1,234</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="stats-card">
          <q-card-section class="text-center">
            <q-icon name="shopping_cart" size="3rem" class="stats-icon" />
            <div class="text-h6 q-mt-sm text-foreground">Orders</div>
            <div class="text-subtitle2 text-muted">567</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="stats-card">
          <q-card-section class="text-center">
            <q-icon name="attach_money" size="3rem" color="positive" />
            <div class="text-h6 q-mt-sm text-foreground">Revenue</div>
            <div class="text-subtitle2 text-muted">$12,345</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="stats-card">
          <q-card-section class="text-center">
            <q-icon name="trending_up" size="3rem" color="info" />
            <div class="text-h6 q-mt-sm text-foreground">Growth</div>
            <div class="text-subtitle2 text-muted">+15%</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const authStore = useAuthStore()
const refreshing = ref(false)

const refreshUserData = async () => {
  refreshing.value = true
  try {
    const success = await authStore.refreshUser()
    if (success) {
      $q.notify({
        type: 'positive',
        message: 'User data refreshed successfully',
        position: 'top',
      })
    } else {
      $q.notify({
        type: 'negative',
        message: 'Failed to refresh user data',
        position: 'top',
      })
    }
  } catch (error) {
    console.error('Error refreshing user data:', error)
    $q.notify({
      type: 'negative',
      message: 'Error refreshing user data',
      position: 'top',
    })
  } finally {
    refreshing.value = false
  }
}
</script>
