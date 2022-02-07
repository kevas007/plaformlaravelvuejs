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
            <v-form ref="form"  lazy-validation>
              <v-row>
                <v-col cols="6" sm="8">
                  <v-text-field :rules="tvaRules"  label="TVA" type="number" v-model="entreprise.tva"></v-text-field>
                </v-col>
                <v-col cols="4" sm="4">
                  <v-btn @click="tavCheck">
                    <v-icon>mdi-account-check</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field
                    v-model="entreprise.nom"
                    :rules="entrepriseRules"
                    label="Nom de l'entreprise"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.activite" :rules="activiteRules" label="Activite" required></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.adresse" :rules="adresseRules" label="adresse" required></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.ville"  :rules="villeRules"  label="Ville" required></v-text-field>
                </v-col>

                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.pays"  :rules="paysRules" label="Pays" required></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field v-model="entreprise.code_postal"  :rules="codeRules" label="Code Postal" required></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field label="Numero fixe" type="number" :rules="phoneRules" v-model="entreprise.numero" required></v-text-field>
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

        <v-btn color="primary" :disabled="!valid1" @click="nextCheck">Continue</v-btn>

        <v-btn text @click="cancel">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="45vh">
          <v-container>
            <v-form ref="form" v-model="valid2" lazy-validation>
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
                  :rules="contactRoles"
                    v-model="entreprise.noms"
                    label="Nom de la personne de contact"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="8">
                  <v-text-field
                  :rules="numberRules"
                    label="Numero de la personne de contact"
                    v-model="entreprise.contact"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>

        <v-btn color="primary" :disabled="!valid2" @click="validate">Valider</v-btn>

        <v-btn text @click="preview">Preview</v-btn>
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
    valid1: false,
    valid2: false,
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
    tvaRules: [
      v => !!v || "Tva is required",
    ],
    entrepriseRules: [
      v => !!v || "Entreprise is required",
      v => (v && v.length <= 255) || "Entreprise Name must be less than 255 characters",
    ],
    activiteRules: [
      v => !!v || "Activite is required",
      v => (v && v.length <= 255) || "Activite must be less than 255 characters",
    ],
    adresseRules: [
      v => !!v || "Adresse is required",
      v => (v && v.length <= 255) || "Adresse must be less than 255 characters",
    ],
    villeRules: [
      v => !!v || "Ville is required",
      v => (v && v.length <= 255) || "Ville must be less than 255 characters",
    ],
    paysRules: [
      v => !!v || "Pays is required",
      v => (v && v.length <= 255) || "Pays must be less than 255 characters",
    ],
    codeRules: [
      v => !!v || "Code postal is required",
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  phoneRoles: [
    v => !!v || "Numero is required",
    v => (v && v.length <= 255) || "Numero must be less than 255 characters",
  ],
  contactRoles: [
    v => !!v || "Personne de contact is required",
    v => (v && v.length <= 255) || "Personne de contact must be less than 255 characters",
  ],
  numberRules: [
    v => !!v || "Numero is required",
    v => (v && v.length <= 255) || "Numero must be less than 255 characters",
  ],
  }),
  methods: {
    tavCheck() {
      axios.get(`http://13.38.138.92/api/companies/${this.entreprise.tva}/info`).then(res => {
        this.entreprise = res.data.data
        console.log(res.data.data)
        this.valid1 = true
      })
    },
    nextCheck() {
      this.$refs.form.validate()
      this.e1 = 2
    },
    cancel() {
      this.$router.push('/')
    },
    preview() {
      this.e1 = 1
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
      this.$store.dispatch('setEntreprise', formdata)
      this.$router.push('/dashboard')
    },
  },
}
</script>
