import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import ServerDetail from './views/ServerDetail.vue'
import './styles.css'

const router = createRouter({ history: createWebHashHistory(), routes: [
  { path: '/', component: Dashboard },
  { path: '/server/:id', component: ServerDetail, props: true }
] })

createApp(App).use(router).mount('#app')
