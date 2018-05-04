import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Bank from '@/views/banks/Bank'
import Student from '@/views/students/Student'
import Parent from '@/views/parents/Parent'
import Payment from '@/views/payments/Payment'
import UserList from '@/views/users/UserList.vue'
import Post from '@/views/users/Post.vue'
import SchoolList from '@/views/schools/SchoolList.vue'

// Views - Components
import Login from '@/views/pages/Login'
import Register from '@/views/pages/Register'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'payments',
          redirect: '/payments/payments',
          name: 'Payments',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'payments',
              name: 'Payment Panel',
              component: Payment
            }
          ]
        },
        {
          path: 'schools',
          redirect: '/schools/schools',
          name: 'Schools',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'schools',
              name: 'School Panel',
              component: SchoolList
            }
          ]
        },
        {
          path: 'banks',
          redirect: '/banks/banks',
          name: 'Banks',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'banks',
              name: 'Bank Panel',
              component: Bank
            }
          ]
        },
        {
          path: 'parents',
          redirect: '/parents/parents',
          name: 'Parents',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'parents',
              name: 'Parent Panel',
              component: Parent
            }
          ]
        },
        {
          path: 'students',
          redirect: '/students/students',
          name: 'Students',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'students',
              name: 'Student Panel',
              component: Student
            }
          ]
        },
        {
          path: 'users',
          redirect: '/users/users',
          name: 'Users',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'user-list',
              name: 'User Panel',
              component: UserList
            },
            // {
            //   path: 'create-user',
            //   name: 'Create User',
            //   component: CreateUser
            // },
            {
              path: 'posts',
              name: 'posts',
              component: Post
            }
          ]
        }
      ]
    },
    {
      path: '/authentication',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ],
      meta: {
        forVisitors: true
      }
    }
  ]
})
