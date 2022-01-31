<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Donnée de votre Entreprise</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Votre Profile</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" color="grey lighten-1" height="115vh">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="6" sm="8">
                  <v-text-field label="TVA" v-model="entreprise.tva"></v-text-field>
                </v-col>
                <v-col cols="4" sm="4">
                  <v-btn @click="tavCheck">
                    <v-icon>mdi-account-check</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field
                    v-model="entreprise.nom"
                    :rules="nameRules"
                    label="Nom de l'entreprise"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.activite" label="Activite" required></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.adresse" label="adresse" required></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.ville" label="Ville" required></v-text-field>
                </v-col>

                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.pays" label="Pays" required></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.code_postal" label="Code Postal" required></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field label="Numero fixe" v-model="entreprise.numero" required></v-text-field>
                </v-col>
              </v-row>
              <!-- <v-btn
    
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
              </v-btn>-->
            </v-form>
          </v-container>
        </v-card>

        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="45vh">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="6" sm="8">
                  <v-text-field
                    v-model="entreprise.email"
                    :rules="emailRules"
                    label="E-mail de la personne de contact"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field
                    v-model="entreprise.noms"
                    label="Nom de la personne de contact"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field
                    label="Numero de la personne de contact"
                    v-model="entreprise.contact"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>

        <v-btn color="primary" @click="validate">Valider</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',

  data: () => ({
    e1: 1,
    valid: false,
    entreprise: {
      // nom: '',
      activite: '',
      adresse: '',
      ville: '',
      pays: '',
      code_postal: '',
      email: '',
      noms: '',
      contact: '',
      tva: '',
      numero: '',
    },
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 255) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
    ],

  }),
  methods: {
    tavCheck() {
      axios.get(`http://13.38.138.92/api/companies/${this.entreprise.tva}/info`).then(res => {
        this.entreprise = res.data.data
        console.log(res.data.data)
      })
    },
    validate() {
      this.$refs.form.validate();
      let formdata = new FormData();
      formdata.append('numero_de_TVA', this.entreprise.tva)
      formdata.append('nom_de_entreprise', this.entreprise.nom)
      formdata.append('activite_d_entreprise', this.entreprise.activite)
      formdata.append('adresse', this.entreprise.adresse)
      formdata.append('ville', this.entreprise.ville)
      formdata.append('pays', this.entreprise.pays)
      formdata.append('numero_fixe', this.entreprise.numero)
      formdata.append('code_postal', this.entreprise.code_postal)
      formdata.append('email_de_la_personne_de_contact', this.entreprise.email)
      formdata.append('nom_de_la_personne_de_contact', this.entreprise.noms)
      formdata.append('numero_de_la_personne_de_contact', this.entreprise.contact)
     this.$store.dispatch('setEntreprise',formdata)
      this.$router.push('/dashboard')
    },
  
  },
}
</script>
