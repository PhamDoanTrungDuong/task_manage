<template>
	<div className="mt-10">
		<div className="h-[80vh] flex justify-center items-center">
			<div
				class="max-w-[800px] mx-auto p-10 border border-slate-500/50 shadow-md rounded-xl bg-white"
			>
				<router-link to="/">
					<h1 className="inline-block hover:scale-x-125 duration-200">
						<Icon
							icon="mdi:arrow-left"
							width="25"
							color="#2E3A59"
						/>
					</h1>
				</router-link>

				<div className="text-3xl my-5 font-bold text-center text-[#2E3A59]">
					<h1>Create a Task</h1>
				</div>
				<form>
					<div class="mb-6">
						<input
							v-model="Name"
							type="text"
							class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							placeholder="Name"
						/>
					</div>

					<div class="mb-6">
						<textarea
							v-model="Desc"
							type="text"
							class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							placeholder="Description"
						/>
					</div>

					<div class="w-full">
						<button
							@click.prevent="$store.dispatch('submitAddTask')"
							class="w-full px-7 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:scale-105 duration-100"
						>
							Create Task
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";

export default {
	name: "AddTask",
	components: {
		Icon: Icon,
	},
	computed: {
		Name: {
			get() {
				return this.$store.state.addTask.name = "";
			},
			set(value: any) {
				this.$store.commit("SET_TASK_NAME", value);
			},
		},
		Desc: {
			get() {
				return this.$store.state.addTask.desc;
			},
			set(value: any) {
				this.$store.commit("SET_TASK_DESC", value);
			},
		},
	}
};
</script>

<style></style>
