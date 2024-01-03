<template>
    <v-container
        fluid
        fill-height
        class="d-flex justify-center align-start"
    >
        <v-snackbar
            v-model="snackbarOpen"
            :timeout="3000"
            class="text-center pointer"
            @click="snackbarOpen = false"
        >
            {{ snackbarText  }}
        </v-snackbar>
        <v-row>
            <v-col
                cols="12"
                md=""
                class="mx-auto"
            >
                <v-card
                class="mx-auto"
                width="100%"
                max-width="700"
                height="fit-content"
                flat

            >
                <v-card-title
                    class="site-title text-center mb-4"
                >
                    Join Us today
                </v-card-title>
            
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="form"
                        lazy-validation
                        @submit.prevent="onSubmit"
                    >
                        <v-text-field
                            v-model="email"
                            :readonly="loading"
                            :rules="[required]"
                            class="mb-2"
                            clearable
                            label="Enter your email"
                        ></v-text-field>

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
                            placeholder="Enter your password"
                            type="password"
                            ></v-text-field>

                            <v-text-field
                            v-model="confirmPassword"
                            :readonly="loading"
                            :rules="[required,
                                () => this.password === this.confirmPassword || 'Passwords do not match']"
                            clearable
                            label="Confirm Password"
                            placeholder="Enter your password"
                            type="password"
                            ></v-text-field>

                            <v-btn
                                :hidden="!form"
                                :loading="loading"
                                block
                                color="amber"
                                size="large"
                                type="submit"
                                variant="elevated"
                                >
                                Join Bloks
                            </v-btn>
                    </v-form>
                </v-card-text>
                <v-card-actions
                    class="mx-2"
                >
                    <p>
                        Have an account? <router-link to="/login">Login here</router-link>
                    </p>
                </v-card-actions>

            </v-card>
            </v-col>
        </v-row>
        
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
    name: 'RegistrationPage',
    props: {

        
    },
    data() {
        return {
            form: false,
            email: null,
            password: null,
            confirmPassword: null,
            loading: false,
            username: null,
            snackbarOpen: false,
        }
    },
    methods: {
        async onSubmit() {
            if (!this.form) return

            this.loading = true

            let request = await axios.post('http://localhost:3000/api/register', {
                username: this.username,
                email: this.email,
                password: this.password,
            })

            if (request.data.status === "success"){
                this.snackbarText = "Registration successful!"
                this.snackbarOpen = true
                setTimeout(() => {
                    this.snackbarOpen = false
                    this.loading = false
                    this.$router.push('/login')

                }, 2000)

            } else {
                this.$router.push('/register')
            }

        },

        required(v) {
            return !!v || 'Field is required'
        },
    },
}
</script>