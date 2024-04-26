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
import Admin from '../components/Admin/Admin.vue'
import storeChildren from '../components/Store/childern/storeChildern.vue'
import Cart from '../components/Cart/Cart.vue'
import Order from '../components/Order/Order.vue'
import Script_Admin from '../components/Admin/page/Script/Script_Admin.vue'
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
      },
      {
        name: 'Admin',
        path: '/admin',
        component: Admin,
        beforeEnter: (to, from, next) => {
          guardAdmin(to, from, next)
        }
      },
      {
        name: 'storeChildren',
        path: '/store/:id',
        component: storeChildren,
        beforeEnter: (to, from, next) => {
          const id = to.params.id
          isValidId(id).then((res) => {
            if (res) {
              next()
            } else {
              next({ name: 'NotFound' })
            }
          })
        }
      },
      {
        name: 'Cart',
        path: '/cart',
        component: Cart,
        beforeEnter: (to, from, next) => {
          guard(to, from, next)
        }
      },
      {
        name: 'Order',
        path: '/order',
        component: Order,
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
  {
    name: 'ForgotPassword',
    path: '/forgot-password',
    component: import('../components/ForgotPassword/ForgotPassword.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  {
    name: 'Admin',
    path: '/admin',
    component: Admin,
    redirect: '/admin/script',
    beforeEnter: (to, from, next) => {
      guardAdmin(to, from, next)
    },
    children: [
      {
        name: 'Script_Admin',
        path: '/admin/script',
        component: Script_Admin,
      },
      {
        name: 'Script_Admin_Childern',
        path: '/admin/script/:id',
        component: import('../components/Admin/page/Script/childern/Script_Admin_Childern.vue'),
        beforeEnter: (to, from, next) => {
          const id = to.params.id
          isValidId(id).then((res) => {
            if (res) {
              next()
            } else {
              next({ name: 'NotFound' })
            }
          })
        }
      },
      {
        name: 'Payment_Admin',
        path: '/admin/payment',
        component: import('../components/Admin/page/Payment/Payment_Admin.vue')
      },
      {
        name: 'Custom_License',
        path: '/admin/custom_license',
        component: import('../components/Admin/page/Script/childern/Custom_License.vue')
      }
    ],
    
  },
  
]
const router = createRouter({
  history: createWebHistory('/'),
  routes,
  linkActiveClass: 'active', // active class for non-exact links.
  linkExactActiveClass: 'active' // active class for *exact* links.
})

router.beforeEach((to, from, next) => {
  if (to.name == 'Login' || to.name == 'Register' || to.name == 'ForgotPassword') {
    if (!window.$cookies.get('logged_in')) {
      next()
    } else if (window.$cookies.get('logged_in')) {
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
              next({ name: 'Home' })
            }, 3000)
          }
        })
        .catch(async (err) => {
          console.log(err)
          window.$cookies.remove('logged_in')
          window.$cookies.remove('ukb-auth')
          window.$cookies.remove('ukb-data')
          next({ name: 'Login' })
        })
    }
  } else {
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

const guardAdmin = (to, from, next) => {
  const api = `${config.EndPoint}/auth/session`
  axios
    .post(api, {}, { withCredentials: true })
    .then(async (res) => {
      if (res.status === 200) {
        if (window.$cookies.get('ukb-data').role == 'staff') {
          next()
          return
        } else {
          toast('คุณไม่มีสิทธิ์เข้าใช้งานหน้านี้!!', {
            theme: 'dark',
            type: 'error',
            pauseOnHover: false,
            dangerouslyHTMLString: true
          })
          setTimeout(() => {
            next({ name: 'Home' })
          }, 3000)
        }
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

const isValidId = async (id) => {
  const api = `${config.EndPoint}/script/${id}`
  try {
    const res = await axios.get(api)
    if (res.status === 200) {
      return true
    }
  } catch (err) {
    console.log(err.response.status)
    return false
  }
}

export default router
