import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeVue from "@/views/Home.vue";
import LoginVue from "@/views/Login.vue";
import ColumnDetailVue from "@/views/ColumnDetail.vue";
import CreatePostVue from "@/views/CreatePost.vue";
import { useMainStore } from "@/stores";
import SignupVue from "@/views/Signup.vue";

const routes: RouteRecordRaw[] = [
	{ path: "/", name: "Home", component: HomeVue },
	{
		path: "/login",
		name: "Login",
		component: LoginVue,
		meta: { redirectAlreadyLogin: true },
	},
	{ path: "/signup", name: "Signup", component: SignupVue },
	{ path: "/column/:id", name: "ColumnDetail", component: ColumnDetailVue },
	{
		path: "/create",
		name: "CreatePost",
		component: CreatePostVue,
		meta: { requiredLogin: true },
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const store = useMainStore();
	if (to.meta.requiredLogin && !store.user.isLogin) {
		next({ name: "Login" });
	} else if (to.meta.redirectAlreadyLogin && store.user.isLogin) {
		next({ name: "Home" });
	} else {
		next();
	}
});
