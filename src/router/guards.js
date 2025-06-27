import { useAuthStore } from 'src/stores/auth'

export function requireAuth(to, from, next) {
  const authStore = useAuthStore()

  // Check authentication status
  if (authStore.isLoggedIn || authStore.checkAuth()) {
    // User is authenticated, allow access
    next()
  } else {
    // User is not authenticated, redirect to login
    next({ name: 'login' })
  }
}

export function requireGuest(to, from, next) {
  const authStore = useAuthStore()

  // Check authentication status
  if (authStore.isLoggedIn || authStore.checkAuth()) {
    // User is already authenticated, redirect to home
    next({ path: '/' })
  } else {
    // User is not authenticated, allow access to auth pages
    next()
  }
}
