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
                class="ml-auto d-flex justify-center align-start"
            >                
                <v-progress-circular
                    v-if="blogLoading"
                    indeterminate
                    color="black"
                    size="large"
                    class="mx-auto"
                ></v-progress-circular>

                <v-list
                    v-else
                    three-line
                    height="100%"
                    class="mx-auto bg-transparent "
                    
                >
                    <v-list-item
                        v-for="(blog_item, i) in blogPosts"
                        :key="i"
                        v-slot="{ active, toggle }"
                        class="px-0 bg-white mb-1"
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
                                <span>{{ blog_item.author }} • {{ formatDate(blog_item.date) }}</span>
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
                                            <v-btn
                                                :disabled="!authUserIsAuthor(blog_item)"
                                                @click="item.action"
                                                class="text-left"
                                                width="100%"
                                                flat
                                            >{{ item.title }}</v-btn>
                                            
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-card-subtitle>
                            
                            <v-card-title
                                class="cursor-pointer"
                                @click="$router.push(`/post/${blog_item.uuid}`)"

                            >{{ blog_item.title }}</v-card-title>
                            <v-card-text
                                class="cursor-pointer" 
                                @click="$router.push(`/post/${blog_item.uuid}`)"
                            >
                                <!-- restrict to 2 lines of words thereafter ... -->
                                <span
                                    class="text-truncate"
                                    style="-webkit-line-clamp: 2; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden;"
                                >{{ parseBlogContent(blog_item.content) }}</span>

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
                    flat
                    
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
import axios from 'axios'
import moment from 'moment'
export default {
    name: 'Homepage',
    props: {
    },
    data() {
        return {
            windowHeight: window.innerHeight,
            blogPostMenu: [

                {
                    title: 'Delete',
                    action: () => {
                        console.log('Delete')
                    }
                },
                {
                    title: 'Edit',
                    action: () => {
                        console.log('Edit')
                    }
                },
            ],
            blogPosts: [
              
            ],
            items: [],
            newPostBtn: false,
            blogLoading: false,
            user: null
        }
    },
    methods: {
        authUserIsAuthor(blog){
            
            console.log(user, blog.author)
            if (user){
                if (JSON.parse(user).username == blog.author){
                    
                    if (JSON.parse(user).id == blog.author_id){
                        return true
                    }

                }
            }
            return false
        },
        userImageSrc(){
            if (this.user !== null){
                return `https://www.robohash.org/${this.user.username}`
            }
        },

        formatDate(dateString) {
            return moment(dateString).fromNow()
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

        parseBlogs(data){
            for (let i = 0; i < data.length; i++){
                let blog = {
                    uuid: data[i].blogUUID,
                    title: data[i].blog_title,
                    content: data[i].blog_content,
                    author: data[i].username,
                    date: data[i].last_updated,
                }
                this.blogPosts.push(blog)
            }
        },
        async load() {
            // Set loading state
            this.blogLoading = true;
            // Load blog posts
            const response = await axios.get('http://localhost:3000/api/blogs');
            if (response.data.status === "success"){
                let result = this.parseBlogs(response.data.message)
                this.blogLoading = false;
            }
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
        
        },
        parseBlogContent(content){
            let parsedContent = JSON.parse(content)
            return parsedContent.content[parsedContent.content.length - 1].content[0].text

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