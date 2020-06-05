import Todo from '@/models/todo';
import { Plugin } from 'vuex';

const localStoragePlugin: Plugin<{ todos: { todos: Todo[] } }> = (store) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case 'todos/add':
      case 'todos/removeDone':
      case 'todos/setDone':
      case 'todos/setName':
        localStorage.setItem(
          'todos',
          JSON.stringify(
            state.todos.todos.map((todo) => ({ ...todo, editing: false })),
          ),
        );
        break;
      default:
        break;
    }
  });
};

export default localStoragePlugin;
