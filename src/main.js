// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import HomeBody from './components/HomeBody'
import Register from './components/Register'
import Login from './components/Login'
import ShopCart from './components/ShopCart'
import Collect from './components/Collect'
import Message from './components/Message'
import PersonalCenter from './components/PersonalCenter'
import Discount from './components/Discount'
import Recommend from './components/Recommend'
import Fresh from './components/Fresh'
import ProductDetails from './components/ProductDetails'
import NotFound from './components/NotFound'
import SearchResults from './components/SearchResults'
// import RecommendDetails from './components/RecommendDetails'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import axios from 'axios'
import { store } from './store/store'
Vue.config.productionTip = false
Vue.prototype.$axios = axios// 全局注册，使用方法为:this.$axios
Vue.use(VueRouter)
Vue.use(ViewUI)
Vue.use(VuePhotoZoomPro)
const routes = [
  {
    path: '/',
    component: HomeBody
  },
  {
    path: '/index.html',
    component: HomeBody
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/collect',
    component: Collect
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/personal',
    component: PersonalCenter
  },
  {
    path: '/fresh',
    component: Fresh
  },
  {
    path: '/discount',
    component: Discount
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/product-details',
    component: ProductDetails
  },
  {
    path: '/miss',
    component: NotFound
  },
  {
    path: '/search-results',
    component: SearchResults
  }
  // {
  //   path: '/recommend-details',
  //   component: RecommendDetails
  // }
]
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  routes
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>'
})
