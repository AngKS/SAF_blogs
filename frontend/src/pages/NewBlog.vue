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
                class="mx-auto d-flex rounded-lg"
                
            >
                <EditorComponent
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

        }
    },
    methods: {
        editorContentSaved() {
            console.log(this.editorContent)
            // check if user is logged in
            const user = localStorage.getItem('user')
            

        }
            

    },
}
</script>