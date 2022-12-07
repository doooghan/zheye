import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		proxy: {
			"/api": {
				target: "http://api.vikingship.xyz/",
				// 是否允许跨域,在本地会创建一个虚拟服务端，然后发送请求的数据
				changeOrigin: true,
			},
		},
	},

	base: "./",
	resolve: {
		alias: {
			"@": path.join(__dirname, "./src"),
		},
	},
});
