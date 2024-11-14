<template>
  <div>
    <h2>Enter Personal Details</h2>
    <form @submit.prevent="goToPasswordSetup">
      <input type="text" v-model="firstName" placeholder="First Name" required />
      <input type="text" v-model="lastName" placeholder="Last Name" required />
      <input type="date" v-model="dob" placeholder="Date of Birth" required />

      <!-- Address field with autocomplete -->
      <input id="address" type="text" v-model="address" placeholder="Address" required />
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> <!-- Error message -->

      <button type="submit" :disabled="!isFormComplete">Next</button>
    </form>
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      dob: '',
      address: '',
      errorMessage: '' // Used to store any error messages
    };
  },
  computed: {
    isFormComplete() {
      return this.firstName && this.lastName && this.dob && this.address;
    }
  },
  methods: {
    goToPasswordSetup() {
      // Proceed to password setup page
      this.$router.push({
        path: '/signup/password',
        query: {
          email: this.$route.query.email,
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
  },
  mounted() {
    // Initialize Google Places Autocomplete
    const input = document.getElementById('address');
    const autocomplete = new google.maps.places.Autocomplete(input);

    // Listener for when an address is selected
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      // Check if valid address (address_components exists)
      if (place.address_components) {
        this.address = place.formatted_address; // Set the selected address
        this.errorMessage = ""; // Clear previous error message
      } else {
        // If no valid address, show error
        this.errorMessage = "Please select a valid address from the suggestions.";
      }
    });
  }
};
</script>

<style scoped>
/* Optional styling for the error message */
.error-message {
  color: red;
  font-size: 12px;
}
</style>
