<template>
    <v-container
        fluid
        fill-height
        class="d-flex h-full"
    > 
        
        <v-row>
            <v-col
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
                        color="black"
                        text
                        @click="$router.push('/blogs')"
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

        editorContentSaved() {
            console.log(this.editorContent)
            // check if user is logged in
            const user = localStorage.getItem('user')
            const token = localStorage.getItem('token')
            const blog_content = JSON.stringify(this.editorContent)
            
            if (user){
                // send request to backend to save blog
                const URL = "http://localhost:3000/api/blog/new"
                const data = {
                    title: this.getTitle(),
                    content: blog_content,
                    token: token
                }
                const response = axios.post(URL, data)
                console.log(response)
            } else {
                // redirect to login page
                this.$router.push('/login')
            }

        }
            

    },
    mounted() {
        this.userInfo = JSON.parse(localStorage.getItem('user'))
    },
}
</script>