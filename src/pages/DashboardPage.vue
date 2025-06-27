<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-md">Dashboard</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">
          Welcome to your Dashboard,
          {{ authStore.user?.fullName || authStore.user?.username || 'User' }}!
        </div>
        <p>This is a protected route that requires authentication to access.</p>
        <div v-if="authStore.user" class="q-mt-md">
          <p><strong>Username:</strong> {{ authStore.user.username }}</p>
          <p><strong>Email:</strong> {{ authStore.user.email }}</p>
          <p><strong>User ID:</strong> {{ authStore.user.id }}</p>
        </div>

        <div class="q-mt-md">
          <q-btn
            color="primary"
            label="Refresh User Data"
            @click="refreshUserData"
            :loading="refreshing"
          />
        </div>
      </q-card-section>
    </q-card>

    <div class="row q-gutter-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card>
          <q-card-section class="text-center">
            <q-icon name="people" size="3rem" color="primary" />
            <div class="text-h6 q-mt-sm">Users</div>
            <div class="text-subtitle2">1,234</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card>
          <q-card-section class="text-center">
            <q-icon name="shopping_cart" size="3rem" color="secondary" />
            <div class="text-h6 q-mt-sm">Orders</div>
            <div class="text-subtitle2">567</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card>
          <q-card-section class="text-center">
            <q-icon name="attach_money" size="3rem" color="positive" />
            <div class="text-h6 q-mt-sm">Revenue</div>
            <div class="text-subtitle2">$12,345</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card>
          <q-card-section class="text-center">
            <q-icon name="trending_up" size="3rem" color="info" />
            <div class="text-h6 q-mt-sm">Growth</div>
            <div class="text-subtitle2">+15%</div>
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
      })
    } else {
      $q.notify({
        type: 'negative',
        message: 'Failed to refresh user data',
      })
    }
  } catch (error) {
    console.error('Error refreshing user data:', error)
    $q.notify({
      type: 'negative',
      message: 'Error refreshing user data',
    })
  } finally {
    refreshing.value = false
  }
}
</script>
