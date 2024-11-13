<!-- src/components/ProfileComponent.vue -->
<template>
  <div>
    <h2>User Profile</h2>
    <p><strong>Email:</strong> {{ email }}</p>
    <p><strong>Name:</strong> {{ firstName }} {{ lastName }}</p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default {
  setup() {
    const auth = getAuth();
    const db = getFirestore();
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');

    onMounted(async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          firstName.value = data.firstName;
          lastName.value = data.lastName;
          email.value = data.email;
        }
      }
    });

    return { firstName, lastName, email };
  }
};
</script>
