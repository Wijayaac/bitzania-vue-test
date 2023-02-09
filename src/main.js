import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import MovieItem from "./components/MovieItem.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

app.component("MovieItem", MovieItem);
