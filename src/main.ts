import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./common/App.vue";
import { router } from "./common/router";

import "./common/assets/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
