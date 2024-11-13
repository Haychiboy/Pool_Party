<template>
  <div id="app">
    <h1>Welcome to Pool Party</h1>
    <router-view></router-view> <!-- Displays the current route component -->
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchUser'); // Fetch user on app load
    });
  }
};
</script>

