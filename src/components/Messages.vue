<template>
    <v-container app>
        <div id="app">
            <v-app-bar color="blue" app>
                <!-- <v-app-bar-nav-icon>
                    <v-icon color="white">mdi-arrow-left</v-icon>
                </v-app-bar-nav-icon>-->
                <v-toolbar-title class="white--text">Messages</v-toolbar-title>
            </v-app-bar>
            <v-container class="fill-height">
                <v-row class="fill-height pb-14" justify="center">
                    <v-col cols="8">
                        <v-row
                            v-for="(item, index) in chats.messages"
                            class="justify-end"
                            :key="index"
                            :class="{ 'blue--text': item.user_id === getUsers.id, 'grey--text': item.user_id !== getUsers.id }"
                        >
                            <v-col :cols="item.user_id === getUsers.id ? 4 : 12">
                                <span v-if="item.user_id == getUsers.id" class="blue--text mr-3 mb-2">
                                    {{
                                        item.message
                                    }}
                                </span>
                                <span v-if="item.user_id != getUsers.id" class="blue--text ml-3">
                                    {{
                                        item.message
                                    }}
                                </span>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-footer absolute>
                <v-container class="ma-0 pa-0">
                    <v-row no-gutters>
                        <v-col>
                            <div class="d-flex mr-10 flex-row align-center">
                                <v-text-field
                                    v-model="msg"
                                    placeholder="Type Something"
                                    @keypress.enter="send"
                                ></v-text-field>
                                <v-btn icon class="ml-4" @click="send">
                                    <v-icon>mdi-send</v-icon>
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-footer>
        </div>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {

    data() {
        return {
            chats: [
            ],
            msg: null,
        };
    },
    mounted() {
        window.Echo.channel('chat')
            .listen('WebsocketDemoEvent', (e) => {
                this.chats.messages.push(e.message);
            });
        axios.get('http://127.0.0.1:8000/api/message', {
            headers: {
                'Authorization': 'Bearer ' + this.getToken
            }
        }).then(response => {
            this.chats = response.data;

        }).catch(err => {
            console.log(err)
            this.$toast.error(`${err.message}`, {
                position: 'top-right',
                duration: 2000,
                dismissible: true
            });
        });
    },

    methods: {

        send: function () {
            let formData = new FormData()
            formData.append('message', this.msg);
            formData.append("entreprise_id", this.getEntreprise.id);
            formData.append("user_id", this.getUsers.id);
            axios.post(`http://127.0.0.1:8000/api/message/${this.getEntreprise.id}`, formData, {
                headers: {
                    'Authorization': 'Bearer ' + this.getToken
                }
            }).then(response => {
                console.log(response.data)
                this.msg="";
                this.$toast.success(`${response.data.success}`, {
                    position: 'top-right',
                    duration: 2000,
                    dismissible: true
                });
            }).catch(err => {
                console.log(err)
                this.$toast.error(`${err.response.message}`, {
                    position: 'top-right',
                    duration: 2000,
                    dismissible: true
                });
            });
        },
    },
    computed: {
        ...mapGetters([
            'getToken',
            'getUsers',
            'getEntreprise'
        ])
    },
};
</script>
