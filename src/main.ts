import { createApp } from "vue";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import { router } from "./router";
import { pinia } from "@/stores";
import axios from "axios";

axios.defaults.baseURL = "/api/";
axios.get("/columns?currentPage=1&pageSize=6").then((resp) => {
	console.log(resp.data);
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
