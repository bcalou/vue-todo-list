import { shallowMount } from '@vue/test-utils';
import TodoItem from './TodoItem.vue';

const $store = { dispatch: () => undefined };
const wrapper = shallowMount(TodoItem, {
  mocks: { $store },
  propsData: { todo: { id: 1, name: 'eat', done: false, editing: false } },
});

describe('TodoItem', () => {
  it('should not display the form when not editing', () => {
    expect(wrapper.find('form').element).toBeFalsy();
  });

  it('should enter edit mode', (done) => {
    const spy = spyOn($store, 'dispatch');

    wrapper.find('.todoItem__name').trigger('click');

    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledWith('todos/enterEditMode', {
        todo: { id: 1, name: 'eat', done: false, editing: false },
      });
      done();
    });
  });

  it('should display the form when editing instead of the name', () => {
    wrapper.vm.$props.todo.editing = true;
    wrapper.vm.$forceUpdate();

    expect(wrapper.find('.todoItem__name').element).toBeFalsy();
    expect(wrapper.find('form').element).toBeTruthy();
  });

  it('should quit edit mode when submitting a new name', () => {
    const spy = spyOn($store, 'dispatch');
    wrapper.vm.$props.todo.editing = true;
    wrapper.vm.$forceUpdate();

    wrapper.find('form').trigger('submit');

    expect(spy).toHaveBeenCalledWith('todos/quitEditMode');
  });

  it('should set a new name', () => {
    const spy = spyOn($store, 'dispatch');
    wrapper.vm.$props.todo.editing = true;
    wrapper.vm.$forceUpdate();

    wrapper.find('form input').setValue('drink');
    wrapper.find('form').trigger('submit');

    expect(spy).toHaveBeenCalledWith('todos/setName', {
      todo: { id: 1, name: 'eat', done: false, editing: true },
      name: 'drink',
    });
  });

  it('should not set a new name when the input is empty', () => {
    const spy = spyOn($store, 'dispatch');
    wrapper.vm.$props.todo.editing = true;
    wrapper.vm.$forceUpdate();

    wrapper.find('form input').setValue('');
    wrapper.find('form').trigger('submit');

    expect(spy).not.toHaveBeenCalledWith('todos/setName', {
      todo: { id: 1, name: 'eat', done: false, editing: true },
      name: '',
    });
  });
});
