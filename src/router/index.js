import { createRouter, createWebHistory } from 'vue-router'
import { checkAuth } from '../utils/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/students',
    name: 'StudentList',
    component: () => import('../views/StudentListView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/students/add',
    name: 'StudentAdd',
    component: () => import('../views/StudentAddView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/students/edit/:id',
    name: 'StudentEdit',
    component: () => import('../views/StudentEditView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/CourseListView.vue')
  },
  {
    path: '/courses/add',
    name: 'CourseAdd',
    component: () => import('../views/CourseAddView.vue')
  },
  {
    path: '/courses/edit/:id',
    name: 'CourseEdit',
    component: () => import('../views/CourseEditView.vue')
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: () => import('../views/TeacherListView.vue')
  },
  {
    path: '/teachers/add',
    name: 'TeacherAdd',
    component: () => import('../views/TeacherAddView.vue')
  },
  {
    path: '/teachers/edit/:id',
    name: 'TeacherEdit',
    component: () => import('../views/TeacherEditView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !checkAuth()) {
    next('/login')
  } else {
    next()
  }
})

export default router
