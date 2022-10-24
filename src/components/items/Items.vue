<template>
  <MDBListGroup light>
    <SingleItem v-for="item of items" :key="item.id" :item="item" />
  </MDBListGroup>
</template>

<script>
// To import axios in order to request API
import axios from "axios";
// To import mdb in order to style the output of the API
import { MDBListGroup } from "mdb-vue-ui-kit";
// To import single Item component
import SingleItem from "@/components/items/SingleItem.vue";

export default {
  name: "Items",
  components: {
    MDBListGroup,
    SingleItem,
  },
  data() {
    return {
      items: [],
      getItemsURL:
        "http://40.127.194.127:777/api/Emergency/GetAllArrivingMethods?first=0&page=0&rows=10",
    };
  },
  methods: {
    getItems() {
      axios.get(this.getItemsURL).then((res) => {
        const {
          data: { data: information },
        } = res;
        this.items = information;
        console.log(this.items);
      });
    },
  },
  created() {
    this.getItems();
  },
};
</script>
