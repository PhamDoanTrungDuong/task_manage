<template>
	<div className="flex justify-center items-center my-10">
      <div className="flex-col justify-center items-center text-center">
         <h1 className="text-3xl font-bold mb-10">Oops, Can't find page, back to home</h1>
         <div className="p-4 bg-indigo-600 rounded-lg cursor-pointer hover:scale-105 duration-200">
            <router-link to="/" className="text-white text-xl font-bold">Back to Home</router-link>
         </div>
      </div>
	</div>
</template>

<script setup lang="ts"></script>

<style></style>
