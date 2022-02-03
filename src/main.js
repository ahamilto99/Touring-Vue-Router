import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// reactive global store object
const GStore = reactive({ flashMessage: '' })

createApp(App)
  .use(store)
  .use(router)
  .provide('GStore', GStore) // provide so other objects can inject it
  .mount('#app')
