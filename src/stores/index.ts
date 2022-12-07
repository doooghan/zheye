import { createPinia, defineStore } from "pinia";
import { testData, ColumnProps, testPosts, PostProps } from "@/testData";

export const pinia = createPinia();

export interface UserProps {
	isLogin: boolean;
	name?: string;
	id?: number;
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
		user: { isLogin: false },
	}),

	getters: {},
	actions: {
		login() {
			this.user = { ...this.user, name: "vik", isLogin: true };
		},
	},
});
