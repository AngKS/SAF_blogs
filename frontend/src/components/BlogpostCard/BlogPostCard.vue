<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title>
                {{ postTitle }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-avatar
                color="transparent"
                @click="$router.push('/login')"
            >
                <v-icon icon="mdi-account-circle" size="32"></v-icon>
            </v-avatar>
        </v-toolbar>
        <v-card-text>
            {{ postContent }}
        </v-card-text>
        <v-card-actions>
            <v-btn
                icon
                :ripple="false"
                @click="$router.push('/login')"
            >
                <v-avatar 
                    color="transparent"
                    @click="$router.push('/login')"
                >
                    <v-icon icon="mdi-account-circle" size="32"></v-icon>
                </v-avatar>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>


<script>
export default {
    name: 'BlogPostCard',
    props: {
        postInfo: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            postAuthor : this.postInfo.author,
            postTitle : this.postInfo.title,
            postContent : this.postInfo.content,
            postImage : this.postInfo.image,
            postCreatedAt : this.postInfo.createdAt,
        }
    },
    methods: {


    },
}
</script>