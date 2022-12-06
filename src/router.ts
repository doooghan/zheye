import {createRouter, createWebHistory} from 'vue-router'
import HomeVue from './views/Home.vue';
import LoginVue from './views/Login.vue';

const routes = [
  { path: '/', component: HomeVue },
  { path: '/login', component: LoginVue },
]

export const router = createRouter({
  history: createWebHistory(),
	routes,
});
