import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import PersonList from './views/PersonList'
import Person from './views/Person'
import Paper from './views/Paper'
import Home from './views/Home'
import Faq from './views/Faq'


Vue.use(Router)
Vue.use(Meta)




export default new Router({
  mode: "history",
    scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
},
  routes: [
    {
      path: '/',
      // redirect: "/search"
      component: Home
    },

    {
      path: '/investigators',
      component: PersonList
    },

    {
      path: '/person/:id',
      component: Person
    },

    {
      path: '/person/:personId/paper/:paperId',
      component: Paper
    },

    {
      path: '/faq',
      component: Faq
    }
  ]
})
