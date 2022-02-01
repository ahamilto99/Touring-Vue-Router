import { createRouter, createWebHistory } from 'vue-router'
import About from '@/views/About.vue'
import EventList from '@/views/EventList.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    // nested routes
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: '/register',
        name: 'EventRegister',
        props: true,
        component: EventRegister
      },
      {
        path: '/edit',
        name: 'EventEdit',
        props: true,
        component: EventEdit
      }
    ]
  },
  {
    path: '/event/:afterEvent(.*)',
    // redirects edit and register from /event/#/... to /events/#/...
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    // passes in the resource path variable as a prop
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
