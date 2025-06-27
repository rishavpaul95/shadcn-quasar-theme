import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    isAuthenticated: false
  }),

  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated && !!state.token
  },

  actions: {
    // Initialize auth state from localStorage
    initializeAuth() {
      const token = LocalStorage.getItem('authToken')
      const user = LocalStorage.getItem('authUser')

      if (token) {
        this.token = token
        this.user = user
        this.isAuthenticated = true
      }
    },

    // Login action
    login(token, user = null) {
      this.token = token
      this.user = user
      this.isAuthenticated = true

      // Persist to localStorage
      LocalStorage.set('authToken', token)
      if (user) {
        LocalStorage.set('authUser', user)
      }
    },

    // Register action
    register(token, user = null) {
      this.token = token
      this.user = user
      this.isAuthenticated = true

      // Persist to localStorage
      LocalStorage.set('authToken', token)
      if (user) {
        LocalStorage.set('authUser', user)
      }
    },

    // Logout action
    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false

      // Clear localStorage
      LocalStorage.remove('authToken')
      LocalStorage.remove('authUser')
    },

    // Update user info
    updateUser(user) {
      this.user = user
      LocalStorage.set('authUser', user)
    },

    // Check if token exists and is valid
    checkAuth() {
      const token = LocalStorage.getItem('authToken')
      if (token) {
        this.token = token
        this.user = LocalStorage.getItem('authUser')
        this.isAuthenticated = true
        return true
      }
      return false
    },

    // Verify token with server
    async verifyToken() {
      const token = this.token || LocalStorage.getItem('authToken')
      if (!token) {
        return false
      }

      try {
        const response = await api.get('/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // Update user data from server
        this.user = response.data.user
        this.token = token
        this.isAuthenticated = true

        // Update localStorage with fresh user data
        LocalStorage.set('authUser', response.data.user)

        return true
      } catch (error) {
        console.error('Token verification failed:', error)
        // Token is invalid, clear auth state
        this.logout()
        return false
      }
    },

    // Refresh user data from server
    async refreshUser() {
      if (!this.isAuthenticated) {
        return false
      }

      try {
        const response = await api.get('/me')
        this.updateUser(response.data.user)
        return true
      } catch (error) {
        console.error('Failed to refresh user data:', error)
        return false
      }
    }
  }
})
