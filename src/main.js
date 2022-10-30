import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import "../node_modules/primeicons/primeicons.css";
import "../node_modules/primevue/resources/primevue.min.css";
import "../node_modules/primevue/resources/themes/saga-blue/theme.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "mdb-vue-ui-kit/css/mdb.min.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.mount("#app");
