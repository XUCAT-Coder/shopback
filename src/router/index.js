import { createRouter, createWebHashHistory } from 'vue-router'
const home = () =>
  import(/* webpackChunkName: "home" */ '../views/Home.vue')
const welcome = () =>
  import(/* webpackChunkName: "welcome" */ '../components/Welcome/welcome.vue')
const users = () =>
  import(/* webpackChunkName: "users" */ '../components/asideLists/users.vue')
const roles = () =>
  import(/* webpackChunkName: "roles" */ '../components/asideLists/roles.vue')
const rights = () =>
  import(/* webpackChunkName: "rights" */ '../components/asideLists/rights.vue')
const categories = () =>
  import(
    /* webpackChunkName: "category" */ '../components/asideLists/goods_cate.vue'
  )
const params = () =>
  import(/* webpackChunkName: "params" */ '../components/asideLists/params.vue')
const goods = () =>
  import(/* webpackChunkName: "goods" */ '../components/asideLists/goods.vue')
const addGoods = () =>
  import(/* webpackChunkName: "add" */ '../components/asideLists/add.vue')
const orders = () =>
  import(/* webpackChunkName: "orders" */ '../components/asideLists/orders.vue')
const reports = () =>
  import(
    /* webpackChunkName: "reports" */ '../components/asideLists/reports.vue'
  )
const login = () =>
  import(/* webpackChunkName: "login" */ '../components/Login/login.vue')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: welcome
      },
      {
        path: '/users',
        component: users
      },
      {
        path: '/roles',
        component: roles
      },
      {
        path: '/rights',
        component: rights
      },
      {
        path: '/categories',
        component: categories
      },
      {
        path: '/params',
        component: params
      },
      {
        path: '/goods',
        component: goods
      },
      {
        path: '/goods/add',
        component: addGoods
      },
      {
        path: '/orders',
        component: orders
      },
      {
        path: '/reports',
        component: reports
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from) => {
  const token = window.sessionStorage.getItem('token')
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  }
})
export default router
