<template>
  <div>
    <button @click="goBack">Back</button>
    <h2>Your Pool Party</h2>
    <div v-if="pool">
      <p><strong>Pool Name:</strong> {{ pool.name }}</p>
      <p><strong>Pool ID:</strong> {{ pool.id }}</p>
    </div>
    <p v-else>No pool data found or still loading...</p>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      pool: null, // To store pool data
    };
  },
  methods: {
    goBack() {
      this.$router.back(); // Navigate back to the previous page
    },
    async fetchPoolData(user) {
      try {
        const db = getFirestore();
        const q = query(
          collection(db, 'pools'),
          where('createdBy', '==', user.uid) // Query pools created by the user
        );

        console.log('Fetching pools for user:', user.uid);

        const querySnapshot = await getDocs(q);

        console.log('Query result:', querySnapshot.docs);

        if (!querySnapshot.empty) {
          const poolDoc = querySnapshot.docs[0];
          this.pool = { id: poolDoc.id, ...poolDoc.data() };
          console.log('Pool data fetched:', this.pool);
        } else {
          console.error('No pool found for this user.');
        }
      } catch (error) {
        console.error('Error fetching pool data:', error);
      }
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User authenticated:', user.uid);
        this.fetchPoolData(user);
      } else {
        console.error('User not authenticated.');
      }
    });
  },
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
}

p {
  margin: 10px 0;
  font-size: 16px;
}
</style>
