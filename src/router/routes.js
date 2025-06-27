import { requireAuth, requireGuest } from './guards'

const routes = [
  // Auth routes - using AuthLayout
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: requireGuest,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue')
      }
    ]
  },

  // Main app routes - using MainLayout with auth guard
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/DashboardPage.vue')
      },
      {
        path: 'components',
        name: 'components',
        component: () => import('pages/ComponentShowcase.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
