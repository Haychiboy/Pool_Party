<template>
  <div>
    <h2>Set Your Password</h2>
    <p>Email: {{ email }}</p> <!-- Displaying the email if needed -->
    <form @submit.prevent="register">
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
      <button type="submit" :disabled="!isPasswordValid">Register</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      errorMessage: ''
    };
  },
  computed: {
    ...mapGetters(['getEmail']), // Maps the email getter to this component
    email() {
      return this.getEmail; // Accesses email stored in Vuex
    },
    isPasswordValid() {
      return this.password && this.password === this.confirmPassword;
    }
  },
  methods: {
  async register() {
    if (this.isPasswordValid) {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        
        // Redirect to /create-pool after successful registration
        this.$router.push('/create-pool');
      } catch (error) {
        this.errorMessage = error.message;
      }
    } else {
      this.errorMessage = "Passwords do not match.";
      }
    }
  }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
