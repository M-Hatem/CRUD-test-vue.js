import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "mdb-vue-ui-kit/css/mdb.min.css";

const app = createApp(App);

app.use(router);

app.mount("#app");
