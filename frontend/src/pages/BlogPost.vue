<template>
    <v-container
        fill-height
        fluid
        class="d-flex"
        style="min-height: 100vh;"
    >
        <v-row>
            <v-col
                v-if="loading"
                cols="12"
                md="8"
                sm="12"
                class="mx-auto d-flex justify-center align-center"
            >
                <v-progress-circular
                    indeterminate
                    color="black"
                    size="large"
                ></v-progress-circular>
            </v-col>
            <v-col
                v-else
                cols="12"
                md="8"
                sm="12"
                height="100%"
                class="mx-auto d-flex flex-column rounded-lg pt-0 bg-white"
            >
                
                <v-container
                    class="d-flex flex-column px-0"
                    fill-height
                    fluid
                >
                        
                    <v-row>
                        <v-col
                            cols="12"
                            class="mx-auto"
                        >
                            <v-toolbar
                                class="bg-transparent mb-3"
                                flat
                                density="compact"
                            
                            >
                                <v-toolbar-items
                                    class="pa-0 ma-0"
                                >
                                    <v-app-bar-nav-icon
                                        class=""
                                        @click="$router.push('/')"
                                        icon="mdi-arrow-left"
                                    ></v-app-bar-nav-icon>
                                </v-toolbar-items>
                                
                                    <v-toolbar-title
                                        class="hidden-sm-and-down text-h4 text-start font-weight-bold pl-0"
                                    >
                                        {{ blog_title }}
                                    </v-toolbar-title>
                                    <v-toolbar-title
                                        class="text-h6 text-start font-weight-bold pl-0"
                                    >
                                        {{ blog_title }}
                                    </v-toolbar-title>
                                    <v-toolbar-items>
                                    <v-card-subtitle                                    
                                        class="d-flex align-center justify-start px-0"
                                    >
                                    <v-avatar
                                        class="hidden-sm-and-down"
                                        size="50"
                                        color="grey-lighten-3"
                                    >
                                        <v-img
                                            alt="Avatar"
                                            :lazy-src="blog?.username !== null ? userImageSrc(blog.username) : 'https://www.robohash.org/avatar1'"
                                            :src="blog?.username !== null ? userImageSrc(blog.username) : 'https://www.robohash.org/avatar1'"
                                        ></v-img>
                                    </v-avatar>
                                    <div class="d-flex flex-column ml-2">
                                        <span class="font-weight-medium text-subtitle-2 hidden-sm-and-down">{{ blog?.username }}</span>
                                        <span class="font-weight-light font-italic hidden-sm-and-down">published {{ formatDate(blog?.last_updated) }}</span>
                                    </div>
                                </v-card-subtitle>
                                    <v-btn
                                        v-if="userInfo !== null && userInfo.username === blog?.username"
                                        icon="mdi-pencil"
                                        flat
                                        size="large"
                                        @click="$router.push(`/edit/${blog?.blogUUID}`)"

                                    >
                                    </v-btn>
                                    
                                    </v-toolbar-items>
                            </v-toolbar>
                        </v-col>
                        <v-col
                            cols="12"
                            md="10"
                            sm="12"
                            class="mx-auto"
                        >
                            <div class="px-1" style="flex-grow: 1;" v-if="blog !== null" v-html="blogOutput"></div>
                        <!-- if theres no blog content -->
                        <div v-else class="d-flex justify-center align-center" style="flex-grow: 1;">
                            <span class="text-h5 font-weight-bold">No blog content</span>
                            <!-- navigate home -->
                            <v-btn
                                class="ml-2"
                                color="black"
                                @click="$router.push('/')"
                            >

                                <v-icon>mdi-home</v-icon>
                                <span>Home</span>
                            </v-btn>

                        </div>
                        </v-col>
                    </v-row>
                        
                    
                </v-container>
            </v-col>    
        </v-row>
    </v-container>
</template>


<script>
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { generateHTML } from '@tiptap/html'
import axios from 'axios'
import moment from 'moment'
export default {
    name: 'BlogPostPage',
    props: {
    },

    data() {
        return {
            loading: true,
            userInfo: null,
            blogOutput: null,
            blog_title: "",
            blog: null,

        }
    },
    methods: {
        async getBlog(){

            let response = await axios.post('http://localhost:3000/api/blog', { blog_id: this.$route.params.id })
            if (response.data.status === "success") {
                console.log(response.data.message)
                this.blog = response.data.message[0]
                return true
            }
            else{
                this.loading = false
                this.$router.push('/not-found')
                return false
            }
        },
        userImageSrc(username) {
            
            return `https://www.robohash.org/${username}`
        },

        formatDate(dateString) {
            return moment(dateString).fromNow()
        },


    },
    beforeMount() {
        // check route
        if (this.$route.params.id !== undefined || this.$route.params.id !== null) {
            // check if blog exists
            this.getBlog().then(result => {
                if (result){
                    const blog_content = JSON.parse(this.blog.blog_content)
                    // remove the first line
                    this.blog_title = blog_content.content[0].content[0].text
                    blog_content.content.shift()
                    console.log(blog_content.content[0])
                    this.blogOutput = generateHTML(blog_content, [
                        StarterKit,
                        Heading.configure({
                            levels: [1, 2, 3],
                        }),
                    ])
                
                }
                    this.loading = false
            })
        }
        else{
            this.loading = false
            this.$router.push('/not-found')
        }
    },
    watch:{
        // watch blog, if null then redirect to not found
        blog: function(val, oldVal){
            if (val === null){
                this.$router.push('/not-found')
            }
        }
    },
    mounted() {

        // load userinfo
        const user = localStorage.getItem('user')
        if (user) {
            this.userInfo = JSON.parse(user)
        }

    
        
    },

}
</script>