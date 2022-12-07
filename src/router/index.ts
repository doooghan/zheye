import { createRouter, createWebHistory } from "vue-router";
import HomeVue from "@/views/Home.vue";
import LoginVue from "@/views/Login.vue";
import ColumnDetailVue from "@/views/ColumnDetail.vue";

const routes = [
	{ path: "/", name: "Home", component: HomeVue },
	{ path: "/login", name: "Login", component: LoginVue },
	{ path: "/column/:id", name: "ColumnDetail", component: ColumnDetailVue },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
