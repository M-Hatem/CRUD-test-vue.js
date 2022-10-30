<template>
  <form @submit.prevent="id ? onEdit() : onSubmit()">
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
        <MDBInput type="number" label="Sort Number" v-model.number="sort" />
      </MDBCol>
    </MDBRow>

    <MDBBtn color="primary" block class="mb-4" type="submit">
      {{ id ? "Edit Item" : "Add Item" }}
    </MDBBtn>
  </form>
</template>

<script>
// To import axios
import axios from "axios";

// To import sweetalert
import Swal from "sweetalert2";

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
      sort: null,
      id: null,
    };
  },
  methods: {
    // To unify add or edit apis
    edit(formData) {
      axios
        .post(
          "http://40.127.194.127:777/api/Emergency/AddOrUpdateArrivingMethod",
          formData,
          {
            headers: { "Content-Type": "application/json; charset=UTF-8" },
          }
        )
        .then((data) => {
          const { status } = data;

          if (status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item added Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$router.push({ name: "Home" });
          }
        })
        .catch((err) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${err}`,
            showConfirmButton: true,
            timer: 1500,
          });
        });
    },

    // To add an item
    onSubmit() {
      if (!this.arabic || !this.english || !this.sort) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `You must fill all the form first!`,
          showConfirmButton: true,
        });
        return;
      }

      const formData = JSON.stringify({
        sort: this.sort,
        accountId: 1,
        arrivingArabicName: this.arabic,
        arrivingEnglishName: this.english,
      });

      this.edit(formData);
    },

    // To edit an item
    onEdit() {
      if (!this.arabic || !this.english || !this.sort) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `You must fill all the form first!`,
          showConfirmButton: true,
        });
        return;
      }

      const formData = JSON.stringify({
        id: this.id,
        sort: this.sort,
        arrivingArabicName: this.arabic,
        arrivingEnglishName: this.english,
      });

      this.edit(formData);
    },
  },

  created() {
    const id = +this.$route.params.id;
    this.id = id;

    if (id) {
      axios
        .get(
          "http://40.127.194.127:777/api/Emergency/GetAllArrivingMethods?first=0&page=0&rows=10"
        )
        .then((data) => {
          const {
            data: { data: items },
          } = data;
          const item = items.filter((obj) => obj.id === id)[0];

          this.sort = item.sort;
          this.arabic = item.arrivingArabicName;
          this.english = item.arrivingEnglishName;
        });
    }
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
