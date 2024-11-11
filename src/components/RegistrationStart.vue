<template>
  <div>
    <h2>Sign Up</h2>
    <input type="email" v-model="email" placeholder="Email" required />

    <!-- Sign Up Button disabled until a valid email is entered -->
    <button :disabled="!isValidEmail" @click="goToPersonalDetails">Sign Up</button>

    <!-- Login Button placed directly below Sign Up button -->
    <button @click="goToLogin">Already have an account? Login</button>
  </div>
</template>

<script>
import { store } from '@/store';

export default {
  data() {
    return {
      email: ''
    };
  },
  computed: {
    isValidEmail() {
      // Regular expression to check for a valid email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(this.email);
    }
  },
  methods: {
    goToPersonalDetails() {
      store.email = this.email; // Store the email in shared state
      this.$router.push('/signup/details');
    },
    goToLogin() {
      this.$router.push('/login'); // Navigate to login page
    }
  }
};
</script>

<style scoped>
/* Button styling */
button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
}

button:disabled {
  background-color: #ccc; /* Greyed out background */
  cursor: not-allowed; /* Changes cursor to indicate it's disabled */
}
</style>
