// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginComponent from '../components/LoginComponent.vue';
import RegistrationStart from '../components/RegistrationStart.vue';
import PersonalDetails from '../components/PersonalDetails.vue';
import PasswordSetup from '../components/PasswordSetup.vue';
import CreatePoolComponent from '../components/CreatePoolComponent.vue';
import store from '../store'; // Ensure the store is imported
import ProfileComponent from '../components/ProfileComponent.vue';
import DashboardComponent from '../components/DashboardComponent.vue';
import ViewPoolComponent from '../components/ViewPoolComponent.vue';

const routes = [
  { path: '/login', component: LoginComponent },
  { path: '/signup', component: RegistrationStart },
  { path: '/signup/details', component: PersonalDetails },
  { path: '/signup/password', component: PasswordSetup },
  {
    path: '/view-pool',
    name: 'ViewPool',
    component: ViewPoolComponent // Ensure this matches your actual component
  },
  { 
    path: '/create-pool', 
    component: CreatePoolComponent, 
    meta: { requiresAuth: true } // Route requiring authentication
  },
  { path: '/profile', component: ProfileComponent, meta: { requiresAuth: true } },
  {
    path: '/dashboard',
    component: DashboardComponent,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard to check authentication
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    // Wait until Firebase Auth state is confirmed
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.commit('setUser', user); // Sync Vuex store with Firebase user
        next(); // Proceed to the requested route
      } else {
        next('/login'); // Redirect to login if not authenticated
      }
    });
  } else {
    next(); // Proceed to the requested route if no auth required
  }
});

export default router;
