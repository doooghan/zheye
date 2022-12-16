import { useMainStore } from "@/stores";
import { computed, ComputedRef, ref } from "vue";

export interface LoadParams {
	currentPage: number;
	pageSize: number;
}

const useLoadMore = (
	actionName: string,
	total: ComputedRef<number>,
	params: LoadParams = { currentPage: 2, pageSize: 5 },
) => {
	const store = useMainStore();
	const currentPage = ref(params.currentPage);
	const requestParams = computed(() => ({
		currentPage: currentPage.value,
		pageSize: params.pageSize,
	}));

	const loadMorePage = () => {
		store[actionName](requestParams.value).then(() => {
			currentPage.value++;
		});
	};

	const isLastPage = computed(() => {
		return Math.ceil(total.value / params.pageSize) === currentPage.value - 1;
	});

	return { loadMorePage, isLastPage };
};

export default useLoadMore;
