<template>
  <form class="mb-5">
    <div class="mb-3 w-100">
      <MDBInput label="Search" v-model="search" />
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <span>
        <span class="fs-5 me-2">Sort By:</span>
        <span class="me-2 text-primary">ID</span>
        <Toggle v-model="isSorted" @change="sort" />
        <span class="ms-2 text-danger">Sort</span>
      </span>
      <div>
        <MDBBtn color="primary" class="me-3" @click.prevent="searchItem">
          Search
        </MDBBtn>
        <MDBBtn color="danger" class="me-3" @click.prevent="resetItems">
          Reset
        </MDBBtn>
      </div>
    </div>
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
      @getItems="pages ? paginateAfterDelete() : getItems()"
    />
  </MDBListGroup>
  <!-- Pagination -->
  <div class="d-flex justify-content-center mt-4">
    <Paginator
      v-model:rows="rows"
      :totalRecords="totalCount"
      :rowsPerPageOptions="[10, 25, 50]"
      @page="onPage($event)"
    ></Paginator>
  </div>
</template>

<script>
// To import axios in order to request API
import axios from "axios";
// To import mdb in order to style the output of the API
import { MDBListGroup, MDBBtn, MDBInput } from "mdb-vue-ui-kit";
import Paginator from "primevue/paginator";
import Toggle from "@vueform/toggle";

// To import single Item component
import SingleItem from "@/components/items/SingleItem.vue";

export default {
  name: "Items",
  components: {
    MDBListGroup,
    SingleItem,
    MDBBtn,
    MDBInput,
    Paginator,
    Toggle,
  },
  data() {
    return {
      items: [],
      search: "",
      isSorted: false,
      rows: 10,
      pages: null,
      totalCount: 0,
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

          // For sorting
          if (this.isSorted)
            this.items = information
              .slice()
              .sort((a, b) => (a.sort > b.sort ? 1 : -1));
          else this.items = information;

          // To assign total count for pagination
          this.totalCount = totalCount;

          // Conditions for empty array
          if (this.items.length === 0) this.getItems();
        });
    },

    // To paginate between pages
    onPage(event) {
      this.pages = { ...event };
      if (!this.search) {
        this.getItems(event.first, event.page, event.rows);
      }
    },

    // To save a specific page after deletion
    paginateAfterDelete() {
      const event = this.pages;
      this.getItems(event.first, event.page, event.rows);
    },

    // To filter wanted items
    filterItems() {
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
          // For sorting
          if (this.isSorted)
            this.items = items
              .slice()
              .sort((a, b) => (a.sort > b.sort ? 1 : -1));
          else this.items = items;

          // To assign total count for pagination
          this.totalCount = items.length;
        });
    },

    // To search for an item
    searchItem() {
      this.filterItems();
    },

    // To reset items
    resetItems() {
      document.querySelector(".p-paginator-first").click();
      this.search = "";
      this.getItems();
    },

    // To sort items
    sort() {
      document.querySelector(".p-paginator-first").click();
      if (this.isSorted)
        this.items = this.items
          .slice()
          .sort((a, b) => (a.sort > b.sort ? 1 : -1));
      else this.getItems();
    },
  },
  created() {
    // To call items after component initializaion
    this.getItems();
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
