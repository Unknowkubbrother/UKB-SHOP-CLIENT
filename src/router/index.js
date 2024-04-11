import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/LOGIN/Login.vue'
import NotFound from '../views/NotFound.vue'
import Master from '../page/Master.vue'
import Home from '../components/Home/Home.vue'
import Store from '../components/Store/Store.vue'
import Register from '../components/Register/Register.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import { toast } from 'vue3-toastify'
import axios from 'axios'
import { config } from '../config.js'
const routes = [
  {
    name: 'Master',
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
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
          guard(to, from, next)
        }
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
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
  }
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
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active' // active class for *exact* links.
})

router.beforeEach((to, from, next) => {
  // if ((to.name == 'Login' && window.$cookies.get('logged_in')|| (to.name == 'Register' && window.$cookies.get('logged_in')))) {
  //   toast('คุณได้ Sign in ไปแล้ว!!', {
  //     theme: 'dark',
  //     type: 'warning',
  //     pauseOnHover: false,
  //     dangerouslyHTMLString: true
  //   })
  //   setTimeout(() => {
  //     next({ name: 'Home' })
  //   }, 3000)
  // } else {
  //   next()
  // }
  if(to.name == 'Login' || to.name == 'Register'){
    if(!window.$cookies.get('logged_in')){
      next()
    }else if(window.$cookies.get('logged_in')){
      const api = `${config.EndPoint}/auth/session`
    axios
      .post(api, {}, { withCredentials: true })
      .then(async (res) => {
        if (res.status === 200) {
          toast('คุณได้ Sign in ไปแล้ว!!', {
            theme: 'dark',
            type: 'warning',
            pauseOnHover: false,
            dangerouslyHTMLString: true
          })
          setTimeout(() => {
            next({ name: 'Home'})
          }, 3000)
        }
      })
      .catch(async (err) => {
        console.log(err)
            await window.$cookies.remove('logged_in', { path: '/' , domain: '.unknowkubbrother.net'})
            await window.$cookies.remove('ukb-auth', { path: '/' , domain: '.unknowkubbrother.net'})
            await window.$cookies.remove('ukb-data', { path: '/' , domain: '.unknowkubbrother.net'})
            next({ name: 'Login' })
        })
    }
  }else{
    next()
  }
})

const guard = (to, from, next) => {
  const api = `${config.EndPoint}/auth/session`
  axios
    .post(api, {}, { withCredentials: true })
    .then(async (res) => {
      if (res.status === 200) {
        next()
        return
      }
    })
    .catch((err) => {
      console.log(err)
      toast('sessionToken expried!!', {
        theme: 'dark',
        type: 'error',
        pauseOnHover: false,
        dangerouslyHTMLString: true
      })
      setTimeout(() => {
        next({ name: 'Login' })
      }, 3000)
    })
}

export default router
