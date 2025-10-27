<script setup>
import TodoFooter from './components/TodoFooter.vue';
import TodoForm from './components/TodoForm.vue';
import TodoHeader from './components/TodoHeader.vue';
import TodoLists from './components/TodoLists.vue';
import axios from 'axios';
import { useTodoStore } from './stores/todoStore';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = "https://laravel-pinia-api.test";

const store = useTodoStore();
store.getTodos();
</script>

<template>
  <div class="text-gray-600 bg-gray-200 body-font h-screen">
    <div class="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
      <!-- Todo Header -->
      <TodoHeader />
      <div class="h-full bg-white p-8 rounded-lg text-center">
        <!-- Todo Form -->
        <TodoForm />
        <!-- Todo Lists -->
        <TodoLists />
        <!-- Todo Footer -->
        <TodoFooter />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
