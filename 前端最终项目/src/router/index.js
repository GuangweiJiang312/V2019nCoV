import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(VueRouter)

const worldMap = () => import('views/mapView/mapRouter/worldMap.vue')
const gaodeMap = () => import('views/mapView/mapRouter/gaodeMap.vue')
const donationsMap = () => import('views/mapView/mapRouter/donationsMap.vue')

const routes = [
  {
    path:'',
    redirect:'/worldMap'
  },
  {
    path:'/worldMap',
    component:worldMap
  },
  {
    path:'/chinaMap',
    component:gaodeMap
  },
  {
    path:'/donationsMap',
    component:donationsMap
  }
]

const router = new VueRouter({
  routes
})

export default router
