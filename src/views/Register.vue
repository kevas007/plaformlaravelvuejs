<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Register</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field name="name" v-model="name" label="name" type="text"></v-text-field>
                            <v-text-field name="email" v-model="email" label="Email" type="email"></v-text-field>
                            <v-text-field
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                v-model="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="register">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
// import Vue from 'vue'
export default {
    name: 'Register',
    data: () => ({
        email: null,
        name: null,
        password: null,
        errors: [],
        succes: []
    }),

    methods: {

        register() {
            this.succes = [];
            this.errors = [];
            let formData = new FormData();
            formData.append("name", this.name);
            formData.append("email", this.email);
            formData.append("password", this.password);
            let rout = this.$router;
            // let toast = Vue.$toast;
            axios.post('http://127.0.0.1:8000/api/register', formData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                }
            })
                .then(res => {
                    if (res.data.status == 200) {
                        // console.log(res.data)
                        // localStorage.setItem('user', JSON.stringify(res.data.user));
                        // this.$store.dispatch('userConnected')
                        // toast.success(`${res.data.message}`, {
                        //     position: 'top-right',
                        //     duration: 2000,
                        //     dismissible: true
                        // })
                        this.$store.dispatch('userConnected',res.data)
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

                });
        }
    }
};
</script>

