import { Mutation } from "./../../node_modules/vuex/types/index.d";
import { createStore } from "vuex";
import agent from "../api/agent";
import router from "../router";

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
		token: "",
		user: null,
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
						router.push("/");
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
	},
});

export default store;
