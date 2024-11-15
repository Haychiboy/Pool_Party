<template>
  <div>
    <button @click="goBack">Back</button>
    <h2>Create a New Pool</h2>
    <form @submit.prevent="createPool">
      <!-- Pool Name -->
      <label for="poolName">Pool Name:</label>
      <input 
        type="text" 
        v-model="poolName" 
        id="poolName" 
        placeholder="Enter pool name" 
      />
      <p v-if="!isPoolNameValid && poolNameTouched" class="error-message">
        Pool name must be at least 3 characters long.
      </p>

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
      <button 
        type="button" 
        @click="addMember"
        :disabled="!memberSearch.trim()"
      >
        Add
      </button>

      <!-- Selected Members -->
      <div v-if="selectedMembers.length" class="selected-members">
        <h3>Selected Members:</h3>
        <div class="member-card" v-for="member in selectedMembers" :key="member.id">
          <div>
            <p><strong>Name:</strong> {{ member.name }}</p>
            <p><strong>Email:</strong> {{ member.email }}</p>
          </div>
          <button @click="removeMember(member.id)" class="remove-button">Remove</button>
        </div>
      </div>
      <p v-else>You can create a pool even without adding members.</p>

      <!-- Submit Button -->
      <button type="submit" :disabled="!isPoolNameValid">Create Pool</button>
      <p v-if="message" class="info-message">{{ message }}</p>
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
      poolNameTouched: false,
      message: '', // For user feedback
    };
  },
  computed: {
    isPoolNameValid() {
      return this.poolName.trim().length >= 3;
    },
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
      const searchTerm = this.memberSearch.toLowerCase();
      const q = query(
        collection(db, 'users'),
        where('lastNameLower', '==', searchTerm)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = { id: doc.id, ...doc.data() };

          // Dynamically construct the name if it doesn't exist
          userData.name =
            userData.name ||
            `${userData.firstName || ''} ${userData.lastName || ''}`.trim();

          // Avoid duplicates
          if (!this.selectedMembers.find((member) => member.id === userData.id)) {
            this.selectedMembers.push(userData);
          }
        });
        this.memberSearch = ''; // Clear the search field
        this.message = 'Member added successfully.';
      } else {
        this.message = 'User not found.';
      }
    },
    removeMember(memberId) {
      // Remove member from selectedMembers by ID
      this.selectedMembers = this.selectedMembers.filter(
        (member) => member.id !== memberId
      );
      this.message = 'Member removed successfully.';
    },
    async createPool() {
  try {
    const auth = getAuth();
    const db = getFirestore();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("User is not authenticated.");
      this.message = "You must be logged in to create a pool.";
      return;
    }

    const newPool = {
      name: this.poolName,
      amount: this.poolAmount,
      members: this.selectedMembers.map((member) => member.id),
      numMembers: this.numMembers,
      createdBy: currentUser.uid,
    };

    console.log("New Pool Data:", newPool);

    await addDoc(collection(db, 'pools'), newPool);

    console.log("Pool created successfully!");
    this.message = "Pool created successfully!";
    this.$router.push('/dashboard');
  } catch (error) {
    console.error("Error in createPool:", error);
    this.message = "An error occurred while creating the pool.";
  }
},
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

.error-message {
  color: red;
  font-size: 14px;
  margin: 5px 0;
}

.info-message {
  color: blue;
  font-size: 14px;
  margin: 5px 0;
}
</style>
