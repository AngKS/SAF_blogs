<template>
    <v-container
        fill-height
        fluid
        class="dis-relative d-flex"
    >
        <v-btn
            v-if="newPostBtn"
            icon="mdi-plus"
            color="black"
            class="absolute-btn rounded-circle"
            style="position: fixed;z-index: 1000000000;"
            @click="$router.push('/new')"
        >
        </v-btn>
        <v-row
                v-if="blogLoading"

        >
            <v-col
                cols="12"
                md="12"
                sm="12"
                height="100%"
                class="d-flex justify-center align-center"
            >
            <v-progress-circular
                        indeterminate
                        color="black"
                        size="large"
                        class="mx-auto"
                    ></v-progress-circular>
            </v-col>
        </v-row>
        <v-row v-else>

            <v-col
                cols="12"
                md="6"
                class="ml-auto"
            >                
                <v-toolbar
                    class="bg-transparent"
                    density="compact"
                    flat
                >
                    <v-toolbar-title class="font-weight-bold text-decoration-underline">All Blogs</v-toolbar-title>
                    <!-- <v-toolbar-items>
                        <v-btn
                            
                            icon="mdi-filter-outline"
                        ></v-btn>
                    </v-toolbar-items> -->
                </v-toolbar>
                <v-list
                    three-line
                    height="100%"
                    class="mx-auto bg-transparent "
                    
                >
                    <v-list-item
                        v-for="(blog_item, i) in sortedBlogs"
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
                                
                            </v-card-subtitle>
                            
                            <v-card-title
                                class="cursor-pointer"
                                @click="getBlogByID(blog_item.uuid)"
                                :ripple="false"
                            >{{ blog_item.title }}</v-card-title>
                            <v-card-text
                                class="cursor-pointer" 
                                @click="getBlogByID(blog_item.uuid)"
                                :ripple="false"
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
                sm="0"
                class="mr-auto d-flex flex-column justify-start align-center hidden-sm-and-down"
            >
                <v-toolbar
                    density="compact"
                    class="mb-2"
                >
                    
                </v-toolbar>
                <v-card
                    width="100%"
                    height="fit-content"
                    class="mb-3"
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
                <v-card
                    width="100%"
                    height="fit-content"
                    class="mb-3 py-2"
                    flat
                >
                    <v-card-subtitle class="text-center">Created by AKS</v-card-subtitle>
                    <v-card-actions
                        class="d-flex justify-center align-center"
                    >
                        
                        <v-btn
                            icon="mdi-github"
                            href="https://github.com/AngKS/SAF_blogs"
                            target="_blank"
                        ></v-btn>
                        <v-btn
                            icon="mdi-linkedin"
                            href="https://www.linkedin.com/in/kahshinang"
                            target="_blank"
                        ></v-btn>

                    </v-card-actions>
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
            user: null,
            sortedBlogs: []
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
                    // get user info
                    const URL = 'http://localhost:3000/api/user/auth'
                    new Promise((resolve, reject) => {
                        axios.post(URL, {token: token}).then((response) => {
                            resolve(response)
                        }).catch((error) => {
                            reject(error)
                        })
                    }).then(response => {
                        console.log(response.data)
                        if (response.data.status === "success"){
                            this.user = response.data.message
                            localStorage.setItem('user', JSON.stringify(this.user))
                        }
                    })
                    console.log("user now found")
                }
                return true
                
            }
            console.log(token)
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
            else{
                this.blogLoading = false;
                this.$router.push('/not-found')
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
            if (parsedContent.content[(parsedContent.content.length - 1)].content == null || parsedContent.content[(parsedContent.content.length - 1)].content == undefined){
                return ""
            }
            else{
            return parsedContent.content[parsedContent.content.length - 1].content[0].text

            }

        },

        sortBlogsBy(method){
            if (method == "date") {
                this.blogPosts = [...this.blogPosts].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
            }
            else if (method == "author") {
                this.blogPosts = [...this.blogPosts].sort((a, b) => {
                    return a.author.localeCompare(b.author)
                })
            }
            else if (method == "title") {
                this.blogPosts = [...this.blogPosts].sort((a, b) => {
                    return a.title.localeCompare(b.title)
                })
            }
        },

        async getBlogByID(id){
            const response = await axios.get(`http://localhost:3000/api/blog/${id}`)
            if (response){
                if (response.data.status === "success"){
                    // console.log(response.data.message)
                    this.$router.push(`/post/${id}`)
                }

            }
        }

    },
    watch: {
    //    watch user
        blogPosts: {
            handler: function (val, oldVal) {
                console.log('blogPosts changed')
                this.sortedBlogs = [...this.blogPosts]
            },
            deep: true
        },
        
    },
    mounted() {
        const userAuth = this.isUserAuthenticated()
        if (userAuth){
            this.newPostBtn = true
        }
        else{
            this.newPostBtn = false
        }

        this.load()

        this.sortBlogsBy("date")
    },
}
</script>