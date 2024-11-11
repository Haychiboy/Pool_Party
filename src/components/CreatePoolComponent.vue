<template>
  <div>
    <button @click="logout">Log Out</button>
    <!-- Log Out Button -->
    <h2>Create a New Pool</h2>
    <p>This is the landing page after login or registration.</p>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';

export default {
  name: 'CreatePoolComponent',
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push('/login'); // Redirect to login after logging out
        })
        .catch(error => {
          console.error("Error logging out:", error);
        });
    }
  }
};
</script>

<style scoped>
/* Optional: Add styling for the logout button */
</style>
