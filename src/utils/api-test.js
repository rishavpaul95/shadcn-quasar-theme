import { api } from 'src/boot/axios'

// Test API connection
export async function testApiConnection() {
  try {
    const response = await api.get('/health')
    console.log('API Health Check:', response.data)
    return true
  } catch (error) {
    console.error('API Connection Error:', error.message)
    return false
  }
}

// Test endpoints
export async function testLogin(email, password) {
  try {
    const response = await api.post('/login', { email, password })
    console.log('Login Test Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Login Test Error:', error.response?.data || error.message)
    throw error
  }
}

export async function testRegister(userData) {
  try {
    const response = await api.post('/register', userData)
    console.log('Register Test Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Register Test Error:', error.response?.data || error.message)
    throw error
  }
}

export async function testMe(token) {
  try {
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Me Endpoint Test Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Me Endpoint Test Error:', error.response?.data || error.message)
    throw error
  }
}
