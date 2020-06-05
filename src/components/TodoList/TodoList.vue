<template>
  <main class="todoList">
    <todo-new></todo-new>

    <ul class="todoList__items">
      <todo-item v-for="todo in todos" :key="todo.id" :todo="todo"></todo-item>
    </ul>

    <button
      v-if="todos.length"
      @click="removeDoneTodos()"
      :disabled="done.length === 0"
      class="todoList__removeDone"
    >
      Remove done todos
    </button>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Todo from '@/models/todo';
import TodoNew from '@/components/TodoNew/TodoNew.vue';
import TodoItem from '@/components/TodoItem/TodoItem.vue';
import { mapState, mapGetters } from 'vuex';

export default Vue.extend({
  components: {
    TodoNew,
    TodoItem,
  },
  computed: {
    ...mapState('todos', ['todos']),
    ...mapGetters('todos', ['done']),
  },
  setup(props, { root: { $store } }) {
    function removeDoneTodos(): void {
      $store.dispatch('todos/removeDone');
    }

    return { removeDoneTodos };
  },
});
</script>

<style scoped lang="scss">
.todoList {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.todoList__items {
  margin-top: 1rem;
  padding-bottom: 3rem;
}

.todoList__removeDone {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem;
  left: 0;
  box-shadow: 0 -10px 10px white;
}
</style>