<template>
  <div>
    <form @submit.prevent="submit()" class="todoNew">
      <input
        placeholder="Do something..."
        v-model="input"
        class="todoNew__input"
      />
      <button class="todoNew__addButton">Add</button>
    </form>
    <p v-if="inputError" class="error">The todo name cannot be empty</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { watch, ref, Ref } from '@vue/composition-api';
import useRequiredInput from '@/composition/requiredInput';

export default Vue.extend({
  setup(props, { root: { $store } }) {
    function addTodo(input: Ref<string>): void {
      $store.dispatch('todos/add', { name: input.value });

      input.value = '';
    }

    return { ...useRequiredInput(addTodo) };
  },
});
</script>

<style lang="scss" scoped>
.todoNew {
  display: flex;
}

.todoNew__input {
  flex: 1;
  height: 40px;
}

.todoNew__addButton {
  padding: 0 1rem;
}
</style>