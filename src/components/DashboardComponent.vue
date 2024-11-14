<template>
  <div>
    <h2>Welcome to Your Dashboard, {{ displayName }}</h2>
    <button @click="goToCreatePool">Create New Pool</button>
    <button @click="goToProfile">View Profile</button>
    <button @click="logout">Log Out</button>
    <!-- Optional: Add more buttons for viewing pools, recent activities, etc. -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getAuth, signOut } from 'firebase/auth';

export default {
  computed: {
    ...mapState(['user']),
    displayName() {
      return this.user?.displayName || "User";
    }
  },
  methods: {
    goToCreatePool() {
      this.$router.push('/create-pool');
    },
    goToProfile() {
      this.$router.push('/profile');
    },
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
button {
  margin: 5px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}
</style>
