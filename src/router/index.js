import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import Profile from '../views/Profile.vue'
import Chat from '../views/Chat.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login
    },
    {
      name: 'signup',
      path: '/signup',
      component: SignUp
    },
    {
      name: 'profile',
      path: '/profile',
      component: Profile
    },
    {
      name: 'chat',
      path: '/chat',
      component: Chat
    }
  ]
})

export default router
