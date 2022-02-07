<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-if="getToken != null" permanent v-model="drawer" app>
        <Siderbar if="getUsers !=null" />
        <!-- <Siderbar/> -->
      </v-navigation-drawer>

      <v-app-bar app>
        <!-- <v-app-bar-nav-icon v-if="getToken !=null" @click="drawer = !drawer"></v-app-bar-nav-icon> -->

        <v-layout row justify-space-between>
          <v-toolbar-title>Moshop</v-toolbar-title>

          <v-flex v-if="getToken == null" md3>
            <v-btn to="/login">login</v-btn>
            <v-btn to="/register">Register</v-btn>
            <!-- <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>-->
          </v-flex>
          <v-flex v-if="getToken != null" md3>
            <v-btn to="/dashboard">Dashbord</v-btn>
          </v-flex>
        </v-layout>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>


<script>
import Vue from 'vue'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// import axios from "axios"
import { mapGetters } from 'vuex'
import Siderbar from "./components/Siderbar.vue";
import Echo from "laravel-echo";


Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

export default {
  data: () => ({ drawer: null }),
  components: { Siderbar },
  mounted() {

    if (this.getUsers != null) {

      //configuration de l'echo pour le websocket
      let toast = Vue.$toast;
      let echo = new Echo({
        broadcaster: "pusher",
        key: "local",
        wsHost: "127.0.0.1",
        wsPort: 6001,
        wssPort: 6001,
        forceTLS: false,
        cluster: 'mt1',
        disableStats: true,
        authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
        auth: {
          headers: {
            'Authorization': "Bearer " + this.getToken
          }
        }
      });
  //initialisation des websocket 
      echo
        .private(`App.Models.User.${this.getUsers.id}`)
        .notification((msg) => {
          console.log(msg);

          toast.success(`${msg.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          });
        });
 
    }

  },
  computed: {
    ...mapGetters([
      'getToken', 'getUsers'
    ])
  }
}
</script>