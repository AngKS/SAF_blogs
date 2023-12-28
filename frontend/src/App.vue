<template>
  <v-app>
    <v-app-bar
      app
      flat
    >
      <v-toolbar
        flat
        color="white"
        class="d-flex justify-center"
      >
        <v-toolbar-title
          class="site-title text-center"
          @click="$router.push('/')"

        >Bloks.</v-toolbar-title>


      </v-toolbar>
    </v-app-bar>
    <v-main
      class="d-flex bg-grey-lighten-3"
      style="scroll-behavior: smooth;"
    >
      <router-view></router-view>
    </v-main>
    <v-footer
      flat
      color="grey-lighten-2 d-flex flex-column justify-end align-center"
    >      
      <v-toolbar
        flat
        color="transparent"
        class="d-flex justify-center"
      >
        <v-toolbar-title
          class="site-title"
          @click="() => {
            scrollToTop()
            $router.push('/')
          }"

        >
        <span>Bloks.</span>
        <span class="text-subtitle-2 text-grey-darken-2">Created by <a href="https://www.github.com/angks" target="_blank" class="text-grey-darken-2" style="text-decoration: none;">AKS</a></span>

        </v-toolbar-title>
        <v-toolbar-items>
          <!-- link to github page -->
          <v-btn
            icon="mdi-github"
            class="cursor-pointer"
            href="https://github.com/AngKS/SAF_blogs"
            target="_blank"
            
          >
          </v-btn>

          
          <v-btn
            icon="mdi-account-circle"
            class="cursor-pointer"
            @click="$router.push('/login')"
          >
          </v-btn>
        </v-toolbar-items>

      </v-toolbar>
    </v-footer>
  </v-app>
</template>

<style lang="css">

    @import url('https://fonts.googleapis.com/css2?family=Rubik+Doodle+Shadow&family=Rubik+Mono+One&display=swap');

    .site-title-font{
      font-family: 'Rubik Doodle Shadow', cursive;
      letter-spacing: 0.2rem;
    }

    .site-title {
      font-family: 'Rubik Mono One', sans-serif;
      font-size: 2rem;
      font-weight: 400;
      letter-spacing: 0.2rem;
    }

    .site-title:hover {
      cursor: pointer;
    }

    .cursor-pointer{
      cursor: pointer;
    }


</style>

<script>
import axios from 'axios'



export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
    loading: false,
    user: null,
    currPage: null,

  }),
  methods: {
     async getUserAuth(){
        const URL = 'http://localhost:3000/api/user/auth'
        const token = localStorage.getItem('token')
        
        let response = await axios.post('http://localhost:3000/api/user/auth', { token: token })

      if (response.data.status === "success") {
        let user = {
          id: response.data.message.id,
          username: response.data.message.username,
          role: response.data.message.role,
          expiresAt: response.data.message.exp
        }
        localStorage.setItem('user', JSON.stringify(user))
      }
      
        this.loading = false
      
     },

     scrollToTop(){
        window.style =  "scroll-behavior: smooth"
        window.scrollTo(0, 0)

     }
  },

  async mounted() {
    // check if user is logged in
    
    const token = localStorage.getItem('token')
    if (token) {
      // check if token is valid
      console.log("here")
      await this.getUserAuth()
    }

    // check what is the current page
    this.currPage = this.$route.path
    console.log(this.currPage)


  },
}
</script>
