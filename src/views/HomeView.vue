<template>
  <section class="container mt-5">
    <items />
  </section>
</template>

<script>
import items from "@/components/items/Items.vue";

export default {
  name: "Home",
  components: {
    items,
  },
};
</script>
