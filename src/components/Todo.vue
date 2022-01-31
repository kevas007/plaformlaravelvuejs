<template>
    <v-card class="mx-auto" color="#26c6da" dark max-width="400">
        <v-card-title>
            <span class="text-h6 font-weight-light">{{ todos.nom }}</span>
        </v-card-title>

        <v-card-text class="text-h5 font-weight-bold">{{ todos.description }}</v-card-text>

        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-subtitle>
                            <v-icon>mdi-calendar</v-icon>
                            {{ todos.created_at }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-row align="center" justify="end">
                    <v-switch
                        v-model="todos.statut"
                        @click="updateTodo"
                        :label="`${todos.statut ? 'done' : 'open'}`"
                    ></v-switch>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Vue from "vue";
export default {
    methods: {
        updateTodo() {
            let toast = Vue.$toast;
            let status = {
                'statut': this.todos.statut
            }
            axios.put(`http://127.0.0.1:8000/api/taches/${this.todos.id}`, status, {
                headers: {
                    'Authorization': 'Bearer ' + this.token
                }
            })
                .then(response => {
                    console.log(response.data.taches);
                    this.$store.dispatch('getTodos');
                    toast.success(`${response.success}`, {
                        position: 'top-right',
                        duration: 2000,
                        dismissible: true
                    })
                })
        },

    },
    data() {
        return {

        };
    },
    props: {
        todos: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters({
            token: "getToken"
        })
    },
};
</script>
