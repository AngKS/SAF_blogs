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
                        <v-card
                            flat
                            color="transparent"
                            class="dis-relative"
                        >
                            <v-card-subtitle>
                                <span>{{ item.author }} • {{ formatDate(item.createdAt) }}</span>
                            </v-card-subtitle>
                            
                            <v-card-title>{{ item.title }}</v-card-title>
                            <v-card-text>
                                <!-- restrict to 2 lines of words thereafter ... -->
                                <span
                                    class="text-truncate"
                                    style="-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;"
                                >{{ item.content }}</span>
                            </v-card-text>
                            <v-card-actions
                                class="absolute-btn"
                            >
                                <!-- delete post icon -->
                                <v-btn
                                    icon
                                    color="black"
                                    @click.stop="deletePost(item)"
                                >
                                    <v-icon>mdi-cross</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
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
                    content: "This is a dummy blog post content. It's a beautiful day in our software development world. As we continue to embrace new technologies, we're finding new ways to improve efficiency and productivity. In this blog post, we'll explore some of the latest trends in the industry, discuss their implications, and look at some real-world examples of how they're being used. From AI to cloud computing, from big data to cybersecurity, we'll cover a range of topics that are shaping the future of our industry. So, whether you're a seasoned professional or just starting out in your career, there's something here for everyone. Stay tuned for more updates and happy coding!",
                },
                {
                    author: "ronald Reagan",
                    title: "My first Speech",
                    content: "This is a dummy blog post content. It's a beautiful day in our software development world. As we continue to embrace new technologies, we're finding new ways to improve efficiency and productivity. In this blog post, we'll explore some of the latest trends in the industry, discuss their implications, and look at some real-world examples of how they're being used. From AI to cloud computing, from big data to cybersecurity, we'll cover a range of topics that are shaping the future of our industry. So, whether you're a seasoned professional or just starting out in your career, there's something here for everyone. Stay tuned for more updates and happy coding!",
                }
            ],
            items: [],
            newPostBtn: false,
            blogLoading: false,
        }
    },
    methods: {
        formatDate(dateString) {
            const options = { day: '2-digit', month: 'short' };
            const date = new Date(dateString);
            return date.toLocaleDateString(undefined, options);
        },

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