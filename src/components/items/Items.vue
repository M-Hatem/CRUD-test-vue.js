<template>
  <form class="d-flex justify-content-between align-items-center mb-5">
    <div class="me-4 w-100">
      <MDBInput label="Search" v-model="search" />
    </div>
    <MDBBtn color="primary" class="me-3" @click.prevent="searchItem">
      Search
    </MDBBtn>
    <MDBBtn color="danger" @click.prevent="resetItems">Reset</MDBBtn>
  </form>
  <!-- Error message block -->
  <div class="alert alert-danger" role="alert" v-if="!items?.length">
    No Results Found!
  </div>
  <MDBListGroup light>
    <!-- Item component -->
    <SingleItem
      v-for="item of items"
      :key="item.id"
      :item="item"
      @getItems="paginateAfterDelete"
    />
  </MDBListGroup>
  <!-- Pagination -->
  <div class="d-flex justify-content-center mt-4">
    <pagination
      v-model="page"
      :records="totalCount"
      :per-page="perPage"
      @paginate="paginate"
      ref="paginator"
    />
  </div>
</template>

<script>
// To import axios in order to request API
import axios from "axios";
// To import mdb in order to style the output of the API
import { MDBListGroup, MDBBtn, MDBInput } from "mdb-vue-ui-kit";
import Pagination from "v-pagination-3";

// To import single Item component
import SingleItem from "@/components/items/SingleItem.vue";

export default {
  name: "Items",
  components: {
    MDBListGroup,
    SingleItem,
    MDBBtn,
    MDBInput,
    Pagination,
  },
  data() {
    return {
      items: [],
      search: "",
      page: 1,
      totalCount: 0,
      perPage: 10,
      paginationInfo: {},
    };
  },
  methods: {
    // To get all items
    getItems(first = 0, page = 0, rows = 10) {
      axios
        .get(
          `http://40.127.194.127:777/api/Emergency/GetAllArrivingMethods?first=${first}&page=${page}&rows=${rows}`
        )
        .then((res) => {
          const {
            data: { data: information, totalCount },
          } = res;
          this.items = information;
          this.totalCount = totalCount;

          if (this.items.length === 0) this.getItems();
        });
    },

    // To paginate between pages
    paginate(e) {
      const currentPage = e - 1;
      const first = currentPage * this.perPage;
      this.paginationInfo = { first, currentPage, perPage: this.perPage };
      this.getItems(first, currentPage, this.perPage);
    },

    // To search for an item
    searchItem() {
      axios
        .get(
          `http://40.127.194.127:777/api/Emergency/GetAllArrivingMethods?first=0&page=0&rows=10`
        )
        .then((res) => {
          const {
            data: { data: information },
          } = res;
          const items = information.filter((obj) =>
            Object.values(obj)
              .toString()
              .toLocaleUpperCase()
              .includes(this.search.toLocaleUpperCase())
          );
          this.items = items;
          this.totalCount = items.length;
        });
    },

    // To reset items
    resetItems() {
      this.$refs.paginator.setPage(1);
      this.search = "";
      this.getItems();
    },

    // To save a specific page after deletion
    paginateAfterDelete() {
      const { first, currentPage, perPage } = this.paginationInfo;
      this.getItems(first, currentPage, perPage);
    },
  },
  created() {
    // To call items after component initializaion
    this.getItems();
  },
};
</script>
