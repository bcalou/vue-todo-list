import Todo from '@/models/todo';
import { MutationTree } from 'vuex';
import todos from './todos';

const mutations = todos.mutations as MutationTree<{ todos: Todo[] }>;
let state: { todos: Todo[] };

describe('todos', () => {
  beforeEach(() => {
    state = {
      todos: [
        { id: 1, name: 'eat', done: false, editing: true },
        { id: 2, name: 'drink', done: true, editing: false },
      ],
    };
  });

  it('should add a todo', () => {
    mutations.add(state, { name: 'drink' });

    expect(state.todos.length).toEqual(3);
    expect(typeof state.todos[2].id).toEqual('number');
    expect(state.todos[2].name).toEqual('drink');
    expect(state.todos[2].done).toBe(false);
    expect(state.todos[2].editing).toBe(false);
  });

  it('should remove done todos', () => {
    mutations.removeDone(state);

    expect(state.todos.length).toEqual(1);
    expect(state.todos[0].id).toEqual(1);
  });

  it('should set the done property', () => {
    mutations.setDone(state, {
      todo: { id: 1, name: 'eat', done: false, editing: false },
      done: true,
    });
    expect(state.todos[0].done).toBe(true);
  });

  it('should set the name property', () => {
    mutations.setName(state, {
      todo: { id: 1, name: 'eat', done: false, editing: false },
      name: 'sleep',
    });
    expect(state.todos[0].name).toEqual('sleep');
  });

  it('should enter edit mode', () => {
    mutations.enterEditMode(state, {
      todo: { id: 2, name: 'drink', done: true, editing: false },
    });
    expect(state.todos[1].editing).toBe(true);
  });

  it('should quit edit mode', () => {
    mutations.quitEditMode(state);
    expect(state.todos[0].editing).toBe(false);
  });
});
