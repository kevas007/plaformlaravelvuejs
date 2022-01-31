import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/stepper',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/',
    name: 'Accueil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Accueil.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashbord',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Dashbord.vue')
  },
  {
    path: '/todos',
    name: 'Todos',
    meta: {
      requiresAuth: true,
      requiresFinish: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../components/Todos.vue')
  },
  {
    path: '/messages',
    name: 'Messages',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../components/Messages.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

  //Vérifie si la route requiert d'être connecté 
  if (to.matched.some(record => record.meta.requiresAuth)) {

    // Si le user n'est pas connecté, il est redirigé vers la page home
    if (store.state.token == null) {
      next({
        name: 'Accueil',
      });
    } else {

      // Sinon, si le user est connecté, on vérifie si la route requiert d'avoir
      // fini de compléter son profil
      if (to.matched.some(record => record.meta.requiresFinish)) {

        // Vérifie si le user a fini de compléter son profil
        // Si le user n'a pas d'entreprise, c'est qu'il n'a pas fini de compléter son profil
        if (!store.state.entreprise) {
          next({
            name: 'Home',
          })

          // Sinon, on le laisse continuer sa route :)
        } else {
          next()
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})



export default router