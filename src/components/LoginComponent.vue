<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginWithEmail">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <!-- Google Sign-In Button -->
    <button @click="loginWithGoogle">Sign in with Google</button>

    <!-- Sign Up Button -->
    <button @click="goToSignup">Don't have an account? Sign Up</button>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async loginWithEmail() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/create-pool'); // Redirect to Create Pool on successful login
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async loginWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        this.$router.push('/create-pool'); // Redirect to Create Pool on successful login
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    goToSignup() {
      this.$router.push('/signup'); // Navigate to signup page
    }
  }
};
</script>

<style scoped>
/* Optional styling */
button {
  margin-top: 10px;
}
</style>
