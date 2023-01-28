<script setup lang="ts">
	import Headers from '../components/Header.vue'
</script>

<template>
	<div class="bg-[#cbe1fa] h-[98vh] rounded-2xl p-4">
		<div>
			<Headers />
			<router-view />
		</div>
	</div>
</template>
