<template>
  <li class="todoItem">
    <input type="checkbox" v-model="todo.done" class="todoItem__checkbox" />

    <div v-if="todo.editing">
      <form @submit.prevent="submit()" class="todoItem__edit">
        <input v-model="input" ref="newNameInput" />
        <button>Edit</button>
      </form>
      <p v-if="inputError" class="error">The todo name cannot be empty</p>
    </div>

    <div v-else @click="enterEditMode()" class="todoItem__name">
      {{ todo.name }}
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import Todo from '@/models/todo';
import { watch, ref, Ref } from '@vue/composition-api';
import useRequiredField from '@/composition/requiredInput';

export default Vue.extend({
  props: {
    todo: Object as () => Todo,
  },
  setup(props: any, context: any) {
    const $store = context.root.$store;

    function enterEditMode(): void {
      if (!props.todo.done) {
        $store.dispatch('todos/enterEditMode', {
          todo: props.todo,
        });

        Vue.nextTick().then(() =>
          (context.refs.newNameInput as HTMLInputElement).focus(),
        );
      }
    }

    function setName(input: Ref<string>): void {
      $store.dispatch('todos/setName', {
        todo: props.todo,
        name: input.value,
      });
      $store.dispatch('todos/quitEditMode');
    }

    watch(
      () => props.todo.done,
      () => {
        $store.dispatch('todos/setDone', {
          todo: props.todo,
          done: props.todo.done,
        });
      },
    );

    return { enterEditMode, ...useRequiredField(setName) };
  },
});
</script>

<style lang="scss" scoped>
.todoItem {
  margin: 1rem 0;
  display: flex;
}

.todoItem__checkbox {
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;

  &:checked ~ .todoItem__name {
    text-decoration: line-through;
  }
}

.todoItem__name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.todoItem__edit {
  display: flex;
}
</style>