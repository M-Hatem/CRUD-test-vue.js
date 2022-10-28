<template>
  <navbar />
  <RouterView />
</template>

<script>
import Home from "@/views/HomeView.vue";
import navbar from "@/components/Navbar.vue";

import { RouterView, RouterLink } from "vue-router";

export default {
  name: "App",
  components: {
    Home,
    navbar,
  },
};
</script>
