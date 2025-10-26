<script setup>
import { useTodoStore } from '@/stores/todoStore';
import { storeToRefs } from 'pinia';

const store = useTodoStore();
const { sortableTodo, totalTodos, pendingTodos, completedTodos } = storeToRefs(store);
</script>
<template>
   <div class="flex">
      <div class="flex items-center mr-3">
         <input v-model="sortableTodo" checked id="all-radio" name="todo-filter" type="radio" value="all"
            class="text-purple-500 bg-gray-100 border-gray-300 rounded-sm">
         <label for="all-radio" class="ms-2 text-sm">All ({{ totalTodos.length }})</label>
      </div>
      <div class="flex items-center mr-3">
         <input v-model="sortableTodo" id="completed-radio" name="todo-filter" type="radio" value="completed"
            class="text-purple-500 bg-gray-100 border-gray-300 rounded-sm">
         <label for="completed-radio" class="ms-2 text-sm">Completed ({{ completedTodos.length }})</label>
      </div>
      <div class="flex items-center">
         <input v-model="sortableTodo" id="pending-radio" name="todo-filter" type="radio" value="pending"
            class="text-purple-500 bg-gray-100 border-gray-300 rounded-sm">
         <label for="pending-radio" class="ms-2 text-sm">Pending ({{ pendingTodos.length }})</label>
      </div>
   </div>
</template>