import axios, { AxiosError, AxiosResponse } from "axios";
import store from "../store";

// this is the type of the response from the server
const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve, s * 300));

// this is the type of the error from the server
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
// axios.defaults.withCredentials = true;

// this is the type of the response from the server
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config: any) => {
	 const token = store.state.token;
	 if(token) config.headers.token = `Bearer ${token}`;
	return config;
});

//Error Handler
axios.interceptors.response.use(
	async (res) => {
		// if (import.meta.env.NODE_ENV === "development") await sleep(0.5);
		return res;
	},
	// (error: AxiosError) => {
	// 	const { data, status }: any = error.response;
	// 	switch (status) {
	// 		case 500:
	// 			break;
	// 	}
	// 	return Promise.reject(error.response);
	// }
);

//Request Handler
const requests = {
	get: (url: string, params?: URLSearchParams) =>
		axios.get(url, { params }).then(responseBody),
	post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
	delete: (url: string) => axios.delete(url).then(responseBody),
	postForm: (url: string, data: FormData) =>
		axios
			.post(url, data, {
				headers: { "Content-type": "multipart/form-data" },
			})
			.then(responseBody),
	putForm: (url: string, data: FormData) =>
		axios
			.put(url, data, {
				headers: { "Content-type": "multipart/form-data" },
			})
			.then(responseBody),
};

const Authen = {
	login: (values: any) => requests.post("auth/login", values),
	register: (values: any) => requests.post("auth/register", values),
	logout: () => requests.post("auth/logout", {}),
	refreshToken: (values: any) => requests.post("auth/refresh", values),
};

const User = {
	getAllUsers: () => requests.get("user"),
	getUser: (id: any) => requests.get(`user/${id}`),
	updateUser: (id: any, values: any) => requests.put(`user/${id}`, values),
	deleteUser: (id: any) => requests.delete(`user/${id}`),
};

const Task = {
	allTasks: () => requests.get("task"),
	getTask: (id: any) => requests.get(`task/${id}`),
	createTask: (values: any) => requests.post("task", values),
	editTask: (id: any, values: any) => requests.put(`task/${id}`, values),
	deleteTask: (id: any) => requests.delete(`task/${id}`),
};

//Agent
// const Catalog = {
//     list: (params: URLSearchParams) => requests.get('products', params),
//     details: (id: number) => requests.get(`products/${id}`),
//     fetchFilter: () => requests.get('products/filters'),
//     getProductCount: () => requests.get('products/get-product-count'),
//     getColors: () => requests.get('products/get-colors'),
//     getSizes: () => requests.get('products/get-sizes'),
//     productVariants: (id: number) => requests.get(`products/product-variants/${id}`),
//     variantsDetail: (id: number) => requests.get(`products/variants-details/${id}`),
//     getProductDiscount: () => requests.get('discount'),
//     addProductDiscount: (proudctId: number, percent: number) => requests.post(`discount?productId=${proudctId}&discount=${percent}`, {}),
//     deleteProductDiscount: (productId: number) => requests.delete(`discount/${productId}`),
//     productViewCount: (productId: number) => requests.post(`products/product-viewcount/${productId}`, {}),
//     checkUserNotify: (id: number) => requests.post(`orders/userNotify/${id}`, {}),
// }

function createFormData(item: any) {
	let formData = new FormData();
	for (const key in item) {
		formData.append(key, item[key]);
	}
	return formData;
}

const agent = {
	Authen,
	User,
	Task,
};

export default agent;
