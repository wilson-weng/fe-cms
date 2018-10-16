import Vue from 'vue'
import VueRouter from 'vue-router'
import login from './site/views/login.vue'
import main from './site/views/main.vue'
import worktable from './site/views/workTable.vue'
import company from './site/views/companyList.vue'
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
      path: '/worktable',
      name: 'worktable',
      component: worktable,
    },{
      path: '/data',
      name: 'data',
      component: dataGetter,
    }]
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
