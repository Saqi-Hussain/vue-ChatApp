import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from '@/includes/validation'
import App from './App.vue'
import router from './router'
import VueChatScroll from 'vue-chat-scroll'



const app = createApp(App)
app.use(VueChatScroll)
app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
app.mount('#app')
