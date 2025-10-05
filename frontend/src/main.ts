import './assets/base.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

const forceLightMode = () => {
  document.documentElement.style.colorScheme = 'light'
  document.documentElement.style.backgroundColor = 'white'
  document.documentElement.style.color = 'black'
  document.body.style.backgroundColor = 'white'
  document.body.style.color = 'black'
  document.body.style.colorScheme = 'light'
}

forceLightMode()
