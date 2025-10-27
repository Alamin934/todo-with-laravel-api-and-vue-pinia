import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import axios from "axios";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

export const useTodoStore = defineStore('todos', () => {
   // State
   let todoLists = reactive([]);

   let sortableTodo = ref("all")
   let loading = ref(false)
   let errors = ref({});

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
   async function getTodos() {
      try {
         loading.value = true;
         const res = await axios.get('/api/todos')
         todoLists.splice(0, todoLists.length, ...res.data)
         loading.value = false;
      } catch (error) {

      }
   }
   async function addTodo(todoItem) {
      try {
         if (todoItem.title !== "") {
            errors.value = {};
         }
         let res = await axios.post('/api/todos', todoItem);
         todoLists.push(res.data);
         $toast.success("New Todo item added")
      } catch (err) {
         if (err.response.status == 422) {
            errors.value = err.response.data.errors;
         }
      }
   }

   async function handleComplete(id) {
      try {
         let res = await axios.patch('/api/todos/' + id);

         if (res.status == 200) {
            let todo = todoLists.find(todo => todo.id === id);
            todo.completed = !todo.completed;
            $toast.success("Todo item Updated successfully")
         }
      } catch (error) {

      }
   }

   async function removeTodo(id) {
      try {
         let res = await axios.delete('/api/todos/' + id);

         if (res.status == 200) {
            let index = todoLists.findIndex(todo => todo.id === id)
            if (index !== -1) {
               todoLists.splice(index, 1);
            }
            $toast.success("Todo item Delete successfully")
         }
      } catch (error) {

      }
   }

   return { todoLists, getTodos, addTodo, handleComplete, removeTodo, totalTodos, pendingTodos, completedTodos, sortableTodo, filterTodos, loading, errors }
})