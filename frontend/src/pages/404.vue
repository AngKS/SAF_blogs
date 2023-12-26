<template>
    <v-container
        class="my-12"
        fill-height
        fluid
    >
        <v-row>
            <v-col
                cols="12"
                md="8"
                sm="12"
                class="mx-auto d-flex flex-column rounded-lg text-red text-center"
            >
                <h1 class="site-title-font"
                    style="font-size: 10rem; font-weight: 900; line-height: 1;"
                >404</h1>
                <p class="site-title-font"
                    style="font-size: 2rem; font-weight: 600; color: black;"
                >Page not found</p>
                <v-btn
                    color="red"
                    variant="outlined"
                    class="mt-4 mx-auto px-10"
                    width="fit-content"
                    @click="$router.push('/')"
                >Back</v-btn>

            </v-col>
        </v-row>
    </v-container>
</template>


<script>
export default {
    name: '404Page',
    props: {
    },
    data() {
        return {


        }
    },
    methods: {


    },
}
</script>