// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import RegistrationStart from '../components/RegistrationStart.vue';
import PersonalDetails from '../components/PersonalDetails.vue';
import PasswordSetup from '../components/PasswordSetup.vue';
import CreatePoolComponent from '../components/CreatePoolComponent.vue';

const routes = [
  { path: '/login', component: LoginComponent },
  { path: '/signup', component: RegistrationStart },
  { path: '/signup/details', component: PersonalDetails },
  { path: '/signup/password', component: PasswordSetup },
  { path: '/create-pool', component: CreatePoolComponent } // New route for Create Pool
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
