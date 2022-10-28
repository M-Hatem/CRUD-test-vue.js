<template>
  <form @submit.prevent="onSubmit">
    <MDBRow class="mb-4">
      <MDBCol>
        <MDBInput type="text" label="Arabic Name" v-model="arabic" />
      </MDBCol>
      <MDBCol>
        <MDBInput type="text" label="English Name" v-model="english" />
      </MDBCol>
    </MDBRow>

    <MDBRow class="mb-4">
      <MDBCol>
        <MDBInput type="number" label="ID" v-model.number="id" />
      </MDBCol>
      <MDBCol>
        <MDBInput type="number" label="Sort" v-model.number="sort" />
      </MDBCol>
    </MDBRow>
    <MDBRow class="mb-4">
      <MDBCol>
        <MDBInput type="number" label="Account ID" v-model="accID" disabled />
      </MDBCol>
    </MDBRow>

    <MDBBtn color="primary" block class="mb-4" type="submit"> Add Item </MDBBtn>
  </form>
</template>

<script>
// To import axios
import axios from "axios";

// To import style from MDB
import { MDBInput, MDBBtn, MDBRow, MDBCol } from "mdb-vue-ui-kit";

export default {
  name: "ItemForm",
  components: {
    MDBInput,
    MDBBtn,
    MDBRow,
    MDBCol,
  },
  data() {
    return {
      arabic: "",
      english: "",
      id: null,
      sort: null,
      accID: 1,
      addUrl:
        "http://40.127.194.127:777/api/Emergency/AddOrUpdateArrivingMethod",
    };
  },
  methods: {
    onSubmit() {
      if (!this.arabic || !this.english || !this.id || !this.sort) {
        this.$toast.open({
          message: `You must fill all the form first!`,
          type: "error",
          duration: 3000,
        });
        return;
      }

      const formData = JSON.stringify({
        id: this.id,
        accountId: 1,
        arrivingArabicName: this.arabic,
        arrivingEnglishName: this.english,
        sort: this.sort,
      });

      axios
        .post(this.addUrl, formData, {
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })
        .then(() => {
          this.$toast.open({
            message: `Item added Successfully!`,
            type: "success",
            duration: 3000,
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.title {
  background-color: rgb(175, 172, 172);
  border-radius: 5px;
  text-align: center;
}
.title h1 {
  color: #fff;
  padding: 20px 0;
  margin: 0;
}
</style>
