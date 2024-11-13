<template>
  <div>
    <h2>Sign Up</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <button :disabled="!isValidEmail" @click="storeEmailAndProceed">Sign Up</button>

    <button @click="goToLogin">Already have an account? Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: ''
    };
  },
  computed: {
    isValidEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    }
  },
  methods: {
    ...mapActions(['setUserEmail']), // Map the Vuex action to store the email
    storeEmailAndProceed() {
      this.setUserEmail(this.email); // Store email in Vuex
      this.$router.push('/signup/details'); // Navigate to next step
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
