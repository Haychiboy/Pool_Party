<template>
  <div>
    <button @click="goBack">Go Back</button>
    <h2>Set Up Your Password</h2>
    <form @submit.prevent="register">
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
      <button type="submit" :disabled="!isPasswordMatching">Register</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { store } from '@/store';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  computed: {
    isPasswordMatching() {
      return this.password && this.password === this.confirmPassword;
    }
  },
  methods: {
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, store.email, this.password);
        this.$router.push('/create-pool');
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    goBack() {
      this.$router.back(); // Navigate to the previous page
    }
  }
};
</script>
