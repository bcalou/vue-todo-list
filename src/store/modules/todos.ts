import Todo from '@/models/todo';
import { getRandomId } from '@/utils/utils';
import { Module } from 'vuex';

function getFromLocalStorage(): Todo[] {
  const savedTodos: string | null = localStorage.getItem('todos');

  return savedTodos ? JSON.parse(savedTodos) : [];
}

const todos: Module<{ todos: Todo[] }, any> = {
  namespaced: true,
  state: {
    todos: getFromLocalStorage(),
  },
  getters: {
    done(state): Todo[] {
      return state.todos.filter((todo) => todo.done);
    },
  },
  mutations: {
    add(state, payload: { name: string }) {
      state.todos.push({
        id: getRandomId(),
        name: payload.name,
        done: false,
        editing: false,
      });
    },
    removeDone(state) {
      state.todos = state.todos.filter((todo) => !todo.done);
    },
    setDone(state, payload: { todo: Todo; done: boolean }) {
      (state.todos.find((todo) => todo.id === payload.todo.id) as Todo).done =
        payload.done;
    },
    setName(state, payload: { todo: Todo; name: string }) {
      (state.todos.find((todo) => todo.id === payload.todo.id) as Todo).name =
        payload.name;
    },
    enterEditMode(state, payload: { todo: Todo }) {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        editing: todo.id === payload.todo.id,
      }));
    },
    quitEditMode(state) {
      state.todos = state.todos.map((todo) => ({ ...todo, editing: false }));
    },
  },
  actions: {
    add(context, payload: { name: string }) {
      context.commit('add', payload);
    },
    removeDone(context) {
      context.commit('removeDone');
    },
    setDone(context, payload: { todo: Todo; done: boolean }) {
      context.commit('setDone', payload);
    },
    setName(context, payload: { todo: Todo; name: string }) {
      context.commit('setName', payload);
    },
    enterEditMode(context, payload: { todo: Todo }) {
      context.commit('enterEditMode', payload);
    },
    quitEditMode(context) {
      context.commit('quitEditMode');
    },
  },
};

export default todos;
