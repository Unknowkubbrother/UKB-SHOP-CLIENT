import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import 'vue3-toastify/dist/index.css';


const app = createApp(App)
app.use(router)
app.component('Menu1', Menu)
app.component('MenuButton', MenuButton)
app.component('MenuItems', MenuItems)
app.component('MenuItem', MenuItem)
app.mount('#app')