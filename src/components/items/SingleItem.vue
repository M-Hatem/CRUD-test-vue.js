<template>
  <MDBListGroupItem tag="a" href="#" ripple noBorder spacing action>
    <div class="d-flex justify-content-between align-items-center">
      <p class="m-0">
        {{ item.arrivingEnglishName }} - {{ item.arrivingArabicName }}
      </p>
      <div class="ms-auto">
        <MDBBtn color="primary me-2" rounded>Edit</MDBBtn>
        <MDBBtn color="danger" rounded>Delete</MDBBtn>
      </div>
    </div>
  </MDBListGroupItem>
</template>

<script>
// To import mdb in order to style the output of the API
import { MDBListGroupItem, MDBBtn } from "mdb-vue-ui-kit";

export default {
  name: "SingleItem",
  components: {
    MDBListGroupItem,
    MDBBtn,
  },
  props: ["item"],
};
</script>
