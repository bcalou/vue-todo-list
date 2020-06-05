import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import TodoList from './TodoList.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
  modules: {
    todos: {
      namespaced: true,
      state: {
        todos: [{ id: 1, name: 'eat', done: false, editing: false }],
      },
      getters: {
        done: () => {
          return [{ id: 1, name: 'eat', done: false, editing: false }];
        },
      },
    },
  },
});
const wrapper = shallowMount(TodoList, { mocks: { $store } });

describe('TodoList', () => {
  it('should remove done todos', () => {
    const spy = spyOn($store, 'dispatch');
    wrapper.find('.todoList__removeDone').trigger('click');
    expect(spy).toHaveBeenCalledWith('todos/removeDone');
  });
});
