import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import Person from './views/Person'
import Home from './views/Home'
import Faq from './views/Faq'

Vue.use(Router)
Vue.use(Meta)




export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      // redirect: "/search"
      component: Home
    },

    {
      path: '/person/:id',
      component: Person
    },

    {
      path: '/faq',
      component: Faq
    }
  ]
})
