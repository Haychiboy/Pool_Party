<template>
  <div>
    <button @click="goBack">Go Back</button>
    <h2>Enter Personal Details</h2>
    <form @submit.prevent="goToPasswordSetup">
      <input type="text" v-model="firstName" placeholder="First Name" required />
      <input type="text" v-model="lastName" placeholder="Last Name" required />
      <input type="date" v-model="dob" placeholder="Date of Birth" required />
      <input type="text" v-model="address" placeholder="Address" required />
      <button type="submit" :disabled="!isFormComplete">Next</button>
    </form>
  </div>
</template>

<script>
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
    isFormComplete() {
      return this.firstName && this.lastName && this.dob && this.address;
    }
  },
  methods: {
    goToPasswordSetup() {
      this.$router.push('/signup/password');
    },
    goBack() {
      this.$router.back(); // Navigate to the previous page
    }
  }
};
</script>
