import mitt from "mitt";

type Events = {
	"form-item-created": () => boolean;
};

export const emitter = mitt<Events>();
