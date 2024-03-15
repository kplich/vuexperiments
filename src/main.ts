import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./common/VApp.vue";
import { router } from "./common/router";

import "./common/assets/main.scss";
import { clickOutside } from "@/common/directives/clickOutside";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.directive("clickOutside", clickOutside);

app.mount("#app");
