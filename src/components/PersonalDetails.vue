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
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      dob: '',
      address: '',
      email: this.$route.query.email || '' // Retrieve email from query parameters
    };
  },
  computed: {
    isFormComplete() {
      return this.firstName && this.lastName && this.dob && this.address;
    }
  },
  methods: {
    goToPasswordSetup() {
      // Pass all necessary data to the next step as query parameters
      this.$router.push({
        path: '/signup/password',
        query: {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          dob: this.dob,
          address: this.address
        }
      });
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>
