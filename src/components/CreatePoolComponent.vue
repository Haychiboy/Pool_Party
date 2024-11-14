<template>
  <div>
    <button @click="goBack">Back</button>
    <h2>Create a New Pool</h2>
    <form @submit.prevent="createPool">
      <!-- Pool Name -->
      <label for="poolName">Pool Name:</label>
      <input type="text" v-model="poolName" id="poolName" placeholder="Enter pool name" />

      <!-- Pool Amount -->
      <label for="poolAmount">Pool Amount:</label>
      <select v-model="poolAmount" id="poolAmount" @change="updateMemberOptions">
        <option value="2000">2,000</option>
        <option value="5000">5,000</option>
      </select>

      <!-- Number of Members -->
      <label for="numMembers">Number of Members:</label>
      <select v-model="numMembers" id="numMembers">
        <option v-for="option in memberOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <!-- Search Bar for Adding Members by Last Name -->
      <label for="memberSearch">Add Members (by Last Name):</label>
      <input
        type="text"
        v-model="memberSearch"
        id="memberSearch"
        placeholder="Enter last name"
      />
      <button type="button" @click="addMember">Add</button>

      <!-- Selected Members -->
      <ul>
        <li v-for="member in selectedMembers" :key="member.id">
          {{ member.name }}
          <button @click="removeMember(member.id)">Remove</button>
        </li>
      </ul>

      <!-- Submit Button -->
      <button type="submit">Create Pool</button>
    </form>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export default {
  name: 'CreatePoolComponent',
  data() {
    return {
      poolName: '',
      poolAmount: '2000',
      numMembers: null,
      memberOptions: [4, 5], // Default options for 2,000 amount
      memberSearch: '',
      selectedMembers: [], // Stores selected members
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    updateMemberOptions() {
      // Update member options based on selected pool amount
      this.memberOptions = this.poolAmount === '2000' ? [4, 5] : [5, 10];
    },
    async addMember() {
  const db = getFirestore();
  const searchTerm = this.memberSearch.toLowerCase(); // Convert search term to lowercase
  const q = query(collection(db, 'users'), where('lastNameLower', '==', searchTerm)); // Query lowercase last name field
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // If the user exists, add to selectedMembers
    querySnapshot.forEach((doc) => {
      const userData = { id: doc.id, ...doc.data() };
      if (!this.selectedMembers.find((member) => member.id === userData.id)) {
        this.selectedMembers.push(userData);
      }
    });
    this.memberSearch = ''; // Clear the search field
  } else {
    alert('User not found.');
  }
},
    removeMember(memberId) {
      // Remove member from selectedMembers by ID
      this.selectedMembers = this.selectedMembers.filter(member => member.id !== memberId);
    },
    async createPool() {
      try {
        const auth = getAuth();
        const db = getFirestore();
        const currentUser = auth.currentUser;

        // Include the logged-in user in the pool if not already in selectedMembers
        if (!this.selectedMembers.find((member) => member.id === currentUser.uid)) {
          this.selectedMembers.push({
            id: currentUser.uid,
            name: currentUser.displayName || "Current User"
          });
        }

        const newPool = {
          name: this.poolName,
          amount: this.poolAmount,
          members: this.selectedMembers.map(member => member.id), // Store member IDs
          numMembers: this.numMembers,
          createdBy: currentUser.uid,
        };

        await addDoc(collection(db, 'Pools'), newPool);
        alert("Pool created successfully!");
        this.$router.push('/dashboard'); // Redirect to dashboard after creation
      } catch (error) {
        console.error("Error creating pool:", error);
      }
    }
  },
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
