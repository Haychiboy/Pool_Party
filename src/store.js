// src/store.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const store = createStore({
  state: {
    user: null,
    email: '',
    firstName: '',
    lastName: ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.email = user?.email || '';
      
      // Check and log displayName
      console.log("Setting user in Vuex:", user);
      
      if (user?.displayName) {
        const [firstName, lastName] = user.displayName.split(' ');
        state.firstName = firstName || '';
        state.lastName = lastName || '';
      } else {
        state.firstName = '';
        state.lastName = '';
      }
    },
    clearUser(state) {
      state.user = null;
      state.email = '';
      state.firstName = '';
      state.lastName = '';
    },
    setEmail(state, email) {
      state.email = email;
    },
    setFullName(state, { firstName, lastName }) {
      state.firstName = firstName;
      state.lastName = lastName;
    }
  },
  actions: {
    fetchUser({ commit }) {
      const auth = getAuth();
      onAuthStateChanged(auth, user => {
        if (user) {
          commit('setUser', user);
        } else {
          commit('clearUser');
        }
      });
    },
    setUserEmail({ commit }, email) {
      commit('setEmail', email);
    },
    setUserFullName({ commit }, fullName) {
      const [firstName, lastName] = fullName.split(' ');
      commit('setFullName', { firstName, lastName });
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getEmail: (state) => state.email,
    getFirstName: (state) => state.firstName,
    getLastName: (state) => state.lastName
  },
  plugins: [
    createPersistedState({
      key: 'myApp', // Unique key to ensure localStorage persistence
      storage: window.localStorage
    })
  ]
});

export default store;
