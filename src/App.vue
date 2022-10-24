<template>
  <navbar />
  <home />
</template>

<script>
import Home from "@/views/HomeView.vue";
import navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Home,
    navbar,
  },
};
</script>
