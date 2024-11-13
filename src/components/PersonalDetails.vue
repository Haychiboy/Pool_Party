<template>
  <div>
    <h2>Enter Personal Details</h2>
    <p>Email: {{ email }}</p> <!-- Display the email if needed -->
    <form @submit.prevent="goToPasswordSetup">
      <input type="text" v-model="firstName" placeholder="First Name" required />
      <input type="text" v-model="lastName" placeholder="Last Name" required />
      <input type="date" v-model="dob" placeholder="Date of Birth" required />
      <input type="text" v-model="address" placeholder="Address" required />
      <button type="submit" :disabled="!isFormComplete">Next</button>
    </form>
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      dob: '',
      address: ''
    };
  },
  computed: {
    ...mapGetters(['getEmail']), // Map the getter to retrieve the email
    email() {
      return this.getEmail;
    },
    isFormComplete() {
      return this.firstName && this.lastName && this.dob && this.address;
    }
  },
  methods: {
    goToPasswordSetup() {
      this.$router.push('/signup/password');
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>
