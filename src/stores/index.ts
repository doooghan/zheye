import { createPinia, defineStore } from "pinia";
import axios from "axios";
import { GlobalDataProps, PostProps } from "@/types";
export const pinia = createPinia();

// const asyncAction =  async (url:string, that: ) => {

// }

export const useMainStore = defineStore("main", {
	state: (): GlobalDataProps => ({
		isLoading: false,
		columns: [],
		posts: [],
		user: { isLogin: true, name: "ddd", columnId: 2 },
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
		login() {
			this.user = { ...this.user, name: "vik", isLogin: true };
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
