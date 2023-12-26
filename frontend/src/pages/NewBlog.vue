<template>
    <v-container
        fluid
        fill-height
        class="d-flex h-full"
    > 
        
        <v-row>
            <v-col
                v-if="loading"
                cols="12"
                md="8"
                sm="12"
                class="mx-auto d-flex flex-column rounded-lg"
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
                class="mx-auto d-flex flex-column rounded-lg"
                
            >
                <v-toolbar
                    flat
                    color=""
                    class="d-flex align-center"
                >
                    <v-toolbar-icon

                    >
                        <v-icon
                            size="45"
                        >
                            <v-img
                                :src="userInfo !== null ? getAvatar() : 'https://www.gravatar.com/avat'"
                                :lazy-src="userInfo !== null ? getAvatar() : 'https://www.gravatar.com/avat'"
                            ></v-img>
                        </v-icon>
                    </v-toolbar-icon>
                    <v-toolbar-title
                        class="font-weight-medium"
                    >
                        {{ userInfo !== null ? userInfo.username : "Bloks." }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        icon="mdi-delete"

                    ></v-btn>
                    <v-btn
                        color="black"
                        text
                        @click="$router.push('/')"
                    >Back</v-btn>
                </v-toolbar>
                <v-divider
                    thickness="2"
                ></v-divider>
                <EditorComponent
                    class=""
                    style="flex-grow: 1;"
                    :editorContent="editorContent"
                    :editorEditable="editorEditable"
                    :saveBtnLoading="savingProgress"
                    @editorSave="(content) => {
                        editorContent = content
                        editorContentSaved()
                    }"
                    
                ></EditorComponent>
            </v-col>
        </v-row>

    </v-container>
</template>

<style lang="css">




</style>

<script>
import EditorComponent from "../components/newBlogComponent/EditorComponent.vue"
import axios from 'axios'
export default {
    name: 'NewBlogPage',
    props: {
    },
    components: {
        EditorComponent
    },
    data() {
        return {
            editorContent: "",
            editorEditable: true,
            userInfo: null,
            savingProgress: false,
            loading: false,
            editorState: null,

        }
    },

    methods: {
        getAvatar(){
            return `https://www.robohash.org/${this.userInfo.username}`
        },

        getTitle(){
            // title is first line of content
            const content = this.editorContent
            const title = content.content[0].content[0].text
            return title
            
        },

        async deleteContent(){
            this.savingProgress = true
            if (this.editorState === "updateBlog"){
                // delete blog
                const URL = "http://localhost:3000/api/blog/delete"
                const data = {
                    blogUUID: this.$route.params.id,
                    token: localStorage.getItem('token'),
                    userUUID: this.userInfo.id
                }
                await axios.post(URL, data).then(response => {
                    if (response.data.status === "success"){
                        console.log(response.data)
                        this.$router.push('/')
                    }
                })
            }
            else{
                this.$router.push('/')
            }
            this.savingProgress = false
        },

        editorContentSaved() {
            this.savingProgress = true
            // check if user is logged in
            const user = localStorage.getItem('user')
            const token = localStorage.getItem('token')
            const blog_content = JSON.stringify(this.editorContent)
            
            if (user){
                const route = this.$route
                if (this.editorState === "updateBlog" && route.params.id){
                    // update existing blog
                    const URL = "http://localhost:3000/api/blog/update"
                    const data = {
                        blogUUID: this.$route.params.id,
                        title: this.getTitle(),
                        content: blog_content,
                        token: token,
                        userUUID: this.userInfo.id
                    }
                    const response = axios.put(URL, data)
                    console.log(response)
                    this.savingProgress = false
                    return
                }
                else{
                    const URL = "http://localhost:3000/api/blog/new"
                    const data = {
                        title: this.getTitle(),
                        content: blog_content,
                        token: token
                    }
                    const response = axios.post(URL, data)
                    console.log(response)
                    this.savingProgress = false
                }

                
            } else {
                // redirect to login page
                this.$router.push('/login')
            }

        }
            

    },
    mounted() {
        this.loading = true
        this.userInfo = JSON.parse(localStorage.getItem('user'))
        // check if this is a new blog or an existing blog

        let route = this.$route
        if (route.params.id){
            // get blog content
            console.log(route.params.id)
            const URL = "http://localhost:3000/api/blog"
            const data = {
                blog_id: route.params.id
            }
            axios.post(URL, data).then(response => {
                if (response.data.status === "success"){
                    const blog_content = JSON.parse(response.data.message[0].blog_content)
                    this.editorContent = blog_content
                }
            })
            this.editorState = "updateBlog"

        }
        else{
            // create new blog
            this.editorContent = {
                "time": 1619472000000,
                "blocks": [
                    {
                        "type": "header",
                        "data": {
                            "text": "Title",
                            "level": 1
                        }
                    },
                    {
                        "type": "paragraph",
                        "data": {
                            "text": "Start writing here..."
                        }
                    }
                ],
                "version": "2.22.2"
            }
            this.editorState = "newBlog"
        }
        this.loading = false

    },
}
</script>