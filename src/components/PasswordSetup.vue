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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      errorMessage: '',
      email: this.$route.query.email || '',
      firstName: this.$route.query.firstName || '',
      lastName: this.$route.query.lastName || '',
      dob: this.$route.query.dob || '',
      address: this.$route.query.address || ''
    };
  },
  computed: {
    isPasswordValid() {
      return this.password && this.password === this.confirmPassword;
    }
  },
  methods: {
    async register() {
      if (this.isPasswordValid && this.email) {
        try {
          const auth = getAuth();
          const db = getFirestore();
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;

          // Save user details in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            address: this.address,
            email: this.email
          });

          // Navigate to the dashboard after successful registration
          this.$router.push('/dashboard');
        } catch (error) {
          this.errorMessage = error.message;
          console.error("Error during registration:", error); // Log error for debugging
        }
      } else {
        this.errorMessage = "Please fill out all fields.";
      }
    }
  }
};
</script>

<style scoped>
/* Optional styling for the component */
</style>
