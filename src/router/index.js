import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/LOGIN/Login.vue'
import NotFound from '../views/NotFound.vue'
import Master from '../page/Master.vue'
import Home from '../components/Home/Home.vue'
import Store from '../components/Store/Store.vue'
const routes = [
      {
        name: "Master",
        path: '/',
        component: Master,
        redirect: '/home',
        children: [
            {
                name: 'Home',
                path: '/home',
                component: Home
            },
            {
                name: 'Store',
                path: '/store',
                component: Store
            },


        ]
      },
      {
        name: 'Login',
        path: '/login',
        component: Login
    },
    // {
    //     path: '/page',
    //     name: 'Page',
    //     component: PAGE,
    // },
    // {
    //     path: '/login',
    //     name: 'LOGIN',
    //     component: LOGIN
    // },
    // {
    //     path: '/POST',
    //     name: 'POST',
    //     component: POST
    // },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    //   {
    //     path: '/profile',
    //     name: 'profile',
    //     component: Profile,
    //   },
    //   {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //   }
]
const router = createRouter({
    history: createWebHistory('/'),
    routes,
    linkActiveClass: "active", // active class for non-exact links.
    linkExactActiveClass: "active" // active class for *exact* links.
})

export default router