import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import { useAuthStore } from 'src/stores/auth'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:3001/api' })

export default defineBoot(({ app, router }) => {
  // Initialize auth store
  const authStore = useAuthStore()

  // Initialize auth state from localStorage on app start
  authStore.initializeAuth()

  // Optionally verify token with server on startup
  // Uncomment the following lines if you want to verify token validity on app start
  // if (authStore.isAuthenticated) {
  //   authStore.verifyToken()
  // }

  // Add request interceptor to include auth token
  api.interceptors.request.use(
    (config) => {
      const token = authStore.getToken
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Add response interceptor to handle 401 errors
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Clear the auth token since it's invalid
        authStore.logout()

        // Redirect to login route
        router.push({ name: 'login' })
      }
      return Promise.reject(error)
    }
  )

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
