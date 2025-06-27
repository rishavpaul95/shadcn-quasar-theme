<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4">
    <q-card class="w-full max-w-md shadcn-card">
      <q-card-section class="text-center space-y-2">
        <div class="text-2xl font-semibold text-foreground">Create Account</div>
        <div class="text-muted">Sign up to get started with your account</div>
      </q-card-section>
      <q-card-section class="p-6">
        <q-form @submit="register" ref="registerForm" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">First Name</label>
              <q-input
                dense
                outlined
                v-model="firstName"
                type="text"
                :rules="nameRules"
                lazy-rules
                class="shadcn-input"
                placeholder="Enter your first name"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Last Name</label>
              <q-input
                dense
                outlined
                v-model="lastName"
                type="text"
                :rules="nameRules"
                lazy-rules
                class="shadcn-input"
                placeholder="Enter your last name"
              />
            </div>
          </div>

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

          <div class="space-y-2">
            <label class="text-sm font-medium text-foreground">Confirm Password</label>
            <q-input
              dense
              outlined
              v-model="confirmPassword"
              type="password"
              :rules="confirmPasswordRules"
              lazy-rules
              class="shadcn-input"
              placeholder="Confirm your password"
            />
          </div>

          <q-btn
            type="submit"
            class="w-full mt-6"
            color="primary"
            size="md"
            label="Create Account"
            no-caps
            :loading="loading"
            unelevated
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center pt-0">
        <div class="text-muted">
          Already have an account?
          <a @click="$router.push({ name: 'login' })" class="shadcn-link ml-1"> Sign in. </a>
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
/* Additional custom styles for shadcn/ui theme */
.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

/* Ensure proper text colors */
.text-foreground {
  color: hsl(var(--foreground)) !important;
}

.text-muted {
  color: hsl(var(--muted-foreground)) !important;
}

/* Custom input styling for better integration */
.q-field--outlined .q-field__control {
  background-color: hsl(var(--background)) !important;
  border-radius: calc(var(--radius)) !important;
}

.q-field--outlined .q-field__control:before {
  border-color: hsl(var(--border)) !important;
}

.q-field--outlined .q-field__control:hover:before {
  border-color: hsl(var(--accent-foreground)) !important;
}

.q-field--outlined.q-field--focused .q-field__control:after {
  border-color: hsl(var(--ring)) !important;
}

/* Remove Quasar's default label positioning for cleaner look */
.q-field--outlined .q-field__label {
  display: none;
}
</style>
