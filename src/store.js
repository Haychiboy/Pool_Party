import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const store = createStore({
  state: {
    user: null,
    email: ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.email = user?.email || '';
    },
    clearUser(state) {
      state.user = null;
      state.email = '';
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
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getEmail: (state) => state.email
  },
  plugins: [
    createPersistedState({
      key: 'myApp', // Set a unique key to ensure localStorage works properly
      storage: window.localStorage
    })
  ]
});

export default store;
