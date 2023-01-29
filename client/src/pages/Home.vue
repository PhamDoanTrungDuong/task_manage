<script lang="ts">
	import Headers from '../components/Header.vue'
	export default {
		name: 'Home',
		components: {
			Headers: Headers
		},
		// mounted() {
		// 	this.$store.commit('setToken');
		// 	this.$store.commit('setUser');
		// 	// console.log(this.$store.state.token)
		// 	// console.log(this.$store.state.user)
		// }
	}
</script>

<template>
	<div class="bg-sky-300/30 h-[98vh] rounded-2xl p-4">
		<div>
			<Headers />
			<router-view />
		</div>
	</div>
</template>
