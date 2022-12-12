import { createApp } from "vue";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.vue";
import { router } from "./router";
import { pinia, useMainStore } from "@/stores";
import axios from "axios";

axios.defaults.baseURL = "/api/";
axios.interceptors.request.use((config) => {
	const store = useMainStore();
	store.setLoading(true);
	return config;
});
axios.interceptors.response.use((config) => {
	const store = useMainStore();
	store.setLoading(false);
	return config;
});

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
