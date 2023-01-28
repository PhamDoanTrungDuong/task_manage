<template>
	<div className="flex justify-between items-center">
		<div className="hover:scale-110 cursor-pointer duration-200">
			<Icon icon="mdi:menu" width="30" color="#2E3A59" />
		</div>
		<div className="flex justify-center items-center gap-4">
			<div>
				<h1
					className="font-bold text-[#2E3A59] cursor-pointer hover:text-blue-600 duration-200"
				>
					<router-link to="/signin">Sign In</router-link>
				</h1>
			</div>
			<div>
				<h1
					className="font-bold text-[#2E3A59] cursor-pointer hover:text-blue-600 duration-200 underline underline-offset-2"
				>
					<router-link to="/signup">Sign Up</router-link>
				</h1>
			</div>
		</div>
		<!-- <div className="hover:scale-110 cursor-pointer duration-200">
			<Icon icon="mdi:account-circle" width="30" color="#2E3A59" />
		</div> -->
	</div>
	<!-- <div className="my-5">
		<div>
			<h1 className="text-4xl font-bold text-[#2E3A59]">Hello Duong!</h1>
			<p className="text-base text-[#2E3A59]">Have a nice day.</p>
		</div>
	</div> -->
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<style></style>
