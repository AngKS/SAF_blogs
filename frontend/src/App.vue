<template>
  <v-app>
    <v-app-bar
      app
      flat
    >
      <v-toolbar
        flat
        color="white"
      >
        <v-app-bar-title
          class="site-title"
          @click="$router.push('/')"

        >Bloks.</v-app-bar-title>
        <v-spacer></v-spacer>
          <v-avatar 
            color="transparent"
            @hover=""
            class="mr-2"
          >
            <v-icon icon="mdi-account-circle" size="32"></v-icon>
          </v-avatar>

      </v-toolbar>
    </v-app-bar>
    <v-main>
      
    </v-main>
  </v-app>
</template>

<style lang="css">

    @import url('https://fonts.googleapis.com/css2?family=Rubik+Doodle+Shadow&family=Rubik+Mono+One&display=swap');

    .site-title {
      font-family: 'Rubik Mono One', sans-serif;
      font-size: 2.5rem;
      font-weight: 400;
      letter-spacing: 0.2rem;
    }

    .site-title:hover {
      cursor: pointer;
    }


</style>

<script>


export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
    loading: false,

  }),
}
</script>
