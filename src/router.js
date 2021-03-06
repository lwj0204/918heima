import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue'
import Main from './views/home/main.vue'
import Login from './views/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        }, {
          path: 'comment',
          component: () => import('./views/comment') // 按需加载
        }, {
          path: 'material',
          component: () => import('./views/material')
        }, {
          path: 'articles',
          component: () => import('./views/articles')
        }
      ]
    }, {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
