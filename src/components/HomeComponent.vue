<template>
  <div class="home">
    <h1>Welcome to Pool Party</h1>
    <p>Select an option below to get started:</p>
    
    <!-- Button to navigate to /login page -->
    <button @click="goToLogin">Login</button>
    
    <!-- Button to navigate to /signup page -->
    <button @click="goToSignup">Sign Up</button>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  methods: {
    goToLogin() {
      this.$router.push('/login'); // Navigate to login page
    },
    goToSignup() {
      this.$router.push('/signup'); // Navigate to signup page
    }
  }
};
</script>

<style scoped>
/* Style the buttons as you like */
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
