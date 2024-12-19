import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'

import { initializeTeachers } from './utils/storage'
import {initializeCourses} from './utils/storage'
import { initializeUsers } from './utils/storage'

initializeUsers()
initializeTeachers()
initializeCourses()


const app = createApp(App)
app.use(router)
app.mount('#app')
