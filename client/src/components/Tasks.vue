<template>
	<div className="my-5 flex justify-between items-center">
		<div>
			<h1 className="text-4xl font-bold text-[#2E3A59]">Hello <span className="underline underline-offset-2">{{ $store.state.user.username !== null ? $store.state.user.username : ""  }}</span>!</h1>
			<p className="text-base text-[#2E3A59]">Have a nice day.</p>
		</div>
		<router-link to="/addtask">
			<div
				className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full px-3 py-2 cursor-pointer hover:scale-105 duration-200"
			>
				<div className="flex justify-center items-center">
					<Icon icon="mdi:plus" width="20" color="#fff" />
					<p className="text-md font-semibold text-white">Add Task</p>
				</div>
			</div>
		</router-link>
	</div>
	<div>
		<div className="flex justify-center items-center gap-8">
			<div
				className="p-3 px-6 rounded-full cursor-pointer hover:scale-105 duration-100 bg-white"
			>
				<p
					className="text-[#2E3A59] text-sm font-extrabold underline underline-offset-2"
				>
					My Tasks
				</p>
			</div>
			<div
				className="p-3 px-6 rounded-full cursor-pointer hover:scale-105 duration-100 bg-white"
			>
				<p className="text-[#2E3A59] text-sm font-semibold">In-progess</p>
			</div>
			<div
				className="p-3 px-6 rounded-full cursor-pointer hover:scale-105 duration-100 bg-white"
			>
				<p className="text-[#2E3A59] text-sm font-semibold">Completed</p>
			</div>
		</div>
		<div>
			<!-- <Projects /> -->
		</div>
		<div>
			<h1 className="text-2xl font-bold text-[#2E3A59] ml-36 my-2">Tasks</h1>
			<div 
				className="max-h-[400px] max-w-[450px] mx-auto scroll-smooth overflow-y-scroll"
			>
				<router-link v-for="task in $store.state.tasks" :key="task._id" :to="{
					name: 'task',
					params: {
						id: task._id
					}
				}">
					<div
						className="max-w-[400px] mx-auto my-2 flex justify-between items-center bg-white p-3 rounded-2xl cursor-pointer hover:bg-slate-300/30 duration-200"
					>
						<div
							className=" flex justify-center items-center gap-4 "
						>
							<div
								className="bg-blue-300 w-10 h-10 flex justify-center items-center rounded-lg"
							>
								<Icon
									icon="mdi:calendar-month-outline"
									width="25"
									color="#fff"
								/>
							</div>
							<div>
								<h3 className="text-lg font-bold">
									{{ task.name }}
								</h3>
								<p
									className="text-gray-500 text-sm"
								>
									{{ moment(task.createdAt) }}
								</p>
							</div>
						</div>
						<div className="flex justify-center items-center gap-2">
							<div className="cursor-pointer hover:scale-105 duration-200"
								@click.prevent="$store.dispatch('checkTask', task._id)"
							>
								<Icon v-if="task.completed !== true"
									icon="mdi:check-circle"
									width="25"
									color="#D8DEF3"
								/>
								<Icon v-else
									icon="mdi:check-circle"
									width="25"
									color="#32CD32"
								/>
							</div>
							<div className="cursor-pointer hover:scale-105 duration-200"
								@click.prevent ="$store.dispatch('deleteTask', task._id)"
							>
								<Icon
									icon="mdi:delete"
									width="25"
									color="red"
								/>
							</div>
							<!-- <div className="cursor-pointer">
								<Icon
								icon="mdi:dots-vertical"
								width="30"
								color="#D8DEF3"
								/>
							</div> -->
						</div>
					</div>
				</router-link>

			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import axios from "axios";
import agent from "../api/agent";
import moment from 'moment';
import Projects from "./Projects.vue";

export default {
	name: "Tasks",
	components: {
		Projects: Projects,
		Icon: Icon,
	},
	methods: {
		moment: function (date: any) {
			 return moment(date).startOf('hour').fromNow();
		}
	},
	mounted() {
		this.$store.dispatch('retrieveTasks')
	}
};
</script>
