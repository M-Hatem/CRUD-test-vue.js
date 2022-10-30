<template>
  <MDBListGroupItem tag="a" href="#" ripple noBorder spacing action>
    <div class="d-flex justify-content-between align-items-center">
      <p class="m-0">
        {{ item.id }} : {{ item.arrivingEnglishName }} -
        {{ item.arrivingArabicName }}
      </p>
      <div class="ms-auto">
        <MDBBtn color="primary me-2" rounded @click.prevent="editItem(item.id)">
          Edit
        </MDBBtn>
        <MDBBtn color="danger" rounded @click.prevent="deleteItem(item.id)">
          Delete
        </MDBBtn>
      </div>
    </div>
  </MDBListGroupItem>
</template>

<script>
// To import axios
import axios from "axios";

// To import sweetalert
import Swal from "sweetalert2";

// To import mdb in order to style the output of the API
import { MDBListGroupItem, MDBBtn } from "mdb-vue-ui-kit";

export default {
  name: "SingleItem",
  components: {
    MDBListGroupItem,
    MDBBtn,
  },
  props: ["item"],
  emits: ["getItems"],
  methods: {
    // To edit an item
    editItem(id) {
      this.$router.push({ name: "Edit", params: { id: id } });
    },

    // To refresh items after deletion
    refreshItems() {
      this.$emit("getItems");
    },

    // To delete an item
    deleteItem(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = JSON.stringify(id);
          axios
            .post(
              "http://40.127.194.127:777/api/Emergency/DeleteArrivingMethod",
              formData,
              {
                headers: { "Content-Type": "application/json; charset=UTF-8" },
              }
            )
            .then((data) => {
              const { status } = data;
              if (status === 200) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                this.refreshItems();
              }
            });
        }
      });
    },
  },
};
</script>
