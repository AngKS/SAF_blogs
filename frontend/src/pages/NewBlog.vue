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
                class="mx-auto d-flex bg-red"
            >
                <EditorComponent
                    :editorContent="editorContent"
                    @editorSave="save"
                ></EditorComponent>
            </v-col>
        </v-row>

    </v-container>
</template>


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
            editorContent: ""

        }
    },
    methods: {
        save(content) {
            console.log(content)
        }

    },
}
</script>