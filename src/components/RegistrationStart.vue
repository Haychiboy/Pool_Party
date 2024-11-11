<template>
  <div>
    <h2>Sign Up</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <button @click="goToPersonalDetails">Sign Up</button>
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
  methods: {
    goToPersonalDetails() {
      store.email = this.email; // Store the email in shared state
      this.$router.push('/signup/details');
    }
  }
};
</script>
