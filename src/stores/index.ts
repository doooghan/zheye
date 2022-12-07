import { createPinia, defineStore } from "pinia";
import { testData, ColumnProps, testPosts, PostProps } from "@/testData";

export const pinia = createPinia();

export interface UserProps {
	isLogin: boolean;
	name?: string;
	id?: number;
	columnId?: number;
}
export interface GlobalDataProps {
	column: ColumnProps[];
	posts: PostProps[];
	user: UserProps;
}
export const useMainStore = defineStore("main", {
	state: (): GlobalDataProps => ({
		column: testData,
		posts: testPosts,
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
	},
});
