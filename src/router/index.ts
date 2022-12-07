import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeVue from "@/views/Home.vue";
import LoginVue from "@/views/Login.vue";
import ColumnDetailVue from "@/views/ColumnDetail.vue";
import CreatePostVue from "@/views/CreatePost.vue";

const routes: RouteRecordRaw[] = [
	{ path: "/", name: "Home", component: HomeVue },
	{ path: "/login", name: "Login", component: LoginVue },
	{ path: "/column/:id", name: "ColumnDetail", component: ColumnDetailVue },
	{ path: "/create", name: "CreatePost", component: CreatePostVue },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
