<template>
    <v-container
        fluid
        fill-height
        class="d-flex dis-relative h-full bg-white"
    >
        <v-btn
            variant="tonal"
            color="black"
            class="another-absolute-button d-flex align-center" 
            @click="save"
            :loading="saveBtnLoading"
        >
            <span>Save</span>
            <v-icon class="ml-2">mdi-content-save</v-icon>
        </v-btn>
        <editor-content  :editor="editor" style="width: 100%;" />
    </v-container>
    
</template>

<style lang="css">

    .tiptap{
        flex-grow: 1;
        height: 100%;
        max-width: 85vw;
    }

    /* remove blue border when selected */
    .ProseMirror-focused {
        outline: none;
    }

    .tiptap:focus {
        outline: none;
    }

    .tiptap p.is-editor-empty:first-child::before {
        color: #adb5bd;
        content: attr(data-placeholder);
        float: left;
        height: 0;  
        pointer-events: none;
        }

    .dis-relative{
        position: relative;
    }

    .another-absolute-button{
        z-index: 10000000000;
        opacity: 0.6;
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 1rem;
        
    }

    .another-absolute-button:hover{
        opacity: 1;
        cursor: pointer;
    }

    .tiptap .is-empty::before {
        content: attr(data-placeholder);
        float: left;
        color: #adb5bd;
        pointer-events: none;
        height: 0;
    }

</style>


<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'

const CustomDocument = Document.extend({
    content: 'heading block*',
})

export default {
    components: {
        EditorContent,
    },

    data() {
        return {
            editor: null,
        }
    },
    props: {
        editorContentText: {
            type: String,
            default: "",
        },
        editorEditable: {
            type: Boolean,
            default: true,
        },
        saveBtnLoading: {
            type: Boolean,
            default: false,
        }
    },

    methods: {
        save(){
            const content = this.editor.getJSON()
            this.$emit('editorSave', content)
        }
    },
    watch: {
        editorContent: {
            handler: function (val, oldVal) {
                // clear content
                this.editor.commands.clearContent()
                // insert new content
                this.editor.commands.setContent(val)
            },
            deep: true
        }
    },
    mounted() {
        this.editor = new Editor({
            content: this.editorContentText,
            extensions: [
                CustomDocument,
                StarterKit.configure({
                    document: false,
                }),
                Heading.configure({
                    levels: [1, 2, 3],
                    placeholder: 'Title',
                }),
                Placeholder.configure({
                    emptyEditorClass: 'is-editor-empty',
                    placeholder: ({ node }) => {
                        console.log(node)
                        if (node.type.name === 'heading') {
                            return "A Great Title"
                        }

                        return 'Start on your Epic journey...'
                    },
                }),
            ],
            editable: this.editorEditable,
            autoFocus: true,

        })
        
    },



    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>

