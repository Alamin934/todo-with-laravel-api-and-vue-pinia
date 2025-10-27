<script setup>
import SingleTodo from './SingleTodo.vue';
import { useTodoStore } from '../stores/todoStore';
import { storeToRefs } from 'pinia'

const store = useTodoStore();
const { filterTodos } = storeToRefs(store);
</script>
<template>
   <div class="py-4">
      <div v-if="store.loading">
         <svg class="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
            <!-- ... -->
         </svg>
         Loading...
      </div>
      <div v-else v-for="todo in filterTodos" :key="todo.id" class="flex items-center justify-between mb-2">
         <SingleTodo :todo="todo" />
      </div>
   </div>
</template>