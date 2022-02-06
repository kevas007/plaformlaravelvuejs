<template>
    <v-card class="mx-auto" height="100%" width="256">
        <v-navigation-drawer dark permanent>
            <v-list class="mt-5">
                <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <v-row
                    v-if="getEntreprise"
                    class="mx-auto mt-10 flex flex-column justify-center align-center"
                >
                    <div class="pa-2 my-10 mx-auto">
                        <v-menu bottom origin="center center" transition="scale-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark v-bind="attrs" v-on="on">more</v-btn>
                            </template>

                            <v-list>
                                <v-list-item-title>
                                    <v-dialog transition="dialog-bottom-transition" max-width="600">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="primary" v-bind="attrs" v-on="on">Profile</v-btn>
                                        </template>
                                        <template v-slot:default="dialog">
                                            <v-card>
                                                <!-- <v-toolbar
                                                        color="primary"
                                                        dark
                                                >Opening from the bottom</v-toolbar>-->
                                                <v-card
                                                    class="overflow-hidden"
                                                    color="purple lighten-1"
                                                    dark
                                                >
                                                    <v-toolbar flat color="purple">
                                                        <v-icon>mdi-account</v-icon>
                                                        <v-toolbar-title
                                                            class="font-weight-light"
                                                        >User Profile</v-toolbar-title>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            color="purple darken-3"
                                                            fab
                                                            small
                                                            @click="isEditing = !isEditing"
                                                        >
                                                            <v-icon v-if="isEditing">mdi-close</v-icon>
                                                            <v-icon v-else>mdi-pencil</v-icon>
                                                        </v-btn>
                                                    </v-toolbar>
                                                    <v-card-text>
                                                        <v-text-field
                                                            :disabled="!isEditing"
                                                            color="white"
                                                            label="Nom de la personne de contact"
                                                            v-model="getEntreprise.nom_de_la_personne_de_contact"
                                                        ></v-text-field>
                                                        <v-text-field
                                                            :disabled="!isEditing"
                                                            color="white"
                                                            label="Mail de la personne de contact"
                                                            v-model="getEntreprise.email_de_la_personne_de_contact"
                                                        ></v-text-field>
                                                        <v-text-field
                                                            :disabled="!isEditing"
                                                            color="white"
                                                            label="Tel de la personne de contact"
                                                            v-model="getEntreprise.numero_de_la_personne_de_contact"
                                                        ></v-text-field>
                                                    </v-card-text>
                                                    <v-divider></v-divider>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                            :disabled="!isEditing"
                                                            color="success"
                                                            @click="save"
                                                        >Save</v-btn>
                                                    </v-card-actions>
                                                    <v-snackbar
                                                        v-model="hasSaved"
                                                        :timeout="2000"
                                                        absolute
                                                        bottom
                                                        left
                                                    >Your profile has been updated</v-snackbar>
                                                </v-card>
                                                <v-card-actions class="justify-end">
                                                    <v-btn text @click="dialog.value = false">Close</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                    <!-- <v-btn block @click="logout">Profile</v-btn> -->
                                </v-list-item-title>
                                <v-list-item-title></v-list-item-title>
                                <!-- </v-list-ite> -->
                            </v-list>
                        </v-menu>
                    </div>
                </v-row>
                <v-btn class="mt-2 pa-1 red" block @click="logout">Logout</v-btn>
            </template>
        </v-navigation-drawer>
    </v-card>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            hasSaved: false,
            isEditing: null,
            model: null,
            items: [
                { title: 'Todos', icon: 'mdi-do', link: '/todos' },
                { title: 'Messages', icon: 'mdi-mail', link: '/messages' },
            ],
        }
    },
    methods: {

        logout() {
            this.$store.dispatch('userLogout')
            this.$router.push('/')
        },

        customFilter(item, queryText) {
            const textOne = item.name.toLowerCase()
            const textTwo = item.abbr.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
        },
        save() {
            this.isEditing = !this.isEditing
            this.hasSaved = true
            let formData = new FormData()
            formData.append('nom_de_la_personne_de_contact', this.getEntreprise.nom_de_la_personne_de_contact)
            formData.append('email_de_la_personne_de_contact', this.getEntreprise.email_de_la_personne_de_contact)
            formData.append('numero_de_la_personne_de_contact', this.getEntreprise.numero_de_la_personne_de_contact)
            formData.append("_method", "PUT");
            axios.post('http://127.0.0.1:8000/api/entreprise/' + this.getEntreprise.id, formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + this.$store.getters.getToken,
                    },
                })
                .then(response => {
                    this.chat = response.data;
                    this.$toast.success(`${response.data.message}`, {
                        position: 'top-right',
                        duration: 2000,
                        dismissible: true
                    });
                    // this.$store.dispatch('getUser')
                })
                .catch(error => {
                    console.log(error)
                })
        },


    },
    mounted() {
        // this.user = JSON.parse(localStorage.getItem('user'))
        // console.log(this.user)
    },
    computed: {

        ...mapGetters([
            'getEntreprise',

        ])
    }
}
</script>