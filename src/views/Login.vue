<template>
    <v-container fluid fill-height>
        <v-alert type="success" v-if="succes.length > 0">{{ succes[0] }}</v-alert>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                prepend-icon="mdi-account-box"
                                name="email"
                                v-model="email"
                                label="email"
                                type="text"
                            ></v-text-field>
                            <v-text-field
                                id="password"
                                prepend-icon="mdi-lock"
                                name="password"
                                label="Password"
                                v-model="password"
                                type="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'Login',
    data: () => ({
        email: null,
        password: null,
        errors: [],
        succes: []
    }),

    methods: {

        login() {
            let formData = new FormData();
            formData.append("email", this.email);
            formData.append("password", this.password);
            let rout = this.$router
            axios.post('http://127.0.0.1:8000/api/login', formData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                }
            })
                .then(res => {
                    if (res.data.status == 200) {
                        this.$store.dispatch('userConnected', res.data);
                        // this.$store.dispatch('getUser');
                        this.succes.push(res.data.message)

                        this.$toast.info("Bienvenue " + this.getUsers.name);
                        rout.push('/dashboard');
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$toast.error(`${err.response.data.message}`, {
                        position: 'top-right',
                        duration: 2000,
                        dismissible: true
                    });

                })
        }
    },
    computed: {
        ...mapGetters(['getUsers', 'getToken'])
    }
};
</script>

