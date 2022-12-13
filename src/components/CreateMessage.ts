import { createApp } from "vue";
import messageVue, { MessageType } from "./Message.vue";

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
	const messageInstance = createApp(messageVue, { message, type });
	const mountNode = document.createElement("div");
	document.body.appendChild(mountNode);
	messageInstance.mount(mountNode);

	setTimeout(() => {
		messageInstance.unmount();
		document.body.removeChild(mountNode);
	}, timeout);
};
export default createMessage;
