<template>
  <div>
    <h2>Sign Up</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <button @click="goToPersonalDetails" :disabled="!isValidEmail">Sign Up</button>
    
    <!-- Go to Login button -->
    <p>Already have an account? <button @click="goToLogin">Login</button></p>
  </div>
</template>

<script>
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
    goToPersonalDetails() {
      // Pass the email as a query parameter
      this.$router.push({
        path: '/signup/details',
        query: { email: this.email }
      });
    },
    goToLogin() {
      // Navigate to the login page
      this.$router.push('/login');
    }
  }
};
</script>
