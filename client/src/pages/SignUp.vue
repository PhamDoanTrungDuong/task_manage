<template>
	<div className="h-[90vh] flex justify-center items-center">
		<div
			class="max-w-[400px] mx-auto p-10 border border-slate-500/50 shadow-md rounded-xl bg-white"
		>
			<div class="text-center my-5 text-xl font-bold">
				<h1>SIGN UP</h1>
			</div>
			<form>
				<div class="mb-6">
					<input
						type="text"
						class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						placeholder="Username"
					/>
				</div>

				<div class="mb-6">
					<input
						type="text"
						class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						placeholder="Email"
					/>
				</div>

				<div class="mb-6">
					<input
						type="password"
						class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
						placeholder="Password"
					/>
				</div>

				<div class="text-center">
					<button
						type="button"
						class="inline-block px-7 py-3 bg-indigo-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
					>
               Register
					</button>
					<p class="text-sm font-semibold mt-2 pt-1 mb-0">
						Have an account?
						<a
							href="#!"
							class="text-indigo-600 hover:text-indigo-700 focus:text-indigo-700 transition duration-200 ease-in-out"
							>Login</a
						>
					</p>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "SignUp",
};
</script>
