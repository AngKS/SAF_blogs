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
            style="position: fixed;"
            @click="$router.push('/new')"
        >
        </v-btn>
        <v-row>
            <v-col
                cols="12"
                md="6"
                class="ml-auto"
            >
                <v-list
                    three-line
                    height="100%"
                    class="mx-auto"
                >
                    <v-list-item
                        v-for="(item, i) in blogPosts"
                        :key="i"
                        v-slot="{ active, toggle }"
                        class="px-0"
                    >
                        <!-- show the delete button on hover -->
                        <v-card
                            flat
                            color="transparent"
                            class="dis-relative"
                        >
                            <v-card-subtitle
                                class="d-flex justify-between align-center"
                            >
                                <span>{{ item.author }} • {{ formatDate(item.createdAt) }}</span>
                                <v-spacer></v-spacer>
                                <v-menu
                                    v-if="isUserAuthenticated && user !== null"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    open-on-hover
                                    transition="scale-transition"
                                    offset-y
                                    close-delay="200"
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{props}">
                                        <v-btn
                                            icon="mdi-dots-horizontal-circle-outline"
                                            v-bind="props"
                                            flat
                                            size="24"
                                            :ripple="false"
                                        ></v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            v-for="(item, i) in blogPostMenu"
                                            :key="i"
                                            class=""
                                        >
                                            <v-list-item-title
                                                @click="item.action"
                                                class="cursor-pointer"
                                            >
                                                {{ item.title }}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-card-subtitle>
                            
                            <v-card-title
                                class="cursor-pointer"
                                @click="$router.push(`/post/${item.author}`)"

                            >{{ item.title }}</v-card-title>
                            <v-card-text
                                class="cursor-pointer"
                                @click="$router.push(`/post/${item.author}`)"
                            >
                                <!-- restrict to 2 lines of words thereafter ... -->
                                <span
                                    class="text-truncate"
                                    style="-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;"
                                >{{ item.content }}</span>
                            </v-card-text>
                        </v-card>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col
                cols="12"
                md="3"
                class="mr-auto d-flex justify-center align-start"
            >
                <v-card
                    width="75%"
                    height="fit-content"
                    class=""
                    
                >
                    <v-card-subtitle class="bg-black" style="width: 100%;"></v-card-subtitle>
                    <v-card-title
                        class="d-flex flex-column justify-center align-center"
                    >
                        <v-avatar
                            size="96"
                            color="grey-lighten-3"
                        >
                            <v-img
                                alt="Avatar"
                                :lazy-src="user !== null ? userImageSrc() : 'https://www.robohash.org/avatar1'"
                                :src="user !== null ? userImageSrc() : 'https://www.robohash.org/avatar1'"
                            ></v-img>
                        </v-avatar>
                        <span v-if="isUserAuthenticated && user !== null">{{ user.username }}</span>
                        <v-divider v-else class="my-2" width="2"></v-divider>
                        <v-btn
                            v-if="isUserAuthenticated && user !== null"
                            variant="outlined"
                            size="small"
                            color="red"
                            @click="UserLogOut"
                        >
                            Log Out
                        </v-btn>
                        <v-btn
                            v-else
                            variant="outlined"
                            size="small"
                            @click="$router.push('/login')"
                        >
                            Sign In/Sign Up
                        </v-btn>
                        
                    </v-card-title>
                </v-card>
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

    .absolute-article-btn{
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
            blogPostMenu: [
                {
                    title: 'Edit',
                    action: () => {
                        console.log('Edit')
                    }
                },
                {
                    title: 'Delete',
                    action: () => {
                        console.log('Delete')
                    }
                },
            ],
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
                    author: "aks",
                    title: "test",
                    content: "test",
                    image: "test",
                    createdAt: "test",
                },
                {
                    author: "aks",
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
            user: null
        }
    },
    methods: {

        userImageSrc(){
            if (this.user !== null){
                return `https://www.robohash.org/${this.user.username}`
            }
        },

        formatDate(dateString) {
            const options = { day: '2-digit', month: 'short' };
            const date = new Date(dateString);
            return date.toLocaleDateString(undefined, options);
        },

        isUserAuthenticated(){
            const token = localStorage.getItem('token')
            if (token){
                const user = localStorage.getItem('user')
                
                if (user){

                    this.user = JSON.parse(user)
                    localStorage.setItem('user', JSON.stringify(this.user))
                    console.log("user found")
                }
                else {
                    console.log("user now found")
                }
                return true
                
            }
            return false
        },

        load() {
            // Set loading state
            this.blogLoading = true;
            // Perform API call
            setTimeout(() => {
                // Update list
                this.items = [...this.blogPosts];

                // Set loading state
                this.blogLoading = false;
            }, 3000);
        },
        authUserIsAuthor(author){
            const user = localStorage.getItem('user')
            if (user){
                if (user.username == author){
                    return true
                }
            }
            return false
        },

        UserLogOut(){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            this.$router.push('/login')
        
        }

    },
    watch: {
    //    watch user
        
        
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