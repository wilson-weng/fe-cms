import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './site/views/login.vue'
import main from './site/views/main.vue'
import plugin from './site/views/plugin.vue'
import company from './site/views/companyList.vue'
import feconfigure from './site/views/feconfigure.vue'
import dataGetter from './site/views/dataGetter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: "/",
    name: "main",
    component: main,
    children: [{
      path: '/company',
      name: 'company',
      component: company,
    },{
      path: '/plugin',
      name: 'plugin',
      component: plugin,
    },{
      path: '/feconfigure',
      name: 'feconfigure',
      component: feconfigure,
    }]
  },
  {
    path: '/data',
    name: 'data',
    component: dataGetter,
  },
  {
    path: '/logout',
    name: 'logout',
    redirect: '/login',
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes: routes,
})

export default router
