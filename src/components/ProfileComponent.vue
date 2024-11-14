<template>
  <div>
    <button @click="goBack">Back</button>
    <!-- Profile content here -->
    <h2>Your Profile</h2>
    <p>Name: {{ userProfile.name }}</p>
    <p>Email: {{ userProfile.email }}</p>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

export default {
  name: 'ProfileComponent',
  data() {
    return {
      userProfile: {
        name: '',
        email: '',
      },
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async fetchUserProfile() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', user.uid); // Assumes 'users' collection with UID-based docs
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            // Combine firstName and lastName
            this.userProfile.name = `${data.firstName} ${data.lastName}`.trim();
            this.userProfile.email = data.email;

            // Check if lastNameLower field exists; if not, add it
            if (!data.lastNameLower && data.lastName) {
              await updateDoc(userDocRef, {
                lastNameLower: data.lastName.toLowerCase(),
              });
            }
          } else {
            console.error('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
  },
  mounted() {
    this.fetchUserProfile(); // Fetch user data when component mounts
  },
};
</script>

<style scoped>
button {
  margin-bottom: 20px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}
</style>
