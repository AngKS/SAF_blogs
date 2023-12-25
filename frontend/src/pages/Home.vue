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
                <v-list
                    three-line
                    height="100%"
                    class="mx-auto"
                >
                    <v-list-item
                        v-for="(item, i) in blogPosts"
                        :key="i"
                        @click="$router.push(`/post/${item.author}`)"
                    >
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">{{ item.title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
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
                    author: 'John Doe',
                    title: 'First Blog Post',
                    content: 'This is the content of the first blog post.',
                    image: 'https://example.com/image1.jpg',
                    createdAt: '2022-01-01T00:00:00Z',
                },
                {
                    author: 'Jane Doe',
                    title: 'Second Blog Post',
                    content: 'This is the content of the second blog post.',
                    image: 'https://example.com/image2.jpg',
                    createdAt: '2022-01-02T00:00:00Z',
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
                    author: "ronald Reagan",
                    title: "My first blog post",
                    content: "I am the ",
                }
            ],
            items: [],
            newPostBtn: false,
            blogLoading: false,
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

        load({ done }) {
            // Set loading state
            this.blogLoading = true;
            // Perform API call
            setTimeout(() => {
                this.blogPosts = this.generateBlogPosts(10);

                // Update list
                this.items = [...this.blogPosts];

                // Set loading state
                this.blogLoading = false;
            }, 3000);
        },

    },
    mounted() {
        if (this.isUserAuthenticated()){
            this.newPostBtn = true
        }
        else{
            this.newPostBtn = false
        }

        this.load()
    },
}
</script>