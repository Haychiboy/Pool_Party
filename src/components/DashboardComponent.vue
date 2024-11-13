<!-- src/components/DashboardComponent.vue -->
<template>
  <div>
    <h2>Welcome to Your Dashboard, {{ displayName }}</h2>
    <button @click="goToCreatePool">Create New Pool</button>
    <button @click="goToProfile">View Profile</button>
    <!-- Optional: Add more buttons for viewing pools, recent activities, etc. -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
    }
  }
};
</script>
