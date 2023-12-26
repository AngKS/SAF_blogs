<template>
    <v-container
        fill-height
        fluid
        class="d-flex"
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
                    class="d-flex flex-column"
                    fill-height
                    fluid
                >
                    <v-card
                        class="mx-auto mb-5 dis-relative"
                        width="100%"
                        height="100%"
                        flat
                    >
                        <v-btn
                            v-if="userInfo !== null && userInfo.username === blog?.username"
                            icon="mdi-pencil"
                            style="position: fixed; bottom: 0; right: 0; margin: 1rem;"
                            @click="$router.push(`/edit/${blog?.blogUUID}`)"

                        >
                        </v-btn>
                        <v-card-title class="px-0 font-weight-black text-h5 d-flex">
                            {{ blog_title }}
                            <v-spacer></v-spacer>
                                <v-btn
                                    icon="mdi-arrow-left"
                                    @click="$router.push('/')"
                                    flat
                                ></v-btn>
                        </v-card-title>
                        <v-card-subtitle
                            class="d-flex align-center justify-start px-0"
                        >
                            <v-avatar
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
                                <span class="font-weight-medium text-subtitle-2">{{ blog?.username }}</span>
                                <span class="font-weight-light font-italic">published {{ formatDate(blog?.created_at) }}</span>
                            </div>
                        </v-card-subtitle>

                    </v-card>
                    <div style="flex-grow: 1;" v-if="blog !== null" v-html="blogOutput"></div>
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
    mounted() {

        // load userinfo
        const user = localStorage.getItem('user')
        if (user) {
            this.userInfo = JSON.parse(user)
        }

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

            
        
    },

}
</script>