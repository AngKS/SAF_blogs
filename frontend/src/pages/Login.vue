<template>
    <v-container
        fluid
        fill-height
        class="d-flex flex-column justify-center align-center"
    >
        <v-snackbar
            v-model="snackbarOpen"
            :timeout="3000"
            class="text-center pointer"
            @click="snackbarOpen = false"
        >
            {{ snackbarText }}
        </v-snackbar>
        <v-card
            v-if="!loggedIn"
            class="mx-auto"
            width="700"
            height="500"
            flat

        >
            <!-- <v-card-title
                class="site-title text-center"
            >
                Bloks.
            </v-card-title> -->
            <v-card-title
                class="text-center site-title pt-4 my-2"
            >Welcome Back!</v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="form"
                    lazy-validation
                    @submit.prevent="onSubmit"
                    v-auto-animate
                >
                    <v-text-field
                        v-model="username"
                        :readonly="loading"
                        :rules="[required]"
                        class="mb-2"
                        clearable
                        label="Username"
                        ></v-text-field>

                        <v-text-field
                        v-model="password"
                        :readonly="loading"
                        :rules="[required]"
                        clearable
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        ></v-text-field>

                        <v-btn
                            :hidden="!form"
                            :loading="loading"
                            block
                            color="black"
                            size="large"
                            type="submit"
                            variant="elevated"
                            v-auto-animate
                            >
                            Sign In
                        </v-btn>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <p>
                    Don't have an account? <router-link to="/register">Sign Up</router-link>
                </p>
            </v-card-actions>

        </v-card>
    </v-container>
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Rubik+Doodle+Shadow&family=Rubik+Mono+One&display=swap');



.site-title {
    font-family: 'Rubik Mono One', sans-serif;
    font-size: 2rem;
    font-weight: 400;
    letter-spacing: 0.2rem;
}

</style>

<script>
import axios from 'axios'

export default {
    name: 'LoginPage',
    props: {

        
    },
    data() {
        return {
            form: false,
            username: null,
            password: null,
            loading: false,
            snackbarOpen: false,
            snackbarText: "",
            loggedIn: false,
        }
    },
    methods: {

        async sendLogin(){
            // const URL = "http://" + import.meta.env.VITE_BACKEND_SERVER_ADDRESS + "/api/login"
            const URL = "http://localhost:3000/api/login"
            console.log(URL)
            const data = {
                username: this.username,
                password: this.password,
            }

            const response = await axios.post(URL, data)
            return response
        },  

        getUserObj(token){
            const URL = 'http://localhost:3000/api/user/auth'
            new Promise((resolve, reject) => {

                axios.post(URL, {token: token}).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            }).then(response => {
                console.log(response.data)
            })
        },

        async onSubmit() {
            if (!this.form) return

            this.loading = true

            // setTimeout(() => (this.loading = false), 2000)
            const response = await this.sendLogin()
            if (response.status == 200){
                this.loading = false
                if (response.data.message.success){
                    console.log(response.data)
                    localStorage.setItem("token", response.data.message.token)
                    this.getUserObj(response.data.message.token)
                    this.$router.push("/")
                }
                else{
                    console.log(response.data)

                    this.snackbarOpen = true
                    this.snackbarText = response.data.message.message
                }
                
            }
        },
        required(v) {
            return !!v || 'Field is required'
        },
    },
    mounted() {
        // check if user is logged in
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token && user) {
            // check if user expired
            if (user.exp < Date.now() / 1000){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
            else{
                // authenticate token to make sure it is valid
                new Promise((resolve, reject) => {
                    const URL = 'http://localhost:3000/api/user/auth'
                    axios.post(URL, {token: token}).then((response) => {
                        resolve(response)
                    }).catch((error) => {
                        reject(error)
                    })

                }).then((response) => {
                    if (response.data.success){
                        console.log(response.data)
                        this.loggedIn = true
                    }
                    else{
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                    }
                }).catch((error) => {
                    console.log(error)
                })



            }
            
            
        }
    },
}
</script>