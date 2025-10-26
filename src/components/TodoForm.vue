<script setup>
import { useTodoStore } from '@/stores/todoStore';
import { ref } from 'vue';

const todoTitle = ref("")
const store = useTodoStore();

function addTodo() {
   store.addTodo({
      id: store.todoLists.length + 1,
      title: todoTitle.value,
      completed: false,
   });
   todoTitle.value = ""
}

</script>
<template>
   <form @submit.prevent="addTodo" class="flex w-full justify-center items-end">
      <input v-model.trim="todoTitle" type="text" id="hero-field" name="hero-field"
         class="w-full bg-gray-100/80 rounded px-3 py-2 border border-purple-500" placeholder="add something..." />
      <button type="submit" class="inline-flex text-white bg-purple-500 border-0 py-2 px-6 rounded ml-3">
         Button
      </button>
   </form>
</template>