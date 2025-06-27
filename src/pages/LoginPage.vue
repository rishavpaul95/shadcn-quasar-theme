<template>
  <div class="flex flex-center full-height">
    <q-card class="q-pa-md shadow-2 themed-card" bordered>
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold themed-text-primary">Sign in</div>
        <div class="themed-text-secondary">Sign in below to access your account</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="login" ref="loginForm" class="q-gutter-md">
          <q-input
            dense
            outlined
            v-model="email"
            label="Email Address"
            type="email"
            :rules="emailRules"
            lazy-rules
          />
          <q-input
            dense
            outlined
            class="q-mt-md"
            v-model="password"
            type="password"
            label="Password"
            :rules="passwordRules"
            lazy-rules
          />

          <q-btn
            type="submit"
            style="border-radius: 8px"
            color="dark"
            rounded
            size="md"
            label="Sign in"
            no-caps
            class="full-width q-mt-md"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="themed-text-secondary">
          Don't have an account yet?
          <a
            @click="$router.push({ name: 'register' })"
            class="text-weight-bold cursor-pointer themed-link"
            style="text-decoration: none"
          >
            Sign up.
          </a>
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

<style scoped>
.full-height {
  min-height: 100vh;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  text-decoration: underline !important;
}
</style>
