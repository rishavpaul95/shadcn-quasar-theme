<template>
  <div class="flex flex-center full-height">
    <q-card class="q-pa-md shadow-2 themed-card" bordered>
      <q-card-section class="text-center">
        <div class="text-h5 text-weight-bold themed-text-primary">Create Account</div>
        <div class="themed-text-secondary">Sign up to get started with your account</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="register" ref="registerForm" class="q-gutter-md">
          <q-input
            dense
            outlined
            v-model="firstName"
            label="First Name"
            type="text"
            :rules="nameRules"
            lazy-rules
          />
          <q-input
            dense
            outlined
            v-model="lastName"
            label="Last Name"
            type="text"
            :rules="nameRules"
            lazy-rules
          />
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
            v-model="password"
            type="password"
            label="Password"
            :rules="passwordRules"
            lazy-rules
          />
          <q-input
            dense
            outlined
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            :rules="confirmPasswordRules"
            lazy-rules
          />

          <q-btn
            type="submit"
            style="border-radius: 8px"
            color="dark"
            rounded
            size="md"
            label="Create Account"
            no-caps
            class="full-width q-mt-md"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center q-pt-none">
        <div class="themed-text-secondary">
          Already have an account?
          <a
            @click="$router.push({ name: 'login' })"
            class="text-weight-bold cursor-pointer themed-link"
            style="text-decoration: none"
          >
            Sign in.
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
  name: 'RegisterPage',
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const authStore = useAuthStore()
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    const registerForm = ref(null)

    // Validation rules
    const nameRules = [
      (val) => !!val || 'This field is required',
      (val) => val.length >= 2 || 'Name must be at least 2 characters',
    ]

    const emailRules = [
      (val) => !!val || 'Email is required',
      (val) => val.includes('@') || 'Please enter a valid email address',
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Please enter a valid email format',
    ]

    const passwordRules = [
      (val) => !!val || 'Password is required',
      (val) => val.length >= 6 || 'Password must be at least 6 characters',
      (val) =>
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(val) ||
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ]

    const confirmPasswordRules = [
      (val) => !!val || 'Please confirm your password',
      (val) => val === password.value || 'Passwords do not match',
    ]

    const register = async () => {
      // Validate form before submission
      const isValid = await registerForm.value.validate()
      if (!isValid) {
        $q.notify({
          type: 'negative',
          message: 'Please fix the form errors before submitting',
        })
        return
      }

      loading.value = true
      try {
        // Make actual API call to register endpoint
        const response = await api.post('/register', {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
        })

        // Extract token and user data from API response
        const { token, user } = response.data

        // Use Pinia store to handle registration
        authStore.register(token, user)

        $q.notify({
          type: 'positive',
          message: 'Account created successfully! Welcome!',
        })

        // Redirect to home page
        router.push('/')
      } catch (error) {
        console.error('Registration error:', error)

        let errorMessage = 'Registration failed. Please try again.'

        // Handle specific error messages from API
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.response?.status === 422) {
          errorMessage = 'Please check your input data.'
        } else if (error.response?.status === 409) {
          errorMessage = 'An account with this email already exists.'
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
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      loading,
      register,
      registerForm,
      nameRules,
      emailRules,
      passwordRules,
      confirmPasswordRules,
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
