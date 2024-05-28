import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { Menu, MenuButton, MenuItems, MenuItem,Switch,TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import 'vue3-toastify/dist/index.css';
import VueCookies from 'vue-cookies'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import VueApexCharts from "vue3-apexcharts";
import VueCryptojs from 'vue-cryptojs'

import 'vue3-carousel/dist/carousel.css'

const app = createApp(App)
app.use(router)
app.component('Menu1', Menu)
app.component('MenuButton', MenuButton)
app.component('MenuItems', MenuItems)
app.component('MenuItem', MenuItem)
app.component('Switch1', Switch)
app.component('TabGroup', TabGroup)
app.component('TabList', TabList)
app.component('Tab', Tab)
app.component('TabPanels', TabPanels)
app.component('TabPanel', TabPanel)
app.use(VueCookies, {path: '/', domain: '.unknowkubbrother.net'})
// app.use(VueCookies ,{path: '/', domain: 'localhost'})
app.component('Carousel', Carousel)
app.component('Navigation', Navigation)
app.component('Slide', Slide)
app.use(VueApexCharts)
app.use(VueCryptojs)
app.mount('#app')
