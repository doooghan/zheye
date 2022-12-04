import { ref } from "vue";
import axios from "axios";

function useURLLoader<T>(url: string) {
	const loading = ref(true);
	const loaded = ref(false);
	const result = ref<T | null>(null);
	const error = ref(null);

	axios
		.get(url)
		.then((rawData) => {
			loaded.value = true;
			result.value = rawData.data;
		})
		.catch((e) => {
			error.value = e;
		})
		.finally(() => (loading.value = false));

	return {
		loading,
		loaded,
		result,
		error,
	};
}

export default useURLLoader;
