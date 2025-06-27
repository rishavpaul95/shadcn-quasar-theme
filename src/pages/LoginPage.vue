<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <q-card class="w-full max-w-md shadcn-card">
      <q-card-section class="text-center space-y-2">
        <div class="text-2xl font-semibold text-foreground">Sign in</div>
        <div class="text-muted">Sign in below to access your account</div>
      </q-card-section>
      <q-card-section class="p-6">
        <q-form @submit="login" ref="loginForm" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">Email Address</label>
            <q-input
              dense
              outlined
              v-model="email"
              type="email"
              :rules="emailRules"
              lazy-rules
              class="shadcn-input"
              placeholder="Enter your email"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">Password</label>
            <q-input
              dense
              outlined
              v-model="password"
              type="password"
              :rules="passwordRules"
              lazy-rules
              class="shadcn-input"
              placeholder="Enter your password"
            />
          </div>

          <q-btn
            type="submit"
            class="w-full mt-6"
            color="primary"
            size="md"
            label="Sign in"
            no-caps
            :loading="loading"
            unelevated
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center pt-0">
        <div class="text-muted">
          Don't have an account yet?
          <a @click="$router.push({ name: 'register' })" class="shadcn-link ml-1"> Sign up. </a>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { api } from 'src/boot/axios'

export default {
  name: 'LoginPage',
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const authStore = useAuthStore()
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const loginForm = ref(null)

    // Validation rules
    const emailRules = [
      (val) => !!val || 'Email is required',
      (val) => val.includes('@') || 'Please enter a valid email address',
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please enter a valid email format',
    ]

    const passwordRules = [
      (val) => !!val || 'Password is required',
      (val) => val.length >= 6 || 'Password must be at least 6 characters',
    ]

    const login = async () => {
      // Validate form before submission
      const isValid = await loginForm.value.validate()
      if (!isValid) {
        $q.notify({
          type: 'negative',
          message: 'Please fix the form errors before submitting',
        })
        return
      }

      loading.value = true
      try {
        // Make actual API call to login endpoint
        const response = await api.post('/login', {
          email: email.value,
          password: password.value,
        })

        // Extract token and user data from API response
        const { token, user } = response.data

        // Use Pinia store to handle login
        authStore.login(token, user)

        $q.notify({
          type: 'positive',
          message: 'Login successful',
        })

        // Redirect to home page or previous page
        router.push('/')
      } catch (error) {
        console.error('Login error:', error)

        let errorMessage = 'Login failed. Please check your credentials.'

        // Handle specific error messages from API
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.response?.status === 401) {
          errorMessage = 'Invalid email or password.'
        } else if (error.response?.status === 500) {
          errorMessage = 'Server error. Please try again later.'
        }

        $q.notify({
          type: 'negative',
          message: errorMessage,
        })
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      loading,
      login,
      loginForm,
      emailRules,
      passwordRules,
    }
  },
}
</script>
