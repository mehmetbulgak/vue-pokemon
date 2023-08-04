import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index"

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  store.commit('setUser', user);
}

createApp(App).use(router).use(store).mount('#app')
