import { createPinia, defineStore } from "pinia";
import axios from "axios";
import { GlobalDataProps, GlobalErrorProps, PostProps } from "@/types";
import { arrToObj, objToArr } from "@/helpers";
export const pinia = createPinia();

export const useMainStore = defineStore("main", {
	state: (): GlobalDataProps => ({
		isLoading: false,
		error: { status: false },
		token: localStorage.getItem("token") || "",
		columns: {},
		posts: {},
		user: { isLogin: false },
	}),

	getters: {
		getColumns: (state) => {
			return objToArr(state.columns);
		},
		getColumnById: (state) => {
			return (id: string) => state.columns[id];
		},
		getPostsByCId: (state) => {
			return (id: string) =>
				objToArr(state.posts).filter((p) => p.column === id);
		},
		getCurrentPost: (state) => {
			return (id: string) => state.posts[id];
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
		logout() {
			this.user = { isLogin: false };
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
			this.posts[newPost._id as string] = newPost;
			const { data } = await axios.post("/posts", newPost);
			return data;
		},

		async fetchColumns() {
			const { data } = await axios.get("/columns?currentPage=1&pageSize=6");
			this.columns = arrToObj(data.data.list);
		},
		async fetchColumn(id: string) {
			const { data } = await axios.get(`/columns/${id}`);
			this.columns[data.data._id] = data.data;
		},
		async fetchPosts(id: string) {
			const { data } = await axios.get(
				`/columns/${id}/posts?currentPage=1&pageSize=3`,
			);
			this.posts = arrToObj(data.data.list);
		},
		async fetchPost(id: string) {
			const { data } = await axios.get(`/posts/${id}`);
			this.posts[data.data._id] = data.data;
			return data;
		},
		async patchPost(id: string, newPost: PostProps) {
			this.posts[id] = newPost;

			const { data } = await axios.patch(`/posts/${id}`, newPost);
			return data;
		},
		async deletePost(id: string) {
			delete this.posts?.[id];
			const { data } = await axios.delete(`/posts/${id}`);
			return data;
		},
	},
});
