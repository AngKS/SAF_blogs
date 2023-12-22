<template>
    <v-container
        fill-height
        fluid
        class="dis-relative"
    >
        <v-btn
            v-if="newPostBtn"
            icon="mdi-plus"
            color="black"
            class="absolute-btn rounded-circle"
            @click="$router.push('/new')"
        >
        </v-btn>
        <v-row>
            <v-col
                cols="12"
                md="6"
                class="mx-auto"
            >
                <v-infinite-scroll
                    :on-infinite="load"
                    :scroll-threshold="0.5"
                    :items="blogPosts"
                >
                    <template
                        v-for="(post, index) in blogPosts"
                        :key="index"
                    >
                        <BlogPostCard
                            :postInfo="post"
                        ></BlogPostCard>
                    </template>
                </v-infinite-scroll>
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="css">
    
    .dis-relative{
        position: relative;
    }

    .absolute-btn{
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 1.5rem;

    }
</style>

<script>
export default {
    name: 'Homepage',
    props: {
    },
    data() {
        return {
            windowHeight: window.innerHeight,
            blogPosts: [
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "test",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                }
            ],
            newPostBtn: false,
        }
    },
    methods: {

        isUserAuthenticated(){
            const token = localStorage.getItem('token')
            if (token){
                return true
            }
            return false
        },

        async api() {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(Array.from({ length: 10 }, (k, v) => v + this.items.at(-1) + 1))
                }, 1000)
            })
        },
        async load({ done }) {
            // Perform API call
            const res = await this.api()

            this.items.push(...res)

            done('ok')
        },

    },
    mounted() {
        if (this.isUserAuthenticated()){
            this.newPostBtn = true
        }
        else{
            this.newPostBtn = false
        }
    },
}
</script>