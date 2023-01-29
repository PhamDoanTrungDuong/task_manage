<template>
  <div className="h-screen flex justify-center items-center ">
    <div className="min-w-[726px] h-[98vh] border border-[#f0f0f0] rounded-2xl shadow-md shadow-slate-500/50">
      <Home />
    </div>
  </div>
</template>

<script lang="ts">
  import Home from './pages/Home.vue';
  export default {
    name: 'App',
    components: {
      Home: Home
    },
    mounted() {
			this.$store.commit('setToken');
			this.$store.commit('setUser');
			// console.log(this.$store.state.token)
			// console.log(this.$store.state.user)
		}
  }
</script>