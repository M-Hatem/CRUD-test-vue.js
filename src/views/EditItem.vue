<template>
  <div class="container">
    <div class="row">
      <div class="col-12 title my-5">
        <h1>Edit an Item</h1>
      </div>
      <ItemForm />
    </div>
  </div>
</template>

<script>
// To import form
import ItemForm from "@/components/items/ItemForm.vue";

export default {
  name: "EditItem",
  components: {
    ItemForm,
  },
};
</script>
