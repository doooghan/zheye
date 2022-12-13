import { createPinia, defineStore } from "pinia";
import axios from "axios";
import { GlobalDataProps, PostProps } from "@/types";
export const pinia = createPinia();

export const useMainStore = defineStore("main", {
	state: (): GlobalDataProps => ({
		isLoading: false,
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
				email: "111@test.com",
				password: "111111",
			});
			const { token } = data.data;
			this.token = token;
			localStorage.setItem("token", token);
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			return data;
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

		createPost(newPost: PostProps) {
			this.posts.push(newPost);
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
	},
});
