import { reactive, toRefs, onMounted, onUnmounted } from "vue";

function useMousePosition() {
	const coord = reactive({
		x: 0,
		y: 0,
	});

	const updateMouse = (e: MouseEvent) => {
		coord.x = e.pageX;
		coord.y = e.pageY;
	};
	onMounted(() => {
		document.addEventListener("click", updateMouse);
	});
	onUnmounted(() => {
		document.removeEventListener("click", updateMouse);
	});

	return toRefs(coord);
}
export default useMousePosition;
