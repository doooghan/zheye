import { createPinia, defineStore } from "pinia";
import axios from "axios";
import { GlobalDataProps, PostProps } from "@/types";
export const pinia = createPinia();

export const useMainStore = defineStore("main", {
	state: (): GlobalDataProps => ({
		column: [],
		posts: [],
		user: { isLogin: true, name: "ddd", columnId: 2 },
	}),

	getters: {
		getColumnById: (state) => {
			return (id: number) => state.column.find((c) => c.id === id);
		},
		getPostsById: (state) => {
			return (id: number) => state.posts.filter((p) => p.columnId === id);
		},
	},
	actions: {
		login() {
			this.user = { ...this.user, name: "vik", isLogin: true };
		},
		createPost(newPost: PostProps) {
			this.posts.push(newPost);
		},
		fetchColumn() {
			axios.get("/columns?currentPage=1&pageSize=6").then((resp) => {
				this.column = resp.data.data.list;
			});
		},
	},
});
