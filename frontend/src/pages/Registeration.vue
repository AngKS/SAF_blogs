<template>
    <v-container
        fluid
        fill-height
        class="d-flex flex-column justify-center align-center"
    >
        <v-card
            class="mx-auto"
            width="700"
            height="500"
            flat

        >
            <v-card-title
                class="site-title text-center mb-4"
            >
                Join Us today!
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
export default {
    name: 'RegistrationPage',
    props: {

        
    },
    data() {
        return {
            form: false,
            email: null,
            password: null,
            loading: false,
            username: null,
        }
    },
    methods: {
        onSubmit() {
            if (!this.form) return

            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        required(v) {
            return !!v || 'Field is required'
        },
    },
}
</script>