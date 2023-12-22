<template>
    <editor-content :editor="editor" />
</template>

<style lang="css">

    .tiptap{
        flex-grow: 1;
        height: 100%;
        max-width: 65vw;
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

</style>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Placeholder from '@tiptap/extension-placeholder'

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
        editorContent: {
            type: String,
            default: "",
        }
    },
    mounted() {
        this.editor = new Editor({
            content: this.editorContent,
            extensions: [
                StarterKit,
                Heading.configure({
                    levels: [1, 2, 3],
                    placeholder: 'Title',
                }),
                Placeholder.configure({
                    emptyEditorClass: 'is-editor-empty',
                    placeholder: ({ node }) => {
                        if (node.type.name === 'heading') {
                            return 'What’s the title?'
                        }

                        return 'Can you add some further context?'
                    },
                }),
            ],
            editable: true,
            autoFocus: true,

        })
        // HTML with trim white space
        this.editor.commands.insertContent('<h1>Title</h1><p>Tell your story...</p>')
    },

    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>

