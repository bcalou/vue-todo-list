import { shallowMount } from '@vue/test-utils';
import TodoNew from './TodoNew.vue';

const $store = { dispatch: () => undefined };
const wrapper = shallowMount(TodoNew, { mocks: { $store } });

describe('TodoNew', () => {
  it('should add a todo on form submission', () => {
    const spy = spyOn($store, 'dispatch');

    wrapper.find('input').setValue('eat');
    wrapper.find('form').trigger('submit');

    expect(spy).toHaveBeenCalledWith('todos/add', { name: 'eat' });
  });

  it('should not add a todo when submitting an empty value', () => {
    const spy = spyOn($store, 'dispatch');

    wrapper.find('form').trigger('submit');

    expect(spy).not.toHaveBeenCalled();
  });

  it('should empty the new todo name after the form submission', () => {
    wrapper.find('input').setValue('eat');
    wrapper.find('form').trigger('submit');
    expect(
      (wrapper.find('input').element as HTMLInputElement).value,
    ).toBeFalsy();
  });
});
