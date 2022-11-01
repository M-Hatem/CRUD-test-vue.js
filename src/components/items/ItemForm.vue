<template>
  <VeeForm
    :validation-schema="schema"
    @submit="onSubmit"
    :initial-values="itemData"
  >
    <MDBRow class="mb-4">
      <!-- Arabic Name -->
      <MDBCol>
        <label for="arabic-name">Arabic Name</label>
        <VeeField
          id="arabic-name"
          type="text"
          name="arrivingArabicName"
          class="form-control"
          placeholder="Arabic Name"
        />
        <error-message class="text-danger d-block" name="arrivingArabicName" />
      </MDBCol>
      <!-- English Name -->
      <MDBCol>
        <label for="english-name">English Name</label>
        <VeeField
          id="english-name"
          type="text"
          name="arrivingEnglishName"
          class="form-control"
          placeholder="English Name"
        />
        <error-message class="text-danger d-block" name="arrivingEnglishName" />
      </MDBCol>
    </MDBRow>

    <MDBRow class="mb-4">
      <!-- Sort Number -->
      <MDBCol>
        <label for="sort-number">Sort Number</label>
        <VeeField
          id="sort-number"
          type="number"
          label="Sort Number"
          name="sort"
          class="form-control"
          placeholder="Sort Number"
        />
        <error-message class="text-danger d-block" name="sort" />
      </MDBCol>
    </MDBRow>

    <MDBRow>
      <MDBCol>
        <div class="d-flex">
          <MDBBtn color="primary" block type="submit">
            {{ id ? "Edit Item" : "Add Item" }}
          </MDBBtn>
          <MDBBtn
            color="danger"
            block
            class="m-0 ms-4"
            type="button"
            @click="goBack"
          >
            Cancel
          </MDBBtn>
        </div>
      </MDBCol>
    </MDBRow>
  </VeeForm>
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
      schema: {
        arrivingArabicName: "required|min:3|max:100|alpha_spaces",
        arrivingEnglishName: "required|min:3|max:100|alpha_spaces",
        sort: "required|min_value:0|max_value:9999",
      },
      id: null,
      item: null,
      itemData: {
        arrivingArabicName: "",
        arrivingEnglishName: "",
        sort: "",
      },
    };
  },
  methods: {
    // For Form Submission
    onSubmit(formData) {
      if (this.id) {
        const id = this.id;
        const newFormData = { id, ...formData };
        this.sendData(newFormData);
      } else {
        this.sendData(formData);
      }
    },

    // For handeling data for submission
    sendData(formData) {
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

    // To go back and cancel editing or adding
    goBack() {
      this.$router.back(1);
    },
  },

  created() {
    const id = +this.$route.params.id;
    this.id = id;

    if (id) {
      axios
        .get(
          `http://40.127.194.127:777/api/Emergency/GetArrivingMethodById?id=${id}`
        )
        .then((data) => {
          const {
            data: { data: item },
          } = data;
          this.item = item;

          this.itemData.arrivingArabicName = item.arrivingArabicName;
          this.itemData.arrivingEnglishName = item.arrivingEnglishName;
          this.itemData.sort = item.sort;
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
