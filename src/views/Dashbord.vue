<template>
    <v-container>
        <div>
            <p class="text-center">Welcome to the dashboard</p>
            <div v-if="getEntreprise != null">
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title
                                class="text-h5"
                            >Entreprise: {{ getEntreprise.nom_de_entreprise }}</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <v-card-text>
                                            <v-list>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Activité: {{ getEntreprise.activite_d_entreprise }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>TVA: {{ getEntreprise.numero_de_TVA }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Adresse: {{ getEntreprise.adresse }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Code postal: {{ getEntreprise.code_postal }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Pays: {{ getEntreprise.pays }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Numer fixe: {{ getEntreprise.numero_fixe }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Ville: {{ getEntreprise.ville }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Email de la personne de contact: {{ getEntreprise.email_de_la_personne_de_contact }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Nom de la personne de contact: {{ getEntreprise.nom_de_la_personne_de_contact }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-content>
                                                        <v-list-item-title>Numero de la personne de contact: {{ getEntreprise.numero_de_la_personne_de_contact }}</v-list-item-title>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <div v-else>
                <v-btn small elevation="5" color to="/stepper">
                    <v-icon>mdi-account-plus</v-icon>
                    <span>Ajouter des informations sur votre entreprise </span>
                </v-btn>
            </div>
        </div>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
// import axios from 'axios'

export default {
    mounted() {
        this.$store.dispatch('getEntreprise')
    },
    computed: {
        ...mapGetters([
            'getEntreprise'
        ])
    }
}
</script>