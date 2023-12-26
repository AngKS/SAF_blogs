<template>
    <v-container
        fluid
        fill-height
        class="d-flex h-full"
    > 
        <v-snackbar
            v-model="snackbarOpen"
            :timeout="3000"
            class="text-center pointer"
            @click="snackbarOpen = false"
            location="top"
            :color="snackbarColor"
        >
            {{ snackbarText }}
        </v-snackbar>
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
                        @click="deleteContent"
                        :loading="savingProgress"
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
            snackbarColor: "black",
            snackbarText: "",
            snackbarOpen: false,

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
                let response = await axios.post(URL, data)
                if (response.status === 200 && response.statusText === "OK"){
                    console.log(response)
                    this.savingProgress = false
                    
                    this.snackbarText = "Blog deleted!"
                    this.snackbarColor = "green"
                    this.snackbarOpen = true
                    this.$router.replace({path: '/'})

                }
                else{
                    console.log(response)
                    this.snackbarText = "Error deleting blog!"
                    this.snackbarColor = "red"
                    this.snackbarOpen = true

                    this.savingProgress = false
                }
            }
            else{
                this.$router.replace({path: '/'})
            }
            this.savingProgress = false
        },

        async editorContentSaved() {
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
                    const response = await axios.put(URL, data)
                    console.log(response)
                    if (response.status === 200 && response.statusText === "OK"){
                        this.savingProgress = false
                        this.snackbarColor = "green"
                        this.snackbarText = "Blog updated!"
                        this.snackbarOpen = true
                this.$router.replace({path: '/'})

                        return
                    }
                    else{
                        this.savingProgress = false
                        this.snackbarColor = "red"
                        this.snackbarText = "Error updating blog!"
                        this.snackbarOpen = true
                        return
                    }
                    

                    
                }
                else{
                    const URL = "http://localhost:3000/api/blog/new"
                    const data = {
                        title: this.getTitle(),
                        content: blog_content,
                        token: token
                    }
                    const response = await axios.post(URL, data)
                    console.log(response)
                    if (response.status === 200 && response.statusText === "OK"){
                        this.savingProgress = false
                        this.snackbarColor = "green"
                        this.snackbarText = "Blog created!"
                        this.snackbarOpen = true
                this.$router.replace({path: '/'})

                        return
                    }
                    else{
                        this.savingProgress = false
                        this.snackbarColor = "red"
                        this.snackbarText = "Error creating blog!"
                        this.snackbarOpen = true
                        return
                    }

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

        if (this.$route.params.id){
            // get blog content
            console.log(this.$route.params.id)
            const URL = "http://localhost:3000/api/blog"
            const data = {
                blog_id: this.$route.params.id
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