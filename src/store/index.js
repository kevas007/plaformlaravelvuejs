import axios from 'axios';
// import { set } from 'core-js/core/dict';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex, )

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    entreprise: null,
    todos: null,
  },
  mutations: {
    SetUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    setCount(state, entreprise) {
      state.entreprise = entreprise
    },
    getTodos(state, todos) {
      state.todos = todos
    },
  },
  actions: {
    userConnected({
      commit,
    }, data) {
      let toast = Vue.$toast;
      console.log(data);

      commit('setToken', data.token);
      commit('SetUser', data.user);
      toast.success(`${data.message} `, {
        position: 'top-right',
        duration: 2000,
        dismissible: true
      });
      // console.log("vous êtes connecté");
    },
    userLogout({
      commit,
      state
    }) {
      let toast = Vue.$toast;
      console.log(state.user);
      axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            'Authorization': 'Bearer ' + state.token
          }
        })
        .then(response => {
          console.log(response);
          commit('setToken', null);
          commit('SetUser', null);
          commit('setCount', null);
          toast.success(`${response.data.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          })
        })
        .catch(err => {
          toast.error(`${err.response.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          });

        });


      // console.log("vous êtes déconnecté");
    },
    setEntreprise({
      state
    }, entreprise) {
      let toast = Vue.$toast;

      axios.post(`http://127.0.0.1:8000/api/entreprise`,
          entreprise, {
            headers: {
              'Authorization': 'Bearer ' + state.token
            }
          })
        .then(response => {
          console.log(response);
          toast.success(`${response.data.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          })
          this.$router.push('/dashboard')
          // commit('setCount', entreprise);
        }).catch((err) => {
          toast.error(`${err.response.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          });
        })
    },
    getEntreprise({
      commit,
      state
    }) {
      let toast = Vue.$toast;
      axios.get('http://127.0.0.1:8000/api/entreprise', {
          headers: {
            'Authorization': 'Bearer ' + state.token
          }
        })
        .then(response => {
          console.log(response);
          commit('setCount', response.data.data[0]);
          toast.success(`${response.data.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          })
        })
        .catch(err => {
          toast.error(`${err.response.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          });
        })
    },
    getTodos({
      state,
      commit
    }) {
      let toast = Vue.$toast;
      axios.get('http://127.0.0.1:8000/api/taches', {
          headers: {
            'Authorization': 'Bearer ' + state.token
          }
        })
        .then(response => {
          console.log(response.data);
          commit('getTodos', response.data.taches);
          toast.success(`${response.data.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          })
        })
        .catch(err => {
          toast.error(`${err.response.message}`, {
            position: 'top-right',
            duration: 2000,
            dismissible: true
          });
        })
    },
 

  },
  modules: {},
  getters: {
    getToken(state) {
      return state.token
    },
    getUsers(state) {
      return state.user
    },
    getEntreprise(state) {
      return state.entreprise
    },
    getTodos(state) {
      return state.todos
    }
  },
  plugins: [createPersistedState({
    paths: ['token', 'user', 'entreprise']
  })]
})