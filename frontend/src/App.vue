<template>
  <v-app>
    <v-app-bar
      app
      flat
    >
      <v-toolbar
        flat
        color="white"
        class="d-flex"
      >
        <v-toolbar-title
          class="site-title "
          @click="$router.push('/')"

        >Bloks.</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          :ripple="false"
          @click="$router.push('/login')"
        >
          <v-avatar 
              color="transparent"
              @click="$router.push('/login')"
            >
              <v-icon icon="mdi-account-circle" size="32"></v-icon>
            </v-avatar>
        </v-btn>

      </v-toolbar>
    </v-app-bar>
    <v-main
      class="d-flex"
    >
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style lang="css">

    @import url('https://fonts.googleapis.com/css2?family=Rubik+Doodle+Shadow&family=Rubik+Mono+One&display=swap');



    .site-title {
      font-family: 'Rubik Mono One', sans-serif;
      font-size: 2rem;
      font-weight: 400;
      letter-spacing: 0.2rem;
    }

    .site-title:hover {
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

        const response = await axios.post(URL, {token: token})
        if (response.data.success){
          console.log(response.data)
        }

     }
  },

  mounted() {
    // check if user is logged in
    
    const token = localStorage.getItem('token')
    if (token) {
      // check if token is valid
      this.getUserAuth()
    }

    // check what is the current page
    this.currPage = this.$route.path
    console.log(this.currPage)


  },
}
</script>
