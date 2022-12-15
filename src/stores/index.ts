import { createPinia, defineStore } from "pinia";
import axios from "axios";
import { GlobalDataProps, GlobalErrorProps, PostProps } from "@/types";
export const pinia = createPinia();

export const useMainStore = defineStore("main", {
	state: (): GlobalDataProps => ({
		isLoading: false,
		error: { status: false },
		token: localStorage.getItem("token") || "",
		columns: [],
		posts: [],
		user: { isLogin: false },
	}),

	getters: {
		getColumnById: (state) => {
			return (id: string) => state.columns.find((c) => c._id === id);
		},
		getPostsById: (state) => {
			return (id: string) => state.posts.filter((p) => p.column === id);
		},
	},
	actions: {
		async login(payload: any) {
			const { data } = await axios.post("/user/login", {
				...payload,
				// email: "111@test.com",
				// password: "111111",
			});
			const { token } = data.data;
			this.token = token;
			localStorage.setItem("token", token);
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			return data;
		},
		logout() {
			this.token = "";
			localStorage.removeItem("token");
			delete axios.defaults.headers.common?.Authorization;
		},
		async fetchCurrentUser() {
			const { data } = await axios.get("/user/current");
			this.user = { isLogin: true, ...data.data };
			return data;
		},
		async loginAndFetch(payload: any) {
			return this.login(payload).then(() => {
				return this.fetchCurrentUser();
			});
		},

		setLoading(status: boolean) {
			this.isLoading = status;
		},
		setError(e: GlobalErrorProps) {
			this.error = e;
		},

		async createPost(newPost: PostProps) {
			const { data } = await axios.post("/posts", newPost);
			return data;
		},

		async fetchColumns() {
			const { data } = await axios.get("/columns?currentPage=1&pageSize=6");
			this.columns = data.data.list;
		},
		async fetchColumn(id: string) {
			const { data } = await axios.get(`/columns/${id}`);
			this.columns = [data.data];
		},
		async fetchPosts(id: string) {
			const { data } = await axios.get(
				`/columns/${id}/posts?currentPage=1&pageSize=3`,
			);
			this.posts = data.data.list;
		},
		async fetchPost(id: string) {
			const { data } = await axios.get(`/posts/${id}`);
			this.posts = [data.data];
			return data;
		},
		async patchPost(id: string, newPost: PostProps) {
			const { data } = await axios.patch(`/posts/${id}`, newPost);
			return data;
		},
		async deletePost(id: string) {
			const { data } = await axios.delete(`/posts/${id}`);
			return data;
		},
	},
});
