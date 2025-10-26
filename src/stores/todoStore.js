import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useTodoStore = defineStore('todos', () => {
   // State
   let todoLists = reactive([
      { id: 1, title: "Todo 1", completed: false, },
      { id: 2, title: "Todo 2", completed: true, },
      { id: 3, title: "Todo 3", completed: false, },
      { id: 4, title: "Todo 4", completed: true, },
      { id: 5, title: "Todo 5", completed: false, },
   ]);

   let sortableTodo = ref("all")

   // Getters
   const totalTodos = computed(() => todoLists);

   const completedTodos = computed(() =>
      todoLists.filter(todo => todo.completed)
   );

   const pendingTodos = computed(() =>
      todoLists.filter(todo => !todo.completed)
   );
   const filterTodos = computed(() => {
      if (sortableTodo.value === 'all') {
         return totalTodos.value;
      } else if (sortableTodo.value === 'completed') {
         return completedTodos.value;
      } else {
         return pendingTodos.value;
      }
   });

   // Actions
   function addTodo(todoItem) {
      todoLists.push(todoItem);
   }

   function handleComplete(id) {
      let todo = todoLists.find(todo => todo.id === id);
      todo.completed = !todo.completed;
   }

   function removeTodo(id) {
      let index = todoLists.findIndex(todo => todo.id === id)
      if (index !== -1) {
         todoLists.splice(index, 1);
      }
   }

   return { todoLists, addTodo, handleComplete, removeTodo, totalTodos, pendingTodos, completedTodos, sortableTodo, filterTodos }
})