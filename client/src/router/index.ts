// @ts-ignore
import { RouteConfig, createWebHistory, createRouter } from "vue-router";
const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "home",
		component: import("../components/Tasks.vue"),
	},
	{
		path: "/signin",
		name: "signin",
		component: import("../pages/SignIn.vue"),
	},
	{
		path: "/signup",
		name: "signup",
		component: import("../pages/SignUp.vue"),
	},
	{
		path: "/addtask",
		name: "addtask",
		component: import("../pages/AddTask.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notfound",
		component: () => import("../pages/NotFound.vue"),
	},
	{
		path: "/task/:id",
		name: "task",
		component: () => import("../pages/Task.vue"),
		props: true,
	},
	// {
	// 	path: "/",
	// 	name: "contact.add",
	// 	component: () => import("../views/ContactAdd.vue"),
	// },
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
