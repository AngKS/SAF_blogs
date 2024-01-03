import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import * as VueRouter from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'


import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Registeration from './pages/Registeration.vue'
import NewBlog from './pages/NewBlog.vue'
import BlogPost from './pages/BlogPost.vue'
import page404 from './pages/404.vue'

loadFonts()

import axios from 'axios'

// 1. Define route components.
// These can be imported from other files
const About = { template: '<div>About</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login,  },
  { path: '/register', component: Registeration },
  { path: '/new', component: NewBlog },
  { path: '/edit/:id', component: NewBlog},
  {path: '/post/:id', component: BlogPost},
  { path: '/not-found', component: page404 },
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

  const privatePages = ["/new"];
  const authRequired = privatePages.includes(to.path);
  const token = localStorage.getItem('token');

  // scroll window to top
  window.scrollTo(0, 0);
  

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
  .use(autoAnimatePlugin)
  .use(vuetify)
  .use(router)
  // .use(require('vue-faker'))
  .mount('#app')
