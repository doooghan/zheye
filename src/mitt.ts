import mitt from "mitt";

type Events = {
	// "form-item-created": () => boolean;
	"form-item-created": string;
};

export const emitter = mitt<Events>();
