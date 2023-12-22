import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import * as VueRouter from 'vue-router'


import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Registeration from './pages/Registeration.vue'
import Profile from './pages/Profile.vue'
import NewBlog from './pages/NewBlog.vue'

loadFonts()

import axios from 'axios'

// 1. Define route components.
// These can be imported from other files
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/login', component: Login,  },
  { path: '/register', component: Registeration },
  { path: '/new', component: NewBlog },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

const compareToken = async (token) => {
  let response = await axios.post('http://localhost:3000/api/user/auth', {token: token})

  if (response.data.status === "success"){
    console.log(response.data.message)
    let user = {
      id: response.data.message.id,
      username: response.data.message.username,
      role: response.data.message.role,
      expiresAt: response.data.message.exp
    }
    localStorage.setItem('user', JSON.stringify(user))
    return true
  }
  else{
    return false
  }
}

router.beforeEach(async (to, from, next) => {

  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');

  if (authRequired && !token) {
    return next('/login');
  }
  else if (authRequired && token){

    let result = await compareToken(token)
    if (result){

      next()
    }
    else{
      next('/login')
    }
  }

  else{
      next()
  }

  

})





createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')
