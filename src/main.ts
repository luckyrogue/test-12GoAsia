import { createApp } from 'vue'
import App from './App.vue'
import { globalComponents } from '@/components/components.exports'

const app = createApp(App)

app.use(globalComponents)

app.mount('#app')
