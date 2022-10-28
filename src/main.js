import { createApp } from "vue";
import { createPinia } from "pinia";
// Toast Plugin
import ToastPlugin from "vue-toast-notification";

import App from "./App.vue";
import router from "./router";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "mdb-vue-ui-kit/css/mdb.min.css";
import "../node_modules/vue-toast-notification/dist/theme-sugar.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ToastPlugin);

app.mount("#app");
