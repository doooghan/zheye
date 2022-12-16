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
		columns: { data: {}, currentPage: 0, total: 0 },
		posts: { data: {}, loadedColumns: [] },
		user: { isLogin: false },
	}),

	getters: {
		getColumns: (state) => {
			return objToArr(state.columns.data);
		},
		getColumnById: (state) => {
			return (id: string) => state.columns.data[id];
		},
		getPostsByCId: (state) => {
			return (id: string) =>
				objToArr(state.posts.data).filter((p) => p.column === id);
		},
		getCurrentPost: (state) => {
			return (id: string) => state.posts.data[id];
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
			this.posts.data[newPost._id as string] = newPost;
			const { data } = await axios.post("/posts", newPost);
			return data;
		},

		async fetchColumns(params: any = {}) {
			const { currentPage = 1, pageSize = 6 } = params;
			if (currentPage > this.columns.currentPage) {
				const { data } = await axios.get(
					`/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
				);
				const { list, count } = data.data;
				this.columns = {
					data: { ...this.columns.data, ...arrToObj(list) },
					total: count,
					currentPage,
				};
			}
		},
		async fetchColumn(cid: string) {
			if (!this.columns.data[cid]) {
				const { data } = await axios.get(`/columns/${cid}`);
				this.columns.data[cid] = data.data;
			}
		},
		async fetchPosts(cid: string) {
			if (!this.posts.loadedColumns.includes(cid)) {
				const { data } = await axios.get(
					`/columns/${cid}/posts?currentPage=1&pageSize=3`,
				);
				this.posts.data = { ...this.posts.data, ...arrToObj(data.data.list) };
				this.posts.loadedColumns.push(cid);
			}
		},
		async fetchPost(id: string) {
			const currentPost = this.posts.data[id];
			// rome-ignore lint: reason
			if (!currentPost || !currentPost.content) {
				const { data } = await axios.get(`/posts/${id}`);
				this.posts.data[id] = data.data;
				return data;
			} else {
				return Promise.resolve({ data: currentPost });
			}
		},
		async patchPost(id: string, newPost: PostProps) {
			this.posts.data[id] = newPost;

			const { data } = await axios.patch(`/posts/${id}`, newPost);
			return data;
		},
		async deletePost(id: string) {
			delete this.posts.data?.[id];
			const { data } = await axios.delete(`/posts/${id}`);
			return data;
		},
	},
});
