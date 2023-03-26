import { Mutation } from "./../../node_modules/vuex/types/index.d";
import { createStore } from "vuex";
import agent from "../api/agent";
import router from "../router";
import axios from "axios";

const store = createStore({
	state: {
		register: {
			username: "",
			email: "",
			password: "",
		},
		login: {
			username: "",
			password: "",
		},
		addTask: {
			name: "",
			description: "",
		},
		updateTask: {
			name: "",
			description: "",
		},
		token: "",
		user: null,
      tasks: [],
	},
	getters: {},
	mutations: {
		//Register
		setUsername(state, value) {
			state.register.username = value;
		},
		setPassword(state, value) {
			state.register.password = value;
		},
		setEmail(state, value) {
			state.register.email = value;
		},

		//Login
		setUsernameLogin(state, value) {
			state.login.username = value;
		},
		setPasswordLogin(state, value) {
			state.login.password = value;
		},

		// set token jwt
		setToken(state) {
			const user = JSON.parse(localStorage.getItem("userLogin")!);
			state.token = user.accessToken;
		},
		setUser(state) {
			const user = JSON.parse(localStorage.getItem("userLogin")!);
			state.user = user.user;
		},

		setLogout(state) {
			state.user = null;
		},
      SET_TASKS(state, payload) {
         state.tasks = payload
      },
		//add task
		SET_TASK_NAME(state, value) {
			state.addTask.name = value;
		},
		SET_TASK_DESC(state, value) {
			state.addTask.description = value;
		},
		//update task
		SET_UPDATE_NAME(state, value) {
			state.updateTask.name = value;
		},
		SET_UPDATE_DESC(state, value) {
			state.updateTask.description = value;
		},
	},
	actions: {
		async submitRegister() {
			try {
				await agent.Authen.register(this.state.register)
					.then((res) => {
						alert("Register succesfull");
						router.push("/signin");
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
		async submitLogin({ commit }) {
			try {
				await agent.Authen.login(this.state.login)
					.then((res) => {
						alert("Login succesfull");
						localStorage.setItem(
							"userLogin",
							JSON.stringify(res)
						);
						commit("setUser");
						commit("setToken");
						router.push("/");
					})
					.then(() => {
						this.dispatch('retrieveTasks')
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
		async Logout() {
         alert("Logout succesfull");
         localStorage.removeItem("userLogin");
         this.state.token ="";
         this.state.user = null;
			this.state.tasks = [];
         router.push("/signin");
			// try {
			// 	await agent.Authen.logout()
			// 		.then((res) => {
			// 			alert("Logout succesfull");
			// 			localStorage.removeItem("userLogin");
			// 			this.state.user = null;
			// 			router.push("/signin");
			// 		})
			// 		.catch((err) => {
			// 			console.log(err);
			// 		});
			// } catch (error) {
			// 	console.log(error);
			// }
		},
      async retrieveTasks({ commit }) {
			try {
				const data = await agent.Task.allTasks();
            commit('SET_TASKS', data)
			} catch (error) {
				console.log(error);
			}
		},
		async submitAddTask({ commit }) {
			try {
				// console.log(this.state.addTask)
				await agent.Task.createTask(this.state.addTask)
					.then((res) => {
						alert("create task succesfull");
						router.push("/");
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
		async submitUpdateTask({ commit }) {
			try {
				// console.log(this.state.updateTask)
				const idUpdate = router.currentRoute.value.params.id
				await agent.Task.updateTask(idUpdate, this.state.updateTask)
					.then((res) => {
						alert("edit task succesfull");
						router.push("/");
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
		async checkTask({ commit }, idUpdate) {
			try {
				const completed = this.state.tasks.filter((item: any) => item._id === idUpdate);
				// @ts-ignore
				const data = {completed: !completed[0].completed};
				await agent.Task.updateTask(idUpdate, data)
					.then((res) => {
						alert("check task succesfull");
						this.dispatch('retrieveTasks')
						// router.push("/");
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
		async deleteTask({ commit }, idDelete) {
			try {
				await agent.Task.deleteTask(idDelete)
					.then((res) => {
						alert("delete task succesfull");
						this.dispatch('retrieveTasks')
						// router.push("/");
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
		async getTask({ commit }, id) {
			try {
				await agent.Task.getTask(id)
					.then((res) => {
						console.log(res)
						commit('SET_UPDATE_NAME', res.name)
						commit('SET_UPDATE_DESC', res.description)
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (error) {
				console.log(error);
			}
		},
	},
});

export default store;
